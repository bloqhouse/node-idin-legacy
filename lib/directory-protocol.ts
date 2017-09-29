import { MERCHANT_ID } from './constants'

export function formatDirectoryProtocolXML() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <DirectoryReq version="1.0.0" productID="NL:BVN:BankID:1.0" xmlns="
    http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0"
    xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <createDateTimestamp>${new Date().toISOString()}</createDateTimestamp>
      <Merchant>
        <merchantID>${MERCHANT_ID}</merchantID>
      </Merchant>
      <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
          <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
          <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
          <Reference URI="">
            <Transforms>
              <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
              <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            </Transforms>
            <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <DigestValue>VW+VjenRyZVFCNfBTeoxDflQ4yfR8KYFvwPVinVPqBs=</DigestValue>
          </Reference>
        </SignedInfo>
        <SignatureValue>IELLwKSGFMk64US23YrpZ8//hJ8DeJEtYht5knlxJvBOr8dcI+aJTBq+YtyzP9ClcK62Obs5aynHBE/GPHZShuMw+8WHq4fCMInOwKURgwjDOz8UYaIMqG0Ojiz8dFYGn+dH2lL0QVss4jmIIAD8MCijb27oqij6PclXw9Y9veI=</SignatureValue>
        <KeyInfo>
          <KeyName>7D665C81ABBE1A7D0E525BFC171F04D276F07BF2</KeyName>
        </KeyInfo>
      </Signature>
    </DirectoryReq>
  `
}
