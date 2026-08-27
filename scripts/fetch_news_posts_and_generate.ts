import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import MarkdownIt from "markdown-it";
import fs from "fs";
import { randomUUID } from "crypto";
import http from "http";
import https from "https";

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDate(value: string): string {
    // if (!value) return "-";

    // const parsed = new Date(value);
    // if (Number.isNaN(parsed.getTime())) return value;

    // return `${parsed.getMonth()} ${parsed.getDay()}, ${parsed.getFullYear()}`;
    return value;
}

function getDateSlug(date: string, undatedIndex: number, usedSlugs: Set<string>): string {
    const baseSlug = date.trim().replace(/[^0-9A-Za-z]+/g, "-").replace(/^-|-$/g, "") || (undatedIndex === 1 ? "undated" : `undated-${undatedIndex}`);
    let slug = baseSlug;
    let duplicateNumber = 2;

    while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${duplicateNumber}`;
        duplicateNumber++;
    }

    usedSlugs.add(slug);
    return slug;
}

async function main() {
    let notionKey = "";
    let notionDbId = "";
    let controlsDbId = "";
    try {
        const data: string = fs.readFileSync("./secrets/notion.txt", "utf8");
        const splitData = data.split("\n");

        notionKey = splitData[0].trim();
        notionDbId = splitData[1].trim();
        controlsDbId = splitData[2].trim();
    } catch (err) {
        console.error(err);
        throw new Error("Failed to get file secrets/notion.txt.");
    }

    const notion = new Client({
        auth: notionKey,
    });

    const db = await notion.databases.retrieve({
        database_id: notionDbId
    });

    if (!controlsDbId) {
        throw new Error("Missing the controls database ID on the third line of secrets/notion.txt.");
    }

    const controlsDb = await notion.databases.retrieve({
        database_id: controlsDbId
    });
    const controls = await notion.dataSources.query({
        data_source_id: (controlsDb as { data_sources: Array<{ id: string }> }).data_sources[0].id,
        filter: {
            property: "Name",
            title: {
                equals: "Show News Posts",
            },
        },
        page_size: 1,
    });
    const controlsPage = controls.results[0];
    const controlsProperties = (controlsPage as { properties?: Record<string, unknown> } | undefined)?.properties;
    const enableProperty = controlsProperties?.Enable as { type?: string; checkbox?: boolean } | undefined;
    const showNewsPosts = enableProperty?.type === "checkbox" && enableProperty.checkbox === true;
    fs.writeFileSync("./public/news-config.json", JSON.stringify({ showNewsPosts }, null, 2), "utf8");

    const pages = await notion.dataSources.query({
        data_source_id: (db as { data_sources: Array<{ id: string }> }).data_sources[0].id,
        filter: {
            property: "Publish",
            checkbox: {
                equals: true,
            }
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            }
        ]
    });

    const n2m = new NotionToMarkdown({ notionClient: notion });
    const markdownIt = new MarkdownIt();

    const newsPostsDir = "./src/assets/generated/news_posts";
    const newsImagesDir = "./public/images/generated";

    // Delete everything in news_posts.
    if (fs.existsSync(newsPostsDir)) {
        fs.rmSync(newsPostsDir, { recursive: true, force: true });
    }
    fs.mkdirSync(newsPostsDir, { recursive: true });

    if (fs.existsSync(newsImagesDir)) {
        fs.rmSync(newsImagesDir, { recursive: true, force: true });
    }
    fs.mkdirSync(newsImagesDir, { recursive: true });

    // Generate the news post html files.
    let i = 0;
    let undatedCount = 0;
    const usedSlugs = new Set<string>();
    for (const page of pages.results) {
        // Generate the html from the Notion page.

        const pageProperties = (page as { properties?: Record<string, unknown> }).properties;
        const titleProperty = pageProperties?.Title as { type?: string; title?: Array<{ plain_text?: string }> } | undefined;
        const title = titleProperty?.type === "title"
            ? (titleProperty.title ?? []).map((item) => item.plain_text ?? "").join("")
            : "";

        const dateProperty = pageProperties?.Date as { type?: string; date?: { start?: string } } | undefined;
        const date = dateProperty?.type === "date" ? formatDate(dateProperty.date?.start ?? "") : "";
        if (!date.trim()) {
            undatedCount++;
        }

        const markdown = n2m.toMarkdownString(await n2m.pageToMarkdown(page.id));
        let html = "";
        if (markdown.parent) { html = markdownIt.render(markdown.parent); }
        const titleHtml = title ? `<h1 class="news-content__title">${escapeHtml(title)}</h1>` : "";
        const dateHtml = date ? `<p class="news-content__date">${escapeHtml(date)}</p>` : "";
        html = [titleHtml, dateHtml, html].filter(Boolean).join("\n");

        // Go through the <img> tags and download the images to be used statically.

        const imgTagRegex = /<img\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi;
        const imageMatches = Array.from(html.matchAll(imgTagRegex));
        let updatedHtml = "";
        let lastIndex = 0;

        for (const match of imageMatches) {
            const src = match[2];
            updatedHtml += html.slice(lastIndex, match.index);

            if (src) {
                const imageUuid = randomUUID();
                const imagePath = await downloadImage(src, `${newsImagesDir}/${imageUuid}`);
                updatedHtml += match[0].replace(src, imagePath);
            } else {
                updatedHtml += match[0];
            }

            lastIndex = (match.index ?? 0) + match[0].length;
        }

        updatedHtml += html.slice(lastIndex);

        // Write the file.

        const fileSlug = getDateSlug(date, undatedCount, usedSlugs);
        fs.writeFileSync(`${newsPostsDir}/${fileSlug}.html`, updatedHtml, "utf-8");

        i++;
    }
}

function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeHtmlEntities(value: string): string {
    return value
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">");
}

function getImageExtension(url: string, contentType?: string): string {
    const normalizedUrl = decodeHtmlEntities(url).split("?")[0].split("#")[0];
    const extensionMatch = normalizedUrl.match(/\.(jpe?g|png|gif|webp|svg)$/i);
    if (extensionMatch) {
        return extensionMatch[0].toLowerCase();
    }

    const mimeType = contentType?.toLowerCase() ?? "";
    const extensionMap: Record<string, string> = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/webp": ".webp",
        "image/svg+xml": ".svg",
    };

    return extensionMap[mimeType] ?? ".bin";
}

async function downloadImage(url: string, filePath: string, attempts = 5, delayMs = 1000): Promise<string> {
    let lastError: unknown;

    const normalizedUrl = decodeHtmlEntities(url);

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            await new Promise<void>((resolve, reject) => {
                const client = normalizedUrl.startsWith("https://") ? https : http;
                const request = client.get(normalizedUrl, (response) => {
                    if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                        downloadImage(new URL(response.headers.location, normalizedUrl).toString(), filePath, attempts, delayMs)
                            .then(() => resolve())
                            .catch(reject);
                        return;
                    }

                    if (response.statusCode !== 200) {
                        reject(new Error(`Failed to download image ${url}: ${response.statusCode}`));
                        response.resume();
                        return;
                    }

                    const extension = getImageExtension(normalizedUrl, response.headers["content-type"]);
                    const destinationPath = `${filePath}${extension}`;
                    fs.mkdirSync(destinationPath.substring(0, destinationPath.lastIndexOf("/")) || ".", { recursive: true });

                    const fileStream = fs.createWriteStream(destinationPath);

                    response.pipe(fileStream);

                    fileStream.on("finish", () => {
                        fileStream.close();
                    });

                    fileStream.on("close", resolve);
                    fileStream.on("error", reject);
                    response.on("error", reject);
                });

                request.on("error", reject);
            });

            return `/images/generated/${filePath.split("/").pop()}${getImageExtension(normalizedUrl)}`;
        } catch (error) {
            lastError = error;

            if (attempt < attempts) {
                await wait(delayMs * attempt);
            }
        }
    }

    const fallbackExtension = getImageExtension(normalizedUrl);
    const fallbackPath = `${filePath}${fallbackExtension}`;
    fs.writeFileSync(fallbackPath, "", "utf-8");
    return `/images/generated/${filePath.split("/").pop()}${fallbackExtension}`;
}

main();
