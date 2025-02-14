import path from "path";
import sharp from "sharp";
import * as fs from "fs/promises";
import { parentPort, isMainThread } from "node:worker_threads";

if (!isMainThread) {
  parentPort.on("message", async function (data) {
    const { file, options } = data;

    try {
      const folderName =
        options.programName?.toLowerCase().replace(/\s+/g, "-") || "default";
      const baseDir = path.join(process.cwd(), "public", "uploads", folderName);

      await fs.mkdir(baseDir, { recursive: true, mode: 0o755 });

      const fileName = `${path.parse(file.filename).name}.webp`;
      const outputPath = path.join(baseDir, fileName);

      const hasilOptimasi = await sharp(file.path)
        .rotate()
        .resize(800, 800, {
          fit: "inside",
          withoutEnlargement: true,
          kernel: "lanczos3",
        })
        .webp({
          quality: options.quality,
          effort: 3,
          smartSubsample: true,
        })
        .toFile(outputPath);

      sharp.cache(false);

      await fs.unlink(file.path);

      parentPort.postMessage({
        success: true,
        filename: fileName,
        output: outputPath,
        info: hasilOptimasi,
      });
    } catch (error) {
      parentPort.postMessage({
        success: false,
        error: error.message,
      });
    }
  });
}
