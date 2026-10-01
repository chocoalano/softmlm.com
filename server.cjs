/*
|--------------------------------------------------------------------------
| CommonJS entrypoint for Hostinger
|--------------------------------------------------------------------------
|
| Hostinger starts the app through LiteSpeed's lsnode.js, which loads the
| entry file with require(). "bin/server.js" is an ES module that uses
| top-level await, so require() fails with ERR_REQUIRE_ASYNC_MODULE. This
| wrapper loads the server with import() instead.
|
| "node ace build" copies this file to "build/server.cjs" (see metaFiles in
| adonisrc.ts), next to "build/bin/server.js"; the copy in the source root
| falls back to "build/bin/server.js". Hostinger looks for the entry file
| inside the output directory (`build/public`), where public/server.cjs, a
| one-line stub, requires this file. So the entry `server.cjs` starts the
| app from the root, from build/ or from build/public/.
|
*/

const { existsSync } = require('node:fs')
const { join } = require('node:path')
const { pathToFileURL } = require('node:url')

const candidates = [
  join(__dirname, 'bin', 'server.js'),
  join(__dirname, 'build', 'bin', 'server.js'),
]

;(async () => {
  const serverFile = candidates.find((file) => existsSync(file))
  if (!serverFile) {
    throw new Error(`Cannot find the compiled server, run "node ace build". Looked for:
  ${candidates.join('\n  ')}`)
  }

  await import(pathToFileURL(serverFile).href)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
