import { ifError } from 'assert'
import to from 'await-to-ts'
import 'isomorphic-fetch'
import { xml2json } from 'xml-js'
import { ROUTING_ENDPOINT } from './constants'
import { formatDirectoryProtocolXML } from './directory-protocol'
import { formatStatusProtocolXML } from './status-protocol'
import { formatTransactionProtocolXML } from './transaction-protocol'

const DEFAULT_FETCH_CONFIG = {
  method: 'POST',
}

export function fetchResponse(payload?: string, routingService = ROUTING_ENDPOINT) {
  if (!routingService) {
    return Promise.reject(new Error('ROUNTING_ENDPOINT is not defined.'))
  }

  const config = Object.assign({}, DEFAULT_FETCH_CONFIG, { body: payload })

  return fetch(routingService, config)
    .then((res) => res.text())
}

export function fetchDirectoryResponse() {
  const payload = formatDirectoryProtocolXML()
  return fetchResponse(payload)
}

// tslint:disable:no-string-literal
export async function getDirectoryResponse() {
  const payload = formatDirectoryProtocolXML()
  const [err, res] = await to(fetchDirectoryResponse())
  ifError(err)
  const parsed = JSON.parse(xml2json(res, { compact: true }) as any)
  return {
    createDateTimestamp: parsed['ns3:DirectoryRes']['ns3:createDateTimestamp']._text,
    Acquirer: {
      acquirerID: parsed['ns3:DirectoryRes']['ns3:Acquirer']['ns3:acquirerID']._text,
    },
    Directory: {
      directoryDateTimestamp: parsed['ns3:DirectoryRes']['ns3:Directory']['ns3:directoryDateTimestamp']._text,
      Country: {
        countryNames: parsed['ns3:DirectoryRes']['ns3:Directory']['ns3:Country']['ns3:countryNames']._text,
        Issuer: _parseIssuers(parsed['ns3:DirectoryRes']['ns3:Directory']['ns3:Country']['ns3:Issuer']),
      },
    },
  }
}

interface IXMLNode {
  _text: string
}

interface IXMLIssuer {
  'ns3:issuerID': IXMLNode
  'ns3:issuerName': IXMLNode
}

interface IIssuer {
  issuerID: string
  issuerName: string
}

function _parseIssuers(issuers: IXMLIssuer[]): IIssuer[] {
  return issuers.map((issuer) => {
    return {
      issuerID: issuer['ns3:issuerID']._text,
      issuerName: issuer['ns3:issuerName']._text,
    }
  })
}

export function fetchTransactionResponse(issuerID: string, transactionID: string, requestedService?: string) {
  const payload = formatTransactionProtocolXML(issuerID, transactionID, requestedService)
  return fetchResponse(payload)
}

export async function getTransactionResponse() {
  const payload = formatDirectoryProtocolXML()
  const [err, res] = await to(fetchDirectoryResponse())
  ifError(err)
  const parsed = JSON.parse(xml2json(res, { compact: true }) as any)
  return {
    createDateTimestamp: parsed['ns3:AcquirerTrxRes']['ns3:createDateTimestamp']._text,
    Acquirer: {
      acquirerID: parsed['ns3:AcquirerTrxRes']['ns3:Acquirer']['ns3:acquirerID']._text,
    },
    Issuer: {
      issuerAuthenticationURL: parsed['ns3:AcquirerTrxRes']['ns3:Issuer']['ns3:issuerAuthenticationURL']._text,
    },
    Transaction: {
      transactionID: parsed['ns3:AcquirerTrxRes']['ns3:Transaction']['ns3:transactionID']._text,
      transactionCreateDateTimestamp: parsed['ns3:AcquirerTrxRes']['ns3:Transaction']['ns3:transactionCreateDateTimestamp']._text,
    },
  }
}

export function fetchStatusResponse(transactionID: string) {
  const payload = formatStatusProtocolXML(transactionID)
  return fetchResponse(payload)
}
