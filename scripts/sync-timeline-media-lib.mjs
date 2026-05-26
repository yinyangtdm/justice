/**
 * @deprecated Use: npm run timeline:media
 * Kept as a thin wrapper around generate-timeline-media-lib.mjs
 */
import { spawnSync } from "child_process"
import { join } from "path"

const script = join(import.meta.dirname, "generate-timeline-media-lib.mjs")
const result = spawnSync(process.execPath, [script], { stdio: "inherit" })
process.exit(result.status ?? 1)
