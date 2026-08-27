import { globSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Every source this site cites, and whether it exists.
 *
 * A citation is a promise that someone else said something. On a site that
 * asks people for money it is also the evidence for every claim next to it, and
 * a link nobody follows is indistinguishable from one that works — which is why
 * a page can carry a fabricated reference to Nature for a year and read fine
 * the whole time.
 *
 * The failure this catches is specific and it has happened here: paths invented
 * under real institutions. `nature.com/articles/ai-conservation-2024` has the
 * shape of a citation and none of the substance, and so did references to NSF,
 * arXiv, PLOS, Panthera and two named partners' own impact reports.
 *
 * So the links are read out of the source and followed. A 404 is a fabricated
 * citation or a moved one, and both want the same fix: cite what exists or say
 * nothing. There is no allowlist — a source that cannot be reached is not a
 * source.
 */

const here = dirname(fileURLToPath(import.meta.url))
export const root = resolve(here, '..')

export const surfaces = ['app/**/*.tsx', 'app/**/*.ts', 'components/**/*.tsx', 'lib/**/*.ts']

/**
 * Hosts whose answer says nothing about whether the page is there.
 *
 * A block page is not a missing page. These serve 403 or 429 to anything that
 * is not a browser, so following them here would report a fabrication that is
 * not one — and a check that cries wolf gets switched off, which is worse than
 * not having it.
 */
export const opaque = [/^https?:\/\/(www\.)?(worldwildlife\.org|coindesk\.com|nature\.com)\//]

/** Links that are addresses rather than claims — an explorer, a template. */
const notCitations = [
  /basescan\.org\/(address|tx)\/$/,
  /zooscan\.io\/address\/$/,
  /** A form placeholder. Nothing follows the slashes, so there is no source. */
  /^https:\/\/$/,
]

export function cited(patterns = surfaces) {
  const found = new Map()
  for (const pattern of patterns) {
    for (const file of globSync(pattern, { cwd: root })) {
      const source = readFileSync(resolve(root, file), 'utf8')
      for (const raw of source.match(/https:\/\/[a-zA-Z0-9./_%-]+/g) ?? []) {
        const url = raw.replace(/[.,)]+$/, '')
        if (notCitations.some((r) => r.test(url))) continue
        if (!found.has(url)) found.set(url, file)
      }
    }
  }
  return [...found].map(([url, file]) => ({ url, file })).sort((a, b) => a.url.localeCompare(b.url))
}

/** Follow one, and say what came back. */
export async function reach(url, ms = 12_000) {
  const stop = AbortSignal.timeout(ms)
  try {
    const r = await fetch(url, { redirect: 'follow', signal: stop })
    return r.status
  } catch {
    return 0
  }
}

/** Every cited source that could not be reached. */
export async function dead(links = cited()) {
  const out = []
  for (const { url, file } of links) {
    if (opaque.some((r) => r.test(url))) continue
    const status = await reach(url)
    if (status !== 200) out.push({ url, file, status })
  }
  return out
}

/** Run directly: report every source that could not be reached, and fail. */
if (import.meta.url === `file://${process.argv[1]}`) {
  const links = cited()
  const gone = await dead(links)
  console.log(`cites: ${links.length} sources, ${gone.length} unreachable`)
  for (const { status, url, file } of gone) console.log(`  ${status}  ${url}  <- ${file}`)
  if (links.length === 0) {
    console.error('cites: read no sources at all, which is not the same as finding none')
    process.exit(1)
  }
  process.exit(gone.length === 0 ? 0 : 1)
}
