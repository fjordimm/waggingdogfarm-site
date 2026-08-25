import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const convert = require('heic-convert') as (options: {
    buffer: Buffer;
    format: 'JPEG';
    quality: number;
}) => Promise<Buffer>;

const defaultFolderId = '1sv1I6ZHBo8WWW7OXnxG_L4z_Ux_jRccq';
const defaultOutputDirectory = './public/images/our_flowers';
const googleDriveSecretsFile = './secrets/google_drive.txt';
const driveApiBaseUrl = 'https://www.googleapis.com/drive/v3';
const pageSize = 1000;

interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
}

interface DriveFileListResponse {
    files?: DriveFile[];
    nextPageToken?: string;
}

async function getRequiredApiKey(): Promise<string> {
    let contents: string;
    try {
        contents = await fs.readFile(googleDriveSecretsFile, 'utf8');
    } catch {
        throw new Error(`Unable to read ${googleDriveSecretsFile}. Add the Google Drive API key as its first line.`);
    }

    const apiKey = contents.split(/\r?\n/)[0]?.trim();
    if (!apiKey) {
        throw new Error(`Add the Google Drive API key as the first line of ${googleDriveSecretsFile}.`);
    }

    return apiKey;
}

function getFolderId(): string {
    return process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() || defaultFolderId;
}

function getOutputDirectory(): string {
    return process.env.GOOGLE_DRIVE_OUTPUT_DIR?.trim() || defaultOutputDirectory;
}

function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim() || 'image';
}

async function getImageFiles(folderId: string, apiKey: string): Promise<DriveFile[]> {
    const imageFiles: DriveFile[] = [];
    let pageToken: string | undefined;

    do {
        const params = new URLSearchParams({
            q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
            pageSize: String(pageSize),
            fields: 'nextPageToken,files(id,name,mimeType)',
            orderBy: 'name',
            key: apiKey,
        });

        if (pageToken) {
            params.set('pageToken', pageToken);
        }

        const response = await fetch(`${driveApiBaseUrl}/files?${params}`);
        const body = await response.text();
        if (!response.ok) {
            throw new Error(`Google Drive file listing failed (${response.status}): ${body}`);
        }

        const result = JSON.parse(body) as DriveFileListResponse;
        imageFiles.push(...(result.files ?? []));
        pageToken = result.nextPageToken;
    } while (pageToken);

    return imageFiles;
}

async function downloadImage(file: DriveFile, apiKey: string, outputDirectory: string): Promise<void> {
    const params = new URLSearchParams({
        alt: 'media',
        key: apiKey,
    });
    const response = await fetch(`${driveApiBaseUrl}/files/${encodeURIComponent(file.id)}?${params}`);
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Failed to download ${file.name} (${response.status}): ${body}`);
    }

    const sourceFileName = sanitizeFileName(file.name);
    const outputFileName = `${path.parse(sourceFileName).name}.jpg`;
    const filePath = path.join(outputDirectory, outputFileName);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (file.mimeType === 'image/heic' || file.mimeType === 'image/heif' || /\.heic?$/i.test(sourceFileName)) {
        const jpegBuffer = await convert({ buffer: bytes, format: 'JPEG', quality: 0.9 });
        await fs.writeFile(filePath, jpegBuffer);
    } else {
        await sharp(bytes).jpeg({ quality: 90 }).toFile(filePath);
    }
    console.log(`Downloaded ${file.name} -> ${filePath}`);
}

async function main(): Promise<void> {
    const apiKey = await getRequiredApiKey();
    const folderId = getFolderId();
    const outputDirectory = getOutputDirectory();

    await fs.rm(outputDirectory, { recursive: true, force: true });
    await fs.mkdir(outputDirectory, { recursive: true });
    const imageFiles = await getImageFiles(folderId, apiKey);

    if (imageFiles.length === 0) {
        console.log('No image files found in the Google Drive folder.');
        return;
    }

    console.log(`Found ${imageFiles.length} image(s).`);
    for (const file of imageFiles) {
        await downloadImage(file, apiKey, outputDirectory);
    }

    console.log(`Finished downloading images to ${outputDirectory}.`);
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
