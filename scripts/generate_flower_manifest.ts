import fs from 'node:fs/promises';
import path from 'node:path';

const imageDirectory = './public/images/our_flowers';
const manifestPath = path.join(imageDirectory, 'manifest.json');
const supportedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function main(): Promise<void> {
    await fs.mkdir(imageDirectory, { recursive: true });
    const entries = await fs.readdir(imageDirectory, { withFileTypes: true });
    const images = entries
        .filter((entry) => entry.isFile() && supportedImageExtensions.has(path.extname(entry.name).toLowerCase()))
        .map((entry) => entry.name)
        .sort((first, second) => first.localeCompare(second));

    await fs.writeFile(manifestPath, `${JSON.stringify(images, null, 2)}\n`, 'utf8');
    console.log(`Generated ${manifestPath} with ${images.length} image(s).`);
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
