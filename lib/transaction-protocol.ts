import { SignedXml, xpath, FileKeyInfo, KeyInfoProvider } from 'xml-crypto'
import { DOMParser } from 'xmldom'
import * as uuid from 'uuid/v1'
import { pd } from 'pretty-data'
import {
  MERCHANT_ID,
  MERCHANT_SUBID,
  MERCHANT_RETURN_URL,
  EXPIRATION_PERIOD,
  PRIVATE_KEY,
  KEYNAME,
  REQUESTED_SERVICE,
  DEFAULT_LANGUAGE,
  LOA,
  ID_PREFIX,
} from './constants'

export function formatTransactionProtocolXML(
  issuerID: string,
  transactionID = uuid().replace(/-/g, ''),
  requestedService = REQUESTED_SERVICE
) {
  const sig = new SignedXml()
  const xml = pd.xmlmin(`
    <?xml version="1.0" encoding="UTF-8"?>
    <AcquirerTrxReq version="1.0.0"
      productID="NL:BVN:BankID:1.0"
      xmlns="http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0"
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
      <createDateTimestamp>${new Date().toISOString()}</createDateTimestamp>
      <Issuer>
        <issuerID>${issuerID}</issuerID>
      </Issuer>
      <Merchant>
        <merchantID>${MERCHANT_ID}</merchantID>
        <subID>0</subID>
        <merchantReturnURL>${MERCHANT_RETURN_URL}</merchantReturnURL>
      </Merchant>
      <Transaction>
        <expirationPeriod>${EXPIRATION_PERIOD}</expirationPeriod>
        <language>${DEFAULT_LANGUAGE}</language>
        <entranceCode>${ID_PREFIX}${transactionID}</entranceCode>
        <container>
          <samlp:AuthnRequest
            xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
            xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
            AttributeConsumingServiceIndex="${requestedService}"
            ID="${ID_PREFIX}${transactionID}"
            IssueInstant="${new Date().toISOString()}"
            Version="2.0"
            ProtocolBinding="nl:bvn:bankid:1.0:protocol:iDx"
            AssertionConsumerServiceURL="${MERCHANT_RETURN_URL}">
            <saml:Issuer>${MERCHANT_ID}</saml:Issuer>
            <samlp:RequestedAuthnContext Comparison="minimum">
              <saml:AuthnContextClassRef>nl:bvn:bankid:1.0:${LOA}</saml:AuthnContextClassRef>
            </samlp:RequestedAuthnContext>
          </samlp:AuthnRequest>
        </container>
      </Transaction>
    </AcquirerTrxReq>
  `)

  const entryPoint = '/*'
  const transformers = ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#']
  const xmlenc = 'http://www.w3.org/2001/04/xmlenc#sha256'
  const signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'

  const MyKeyInfo = function (this: any, key: string) {
    this._key = key

    this.getKeyInfo = function (key: any, prefix: string) {
      return `<KeyName>${KEYNAME}</KeyName>`
    }

    this.getKey = function (keyInfo: any) {
      return this._key
    }
  } as any

  sig.addReference(entryPoint, transformers, xmlenc, void 0, void 0, void 0, true)
  sig.keyInfoProvider = new MyKeyInfo(PRIVATE_KEY)
  sig.signatureAlgorithm = signatureAlgorithm
  sig.signingKey = PRIVATE_KEY
  sig.computeSignature(xml)
  const res = sig.getSignedXml()
  // verifyOwnSignature(res, xml)
  return res
}

// export function verifyOwnSignature(res: any, xml: string) {
//   var doc = new DOMParser().parseFromString(res)
//   var signature = xpath(doc, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0]
//   var sx = new SignedXml()
//   sx.keyInfoProvider = new FileKeyInfo('cert.pem')
//   sx.loadSignature(signature)
//   var result = sx.checkSignature(xml)
//   if (!result) {
//     console.warn(result, sx.validationErrors)
//   }
// }
