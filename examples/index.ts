/// <reference path="../untyped.d.ts" />

import {
  formatDirectoryProtocolXML,
  formatTransactionProtocolXML,
} from '../lib'

console.log(`
DIRECTORY REQUEST
${formatDirectoryProtocolXML()}

TRANSACTION REQUEST
${formatTransactionProtocolXML()}
`)
