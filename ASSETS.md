# Assets

## Prepare video for background (used in landing page)

1. Make 1920x1080 HD video
2. In FCP: Menu File > Send to Compressor > New Batch
3. In Compressor: Select preset "HEVC Broadband HD (and 4G LTE and higher)"
4. Remove audio track from result file:
   ```
   ffmpeg -i landing-page-background.mov -vcodec copy -an landing-page-background-no-audio.mov
   ```
