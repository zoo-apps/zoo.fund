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
 * not one — and a check that cries wolf gets switched off.
 *
 * The exemption is the dangerous part, so each one carries a `control`: a URL
 * on that host which certainly exists. If the control answers 200, the host is
 * not blocking us, the exemption is hiding real failures, and {@link dead}
 * refuses to run rather than report a clean sweep it cannot stand behind.
 *
 * nature.com used to be on this list. It is the exact host this file's opening
 * paragraph names as the fabrication it exists to catch, and it was exempted on
 * the assumption that a 404 from it meant blocking. It does not: a real article
 * returns 200 and an invented slug returns 404. Five fabricated Nature
 * citations sat behind that exemption while this reported nothing wrong.
 */
export const opaque = [
  { host: /^https?:\/\/(www\.)?worldwildlife\.org\//, control: 'https://www.worldwildlife.org/' },
  { host: /^https?:\/\/(www\.)?coindesk\.com\//, control: 'https://www.coindesk.com/' },
]

/** Links that are addresses rather than claims — an explorer, a template. */
const notCitations = [
  /basescan\.org\/(address|tx)\/$/,
  /zooscan\.io\/address\/$/,
  /** A form placeholder. Nothing follows the slashes, so there is no source. */
  /^https:\/\/$/,
  /** A template literal. The URL is built at runtime and cites nothing. */
  /\$\{/,
]

export function cited(patterns = surfaces) {
  const found = new Map()
  for (const pattern of patterns) {
    for (const file of globSync(pattern, { cwd: root })) {
      const source = readFileSync(resolve(root, file), 'utf8')
      // Up to whitespace or a quote, so a query string survives. The old class
      // stopped at `?`, which turned every youtube.com/watch?v=<id> into a bare
      // /watch — a URL that always answers 200 and names no video.
      for (const raw of source.match(/https:\/\/[^\s"'`<>\\)]+/g) ?? []) {
        const url = raw.replace(/[.,)]+$/, '')
        if (notCitations.some((r) => r.test(url))) continue
        if (!found.has(url)) found.set(url, file)
      }
    }
  }
  return [...found].map(([url, file]) => ({ url, file })).sort((a, b) => a.url.localeCompare(b.url))
}

/**
 * Some hosts answer 200 for something that is not there.
 *
 * YouTube serves the player shell for any id, real or invented, so a
 * status-only check calls every made-up video reachable. Reading the body for
 * "unavailable" does not work either — the phrase is in the shell of a page
 * that plays perfectly well, so it fails real videos.
 *
 * oEmbed answers the actual question: 200 with metadata for a video that
 * exists, 400 for one that does not.
 */
const indirect = [
  {
    host: /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//,
    ask: (url) => `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
  },
]

/** Follow one, and say what came back. 0 for unreachable, 404 for soft-gone. */
export async function reach(url, ms = 12_000) {
  const stop = AbortSignal.timeout(ms)
  try {
    const via = indirect.find((i) => i.host.test(url))
    const r = await fetch(via ? via.ask(url) : url, { redirect: 'follow', signal: stop })
    return r.status
  } catch {
    return 0
  }
}

/** An exemption that is not earned hides exactly what this looks for. */
export async function unearned() {
  const out = []
  for (const { host, control } of opaque) {
    if (await reach(control) === 200) out.push({ host: String(host), control })
  }
  return out
}

/** Every cited source that could not be reached. */
export async function dead(links = cited()) {
  const wrong = await unearned()
  if (wrong.length) {
    throw new Error(
      'these hosts answer normally, so exempting them hides real failures: ' +
        wrong.map((w) => w.control).join(', '),
    )
  }

  const out = []
  for (const { url, file } of links) {
    if (opaque.some(({ host }) => host.test(url))) continue
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
