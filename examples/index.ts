// tslint:disable-next-line:no-reference
/// <reference path="../untyped.d.ts" />

import { ifError } from 'assert'
import to from 'await-to-ts'
import * as uuid from 'uuid/v1'

import {
  formatDirectoryProtocolXML,
  formatStatusProtocolXML,
  formatTransactionProtocolXML,
  getDirectoryResponse,
  getStatusResponse,
  getTransactionResponse,
} from '../lib'

const issuerID = 'BANKNL2Y'
const acquirerID = '0030'
// const _ID = '000000000001'
// const transactionID = '0030000020088521'
// const merchantReference = `${acquirerID}${_ID}` // uuid().replace(/-/g, '')
const TEST_ENTRANCE_CODES =  {
  success: `succesHIO100OIHtest`,
  cancelled: `cancelledHIO200OIHtest`,
  expiredEntranceCode: `expiredHIO300OIHtest`,
  openEntranceCode: `openHIO400OIHtest`,
  failureEntranceCode: `failureHIO500OIHtest`,
}

async function executeFlow(entranceCode: string) {
    // tslint:disable-next-line:no-console
  console.log(`
  executeFlow - entranceCode #${entranceCode}

  DIRECTORY REQUEST
  ${formatDirectoryProtocolXML()}

  TRANSACTION REQUEST
  ${formatTransactionProtocolXML(issuerID, entranceCode)}

  STATUS REQUEST
  ${formatStatusProtocolXML(entranceCode)}
  `)

  const [err0, directoryResponse] = await to(getDirectoryResponse())
  ifError(err0)
  // tslint:disable:no-console
  console.log('Issuers', directoryResponse.Directory.Country.countryNames, directoryResponse.Directory.Country.Issuer)
  const [err1, transactionResponse] = await to(getTransactionResponse(issuerID, entranceCode))
  ifError(err1)
  console.log('transaction response', transactionResponse)
  console.log(`
  TransactionID: ${transactionResponse.Transaction.transactionID}
  IssuerAuthenticationURL: ${transactionResponse.Issuer.issuerAuthenticationURL}
  `)

  const [err2, statusResponse] = await to(getStatusResponse(transactionResponse.Transaction.transactionID))
  ifError(err2)
  console.log('status response', statusResponse)
  process.exit(0)
}

async function main() {
  for (const entranceCode of Object.values(TEST_ENTRANCE_CODES)) {
    const [err, res] = await to(executeFlow(entranceCode))
    ifError(err)
  }
}

main().catch(console.error)
