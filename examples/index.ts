// tslint:disable-next-line:no-reference
/// <reference path="../untyped.d.ts" />

import * as uuid from 'uuid/v1'

import {
  formatDirectoryProtocolXML,
  formatStatusProtocolXML,
  formatTransactionProtocolXML,
} from '../lib'

const id = uuid().replace(/-/g, '')

// tslint:disable-next-line:no-console
console.log(`
ID #${id}

DIRECTORY REQUEST
${formatDirectoryProtocolXML()}

TRANSACTION REQUEST
${formatTransactionProtocolXML('BANKNL2Y')}

STATUS REQUEST
${formatStatusProtocolXML(id)}
`)
