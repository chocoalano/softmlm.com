/*
 * Startup stub for hosts that look for the entry file inside the output
 * directory (Hostinger: output `build/public`, entry `server.cjs`). It holds
 * no configuration and only hands over to the app's wrapper, ../server.cjs.
 */
require('../server.cjs')
