// tslint:disable-next-line:no-reference
/// <reference path="../untyped.d.ts" />

import { ifError } from 'assert'
import to from 'await-to-ts'
import * as uuid from 'uuid/v1'

import {
  fetchStatusResponse,
  formatDirectoryProtocolXML,
  formatStatusProtocolXML,
  formatTransactionProtocolXML,
  getDirectoryResponse,
  getTransactionResponse,
} from '../lib'

const isserID = 'BANKNL2Y'
const acquirerID = '0030'
const _ID = '000000000001'
const transactionID = '0030000020088521'
const merchantReference = `${acquirerID}${_ID}` // uuid().replace(/-/g, '')

// tslint:disable-next-line:no-console
console.log(`
MerchantReference #${merchantReference}
TxID #${transactionID}

DIRECTORY REQUEST
${formatDirectoryProtocolXML()}

TRANSACTION REQUEST
${formatTransactionProtocolXML('BANKNL2Y', merchantReference)}

STATUS REQUEST
${formatStatusProtocolXML(transactionID)}
`)

async function main() {
  const [err0, directoryResponse] = await to(getDirectoryResponse())
  ifError(err0)
  // tslint:disable-next-line:no-console
  console.log('Issuers', directoryResponse.Directory.Country.countryNames, directoryResponse.Directory.Country.Issuer)
  const [err1, transactionResponse] = await to(getTransactionResponse(isserID, transactionID))
  ifError(err1)
  // tslint:disable-next-line:no-console
  console.log(`
  TransactionID: ${transactionResponse.Transaction.transactionID}
  IssuerAuthenticationURL: ${transactionResponse.Issuer.issuerAuthenticationURL}
  `)

  const [err2, statusResponse] = await to(fetchStatusResponse(transactionResponse.Transaction.transactionID))
  ifError(err2)
  // tslint:disable-next-line:no-console
  console.log('status xml response', statusResponse)
}

main()
