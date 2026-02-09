import fs from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import sharp from "sharp"

const ROOT_DIR = path.join(process.cwd(), "public", "images")
const MAX_BYTES = 50 * 1024
const QUALITY_STEPS = [80, 70, 60, 50, 40]
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"])

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else {
      files.push(fullPath)
    }
  }
  return files
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!SUPPORTED.has(ext)) return

  const outputPath = ext === ".webp" ? filePath : filePath.replace(new RegExp(`${ext}$`, "i"), ".webp")
  const input = await fs.readFile(filePath)

  let output = null
  let finalQuality = QUALITY_STEPS[0]
  for (const quality of QUALITY_STEPS) {
    const buffer = await sharp(input).webp({ quality }).toBuffer()
    output = buffer
    finalQuality = quality
    if (buffer.length <= MAX_BYTES) break
  }

  if (!output) return
  await fs.writeFile(outputPath, output)

  const sizeKb = (output.length / 1024).toFixed(1)
  const relative = path.relative(process.cwd(), outputPath)
  const status = output.length <= MAX_BYTES ? "OK" : "LARGE"
  console.log(`[${status}] ${relative} (${sizeKb} KB @ q${finalQuality})`)
}

async function run() {
  if (!existsSync(ROOT_DIR)) {
    console.log("No public/images directory found. Skipping.")
    return
  }

  const files = await walk(ROOT_DIR)
  if (files.length === 0) {
    console.log("No images found under public/images. Skipping.")
    return
  }

  for (const file of files) {
    await optimizeFile(file)
  }
}

run().catch((error) => {
  console.error("Image optimization failed:", error)
  process.exit(1)
})
