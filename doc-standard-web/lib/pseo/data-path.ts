import { existsSync } from "fs"
import path from "path"

/**
 * Resolve a data/content file path in both dev and standalone builds.
 * Walks up a few directory levels from the current working directory.
 */
export function resolveDataPath(...segments: string[]) {
  const roots: string[] = [process.cwd()]
  // eslint-disable-next-line no-undef
  const moduleDir = typeof __dirname !== "undefined" ? __dirname : process.cwd()
  if (!roots.includes(moduleDir)) roots.push(moduleDir)

  for (const root of roots) {
    let dir = root
    for (let i = 0; i < 6; i += 1) {
      const candidate = path.join(dir, ...segments)
      if (existsSync(candidate)) return candidate
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  }

  return path.join(process.cwd(), ...segments)
}
