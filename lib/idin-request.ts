import { ifError } from 'assert'
import to from 'await-to-ts'
import { promisify } from 'es6-promisify'
import idx from 'idx'
import 'isomorphic-fetch'
import { pd } from 'pretty-data'
import { FileKeyInfo, KeyInfoProvider, SignedXml, xpath } from 'xml-crypto'
import { decrypt } from 'xml-encryption'
import { xml2json } from 'xml-js'
import { DOMParser } from 'xmldom'
import { PRIVATE_KEY as key, PUBLIC_KEY_FINGERPRINT, ROUTING_ENDPOINT } from './constants'
import { formatDirectoryProtocolXML } from './directory-protocol'
import { formatStatusProtocolXML } from './status-protocol'
import { formatTransactionProtocolXML } from './transaction-protocol'

const DEFAULT_FETCH_CONFIG = {
  method: 'POST',
}

const DECRYPT_OPTIONS = {
  key,
}

const MyKeyInfo = function(this: any, key1: string) {
  // this.getKeyInfo = (privateKey: any, prefix: string) => {
  //   return `<KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName>`
  // }

  this.getKey = (keyInfo: any) => {
    return `-----BEGIN CERTIFICATE-----
MIIDzjCCAragAwIBAgIGAVdRyiTvMA0GCSqGSIb3DQEBCwUAMIGKMQswCQYDVQQG
EwJOTDEWMBQGA1UECBMNTm9vcmQgSG9sbGFuZDESMBAGA1UEBxMJQW1zdGVyZGFt
MRkwFwYDVQQLExBJbnRlcm5ldCBCYW5raW5nMRswGQYDVQQKExJBQk4gQU1STyBC
YW5rIE4uVi4xFzAVBgNVBAMTDnd3dy5hYm5hbXJvLm5sMB4XDTE2MDkyMjEyMDYy
NFoXDTE5MDkyMjEyMDYyNFowgYoxCzAJBgNVBAYTAk5MMRYwFAYDVQQIEw1Ob29y
ZCBIb2xsYW5kMRIwEAYDVQQHEwlBbXN0ZXJkYW0xGTAXBgNVBAsTEEludGVybmV0
IEJhbmtpbmcxGzAZBgNVBAoTEkFCTiBBTVJPIEJhbmsgTi5WLjEXMBUGA1UEAxMO
d3d3LmFibmFtcm8ubmwwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCd
EPU6zMZWeRA4HJrmd6BOletvBJJ7E8aTVwQ8X4Y3ulEjghk0HjAYN7GzHIu9fyTX
HEYWr1ewQZyqzzv4o6PfA/k3qRoLpqDjRWMQV38n/Bz+w3q50MT9HyC9+SJ4oWL3
FkPMyI0iOtgXLvSkQ9eUVzCQx2rgpftOXfcdaWiJrELwCT1GTxputqDE6pThfBze
P38uPbcdDAVltOUKLS/uH7xweTpKamA+VAozRlDm4JzOG8vrHgjHztfwpW5+sv19
gDje7bOWFDgqK+HNh4XHCW5OsfvXO4BoYvUVJZCpdLGsy62D8k3HDbmlnB+As4qj
LBM32CGVCvjLEsf+pb9JAgMBAAGjODA2MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/
BAQDAgWgMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMBMA0GCSqGSIb3DQEBCwUAA4IB
AQB5hj4RSq0XGqe0HIKL4sj+E40pECas7YEh0dKm6ZowFqJZy4+B8T3uztA348va
3yrPTQx7N4vBLupnrQQ2dX+Ut1LmavTDIpQDvHW1X7EoGBI7JWY3gIX/eUjTnEDJ
qn1U9zVTMEvypfxoHIM5UbyCf+b2eitgqPqHp4r3TyPmNEGUgvleofUTlPc8v8UF
oq4Vtm4mhTLcpi5A/jOdjTkEiHRsivzRyeSXpYszL6Mo6Z7yrxRjstUf3Pw467Ii
Jur8mQC/7X5ir8N7rS9Dp8waYRt8qbgf6xXfG6HALungkpiM11WQLuNoPKwhMZAW
VmT926W9yWIvNndcaHyseijI
-----END CERTIFICATE-----`
  }
} as any

const DOM = new DOMParser()
const XML = new SignedXml()
XML.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha512'
XML.keyInfoProvider = new MyKeyInfo('iDIN_ABN_PROD_merchant.cer')

export function fetchResponse(payload?: string, routingService = ROUTING_ENDPOINT) {
  if (!routingService) {
    return Promise.reject(new Error('ROUNTING_ENDPOINT is not defined.'))
  }

  const config = Object.assign({}, DEFAULT_FETCH_CONFIG, { body: payload })

  return fetch(routingService, config)
    .then((res) => res.text())
    .then((res) => verifySignature(res))
}

export function fetchDirectoryResponse() {
  const payload = formatDirectoryProtocolXML()
  return fetchResponse(payload)
}

export async function verifySignature(signedXML: string) {
  const doc = DOM.parseFromString(signedXML.trim())
  const signature = xpath(doc, '//*[local-name(.)=\'Signature\' and namespace-uri(.)=\'http://www.w3.org/2000/09/xmldsig#\']')
  const lastSig = signature.pop()
  XML.loadSignature(lastSig)
  const result = XML.checkSignature(signedXML.trim())
  /* istanbul ignore next */
  if (!result) {
    // tslint:disable:no-console
    console.error(new Error(XML.validationErrors))
  }

  return signedXML
}

// tslint:disable:no-string-literal
export async function getDirectoryResponse() {
  const payload = formatDirectoryProtocolXML()
  const [err, res] = await to(fetchDirectoryResponse())
  ifError(err)
  const parsed = JSON.parse(xml2json(res, { compact: true }) as any)
  console.log('diocane', res)
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

function _parseIssuers(issuers: IXMLIssuer | IXMLIssuer[]): IIssuer[] {
  const parse = (issuer: IXMLIssuer) => {
    return {
      issuerID: issuer['ns3:issuerID']._text,
      issuerName: issuer['ns3:issuerName']._text,
    }
  }
  return Array.isArray(issuers) ? issuers.map(parse) : [parse(issuers)]
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
  const xpathRes = xpath(new DOMParser().parseFromString(statusResponse), xpathQuery)
  const promises = xpathRes.map((res: any) => (promisify as any)(decrypt)(res.toString(), DECRYPT_OPTIONS))
  const [err1, attributes] = await to(Promise.all(promises))
  ifError(err1)
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
        Attributes: Object.assign({}, ...attributes.map((a: any) => JSON.parse(xml2json(a, { compact: true }) as any)).map((a) => ({
          [(a['saml2:NameID'] && 'NameID') || a['saml2:Attribute']._attributes.Name.split('consumer.')[1]]:
            (a['saml2:NameID'] && a['saml2:NameID']._text) || a['saml2:Attribute']['saml2:AttributeValue']._text,
        }))),
      },
    },
  }
}
