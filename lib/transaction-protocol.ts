import { pd } from 'pretty-data'
import { signXML } from './idin-protocol'

import {
  DEFAULT_LANGUAGE,
  EXPIRATION_PERIOD,
  ID_PREFIX,
  KEYNAME,
  LOA,
  MERCHANT_ID,
  MERCHANT_RETURN_URL,
  MERCHANT_SUBID,
  PRIVATE_KEY,
  REQUESTED_SERVICE,
} from './constants'

export function formatTransactionProtocolXML(
  issuerID: string,
  transactionID: string,
  requestedService = REQUESTED_SERVICE,
) {
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

  return signXML(xml)
}
