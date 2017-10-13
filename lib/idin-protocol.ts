import { FileKeyInfo, KeyInfoProvider, SignedXml, xpath } from 'xml-crypto'
import { DOMParser } from 'xmldom'
import { PRIVATE_KEY, PUBLIC_KEY_FINGERPRINT } from './constants'

export function signXML(xml: string, selfVerify: boolean = false) {
  const sig = new SignedXml()
  const entryPoint = '/*'
  const transformers = ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#']
  const xmlenc = 'http://www.w3.org/2001/04/xmlenc#sha256'
  const signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'
  const MyKeyInfo = function(this: any, key: string) {
    this.getKeyInfo = (privateKey: any, prefix: string) => {
      return `<KeyName>${PUBLIC_KEY_FINGERPRINT}</KeyName>`
    }
  } as any

  sig.addReference(entryPoint, transformers, xmlenc, void 0, void 0, void 0, true)
  sig.keyInfoProvider = new MyKeyInfo(PRIVATE_KEY)
  sig.signatureAlgorithm = signatureAlgorithm
  sig.signingKey = PRIVATE_KEY
  sig.computeSignature(xml)
  const res = sig.getSignedXml()
  selfVerify ? verifyOwnSignature(res, xml) : Function.prototype()
  return res
}

export function verifyOwnSignature(res: string, xml: string) {
  const doc = new DOMParser().parseFromString(res)
  const signature = xpath(doc, '//*[local-name(.)=\'Signature\' and namespace-uri(.)=\'http://www.w3.org/2000/09/xmldsig#\']')[0]
  const sx = new SignedXml()
  sx.keyInfoProvider = new FileKeyInfo('cert.pem')
  sx.loadSignature(signature)
  const result = sx.checkSignature(xml)
  /* istanbul ignore next */
  if (!result) {
    throw new Error(sx.validationErrors)
  }
}
