import { ifError } from 'assert'
import to from 'await-to-ts'
import * as promisify from 'es6-promisify'
import 'isomorphic-fetch'
import { decrypt } from 'xml-encryption'
import { xml2json } from 'xml-js'
import { DOMParser } from 'xmldom'
import { select } from 'xpath'
import { PRIVATE_KEY as key, ROUTING_ENDPOINT } from './constants'
import { formatDirectoryProtocolXML } from './directory-protocol'
import { formatStatusProtocolXML } from './status-protocol'
import { formatTransactionProtocolXML } from './transaction-protocol'

const DEFAULT_FETCH_CONFIG = {
  method: 'POST',
}

const DECRYPT_OPTIONS = {
  key,
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

export async function getTransactionResponse(issuerID: string, transactionID: string, requestedService?: string) {
  const [err, res] = await to(fetchTransactionResponse(issuerID, transactionID, requestedService))
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

export async function getStatusResponse(transactionID: string) {
  const xpathQuery = '//*[local-name(.)=\'EncryptedData\']'
  const [err, statusResponse] = await to(fetchStatusResponse(transactionID))
  ifError(err)
  const xpathRes = select(xpathQuery, new DOMParser().parseFromString(statusResponse))
  const promises = xpathRes.map((res) => promisify(decrypt)(res.toString(), DECRYPT_OPTIONS))
  const [err1, attributes] = await to(Promise.all(promises))
  const parsed = JSON.parse(xml2json(statusResponse, { compact: true }) as any)
  return {
    createDateTimestamp: parsed['awidxma:AcquirerStatusRes']['awidxma:createDateTimestamp']._text,
    Acquirer: {
      acquirerID: parsed['awidxma:AcquirerStatusRes']['awidxma:Acquirer']['awidxma:acquirerID']._text,
    },
    Transaction: {
      transactionID: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:transactionID']._text,
      status: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:status']._text,
      statusDateTimestamp: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:statusDateTimestamp']._text,
      Response: {
        TransactionID: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:container']['saml2p:Response']._attributes.ID,
        EntranceCode: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:container']['saml2p:Response']._attributes.InResponseTo,
        StatusCode: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:container']['saml2p:Response']['saml2p:Status']['saml2p:StatusCode']._attributes.Value.split('status:')[1],
        IssuerID: parsed['awidxma:AcquirerStatusRes']['awidxma:Transaction']['awidxma:container']['saml2p:Response']['saml2:Assertion']['saml2:Issuer']._text,
        Attributes: Object.assign({}, ...attributes.map((a) => JSON.parse(xml2json(a, { compact: true }) as any)).map((a) => ({
          [(a['saml2:NameID'] && 'NameID') || a['saml2:Attribute']._attributes.Name.split('consumer.')[1]]:
            (a['saml2:NameID'] && a['saml2:NameID']._text) || a['saml2:Attribute']['saml2:AttributeValue']._text,
        }))),
      },
    },
  }
}
