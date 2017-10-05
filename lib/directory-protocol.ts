import { SignedXml, xpath, FileKeyInfo, KeyInfoProvider } from 'xml-crypto'
import { DOMParser } from 'xmldom'
import { MERCHANT_ID, PRIVATE_KEY, KEYNAME } from './constants'

export function formatDirectoryProtocolXML() {
  const sig = new SignedXml()
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <DirectoryReq version="1.0.0" productID="NL:BVN:BankID:1.0" xmlns="
    http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0"
    xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <createDateTimestamp>${new Date().toISOString()}</createDateTimestamp>
      <Merchant>
        <merchantID>${MERCHANT_ID}</merchantID>
        <subID>0</subID>
      </Merchant>
    </DirectoryReq>
  `.replace(/ (?!xmlns|version|productID|encoding)|\n/g, '')

  const entryPoint = '//*[local-name(.)=\'Merchant\']'
  const entryPointTest = '/*'
  const transformers = ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#']
  const xmlenc = 'http://www.w3.org/2001/04/xmlenc#sha256'
  const signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'

  const MyKeyInfo = function(this: any, key: string) {
    this._key = key

    this.getKeyInfo = function (key: any, prefix: string) {
      return `<KeyName>${KEYNAME}</KeyName>`
    }

    this.getKey = function (keyInfo: any) {
      return this._key
    }
  } as any

  sig.addReference(entryPointTest, transformers, xmlenc, void 0, void 0, void 0, true)
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
