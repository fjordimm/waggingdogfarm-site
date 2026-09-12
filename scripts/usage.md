Run these scripts from the root directory of the repo.

`secrets/notion.txt` should contain the Notion API key on line one, the news
 posts database ID on line two, and the controls database ID on line three.

## Download Google Drive images

The image downloader uses the public Google Drive folder, converts each image
to JPEG, and writes the `.jpg` files to `public/images/our_flowers`. Add your Google Drive API key as the first line of
`secrets/google_drive.txt`, then run:

```powershell
node .\scripts\fetch_google_drive_images.ts
```

The output directory is deleted and recreated before each run. Optional environment variables:

- `GOOGLE_DRIVE_FOLDER_ID` overrides the default folder ID.
- `GOOGLE_DRIVE_OUTPUT_DIR` overrides the output directory.