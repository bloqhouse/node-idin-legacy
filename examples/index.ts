/// <reference path="../untyped.d.ts" />

import * as uuid from 'uuid/v1'

import {
  formatDirectoryProtocolXML,
  formatTransactionProtocolXML,
  formatStatusProtocolXML,
} from '../lib'

const id = uuid().replace(/-/g, '')

console.log(`
ID #${id}

DIRECTORY REQUEST
${formatDirectoryProtocolXML()}

TRANSACTION REQUEST
${formatTransactionProtocolXML('BANKNL2Y')}

STATUS REQUEST
${formatStatusProtocolXML(id)}
`)
