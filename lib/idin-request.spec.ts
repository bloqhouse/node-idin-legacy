import to from 'await-to-ts'
import {
  fetchDirectoryResponse,
  fetchResponse,
  fetchStatusResponse,
  fetchTransactionResponse,
  getDirectoryResponse,
  getTransactionResponse,
} from './idin-request'

// tslint:disable:max-line-length
const mockedBody = `<?xml version="1.0" encoding="UTF-8"?>
<ns3:DirectoryRes xmlns:ns3="http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0" xmlns="http://www.w3.org/2000/09/xmldsig#" xmlns:ns10="urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp" xmlns:ns2="http://www.w3.org/2001/04/xmlenc#" xmlns:ns4="urn:oasis:names:tc:SAML:2.0:ac" xmlns:ns5="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:ns6="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ns7="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:ns8="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns9="urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE" productID="NL:BVN:BankID:1.0" version="1.0.0">
    <ns3:createDateTimestamp>2017-10-14T23:36:15.018Z</ns3:createDateTimestamp>
    <ns3:Acquirer>
        <ns3:acquirerID>0030</ns3:acquirerID>
    </ns3:Acquirer>
    <ns3:Directory>
        <ns3:directoryDateTimestamp>2016-10-12T06:37:46.000Z</ns3:directoryDateTimestamp>
        <ns3:Country>
            <ns3:countryNames>Nederland</ns3:countryNames>
            <ns3:Issuer>
                <ns3:issuerID>BANKNL2U</ns3:issuerID>
                <ns3:issuerName>eTT ValidationService</ns3:issuerName>
            </ns3:Issuer>
            <ns3:Issuer>
                <ns3:issuerID>HKVSNL2A</ns3:issuerID>
                <ns3:issuerName>HKSVNL2A</ns3:issuerName>
            </ns3:Issuer>
            <ns3:Issuer>
                <ns3:issuerID>BANKNL2Y</ns3:issuerID>
                <ns3:issuerName>WL Issuer SIM iDIN ABN INT</ns3:issuerName>
            </ns3:Issuer>
        </ns3:Country>
    </ns3:Directory>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
            <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
            <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />
            <Reference URI="">
                <Transforms>
                    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                    <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                </Transforms>
                <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
                <DigestValue>sOan2IiPQgHguQp6xfrsizDhTc6fK+xTYvTDGwszIUw=</DigestValue>
            </Reference>
        </SignedInfo>
        <SignatureValue>LpKukOMevEiPolhRow8InNgzZVXJVFTGaFtIPkh0uxG0gACZmPS3uwfxNJkcoWWJYGizSMbszjKuKJLwlpRPsPrwhEMfZK23omW8x01ikrtFvMhpnepumHc1hjcq/EyI/z9C20Nwuq2C7zwCfV6Nj0tVX/2hfAf5nnlfL4kTUnmJmKBcNxFJbr8zgM+oO84ltc0zW/xayslHvun+vUWYmMKKJXg+43wfpeWLSFWLllLHQA6QsIYPKsyqVt683UfESPeqc2KMtvsuH6sYCkbKDLxRQKKwM2tu8A38sv6fUNjrV7nLkEc/jelAU3arlyoF9iFwa8TsrZgwkCWp7BzUNg==</SignatureValue>
        <KeyInfo>
            <KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName>
        </KeyInfo>
    </Signature>
</ns3:DirectoryRes>
`

const directoryResponseXML = mockedBody
const transactionResponseXML = `
<?xml version="1.0" encoding="UTF-8"?>
<ns3:AcquirerTrxRes xmlns:ns3="http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0" xmlns="http://www.w3.org/2000/09/xmldsig#" xmlns:ns10="urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp" xmlns:ns2="http://www.w3.org/2001/04/xmlenc#" xmlns:ns4="urn:oasis:names:tc:SAML:2.0:ac" xmlns:ns5="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:ns6="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ns7="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:ns8="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns9="urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE" productID="NL:BVN:BankID:1.0" version="1.0.0">
    <ns3:createDateTimestamp>2017-10-16T09:53:03.580Z</ns3:createDateTimestamp>
    <ns3:Acquirer>
        <ns3:acquirerID>0030</ns3:acquirerID>
    </ns3:Acquirer>
    <ns3:Issuer>
        <ns3:issuerAuthenticationURL>https://abnamro-test.bank-request.com/bvn-idx-bankid-rs/consumerAuthenticationSim?hash=IQJYieK%2BLFHDBQD3%2BPx6BdLhDwRk09bD9Cg3PuUwNIE%3D</ns3:issuerAuthenticationURL>
    </ns3:Issuer>
    <ns3:Transaction>
        <ns3:transactionID>0030000020078939</ns3:transactionID>
        <ns3:transactionCreateDateTimestamp>2017-10-16T09:53:03.580Z</ns3:transactionCreateDateTimestamp>
    </ns3:Transaction>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
            <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
            <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />
            <Reference URI="">
                <Transforms>
                    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                    <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                </Transforms>
                <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
                <DigestValue>AS1A91w8JeFE4QzMClR0apteAQL+NZ4ZOuei+Iy6YGg=</DigestValue>
            </Reference>
        </SignedInfo>
        <SignatureValue>LZgLEUsb52E2pGYzsVK7uyI8FXsxXFP/ljw+XBWeL2QImjPx1mvudaWZGAAgc03sYf0I5qYOgUOZ3EggKgrxLMIzCwvskic0tSqTkNliEYGVRnMvgbmyaZvrKEIyERWdXy40nEZh/WLeTxdAN2yqTga0eMVgDp4EvdTQmMvExYrlWW2MQG6vJB4JC1KXYn/BOew9ImNXRot5MbhuR4DPWMogVI5ab/j6U4KF30VsXz2Q/dpBp3DE0FVYk2iQU8npuhWY8SJ6rCHtrkkIlT+wOkd85xXJQqHcVEEV6+6CO0Cbvg1CjdOWrUG7jpYfJPgZaMZuW8ggusLsOxB/2EKtTQ==</SignatureValue>
        <KeyInfo>
            <KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName>
        </KeyInfo>
    </Signature>
</ns3:AcquirerTrxRes>
`

describe('idin request', () => {
  it('should fail if not ROUNTING_ENDPOINT', async () => {
    const [err, res] = await to(fetchResponse('xxx', null as any))
    expect(res).toBeFalsy()
    expect(err).toBeTruthy()
    expect(err.message).toBe('ROUNTING_ENDPOINT is not defined.')
  })

  it('should send directory request', async () => {
    (fetch as any).mockResponseOnce(mockedBody)
    const [err, res] = await to(fetchDirectoryResponse())
    expect(err).toBeFalsy()
    expect(res).toBe(mockedBody)
  })

  it('should send transaction request', async () => {
    (fetch as any).mockResponseOnce(mockedBody)
    const [err, res] = await to(fetchTransactionResponse('issuerID', 'transactionID'))
    expect(err).toBeFalsy()
    expect(res).toBe(mockedBody)
  })

  it('should send status request', async () => {
    (fetch as any).mockResponseOnce(mockedBody)
    const [err, res] = await to(fetchStatusResponse('transactionID'))
    expect(err).toBeFalsy()
    expect(res).toBe(mockedBody)
  })
})

describe('idin response', () => {
  it('should correctly parse the directory response', async () => {
    (fetch as any).mockResponseOnce(directoryResponseXML)
    const [err, res] = await to(getDirectoryResponse())
    expect(err).toBeFalsy()
    expect(res).toMatchSnapshot()
  })

  it('should correctly parse the transaction response', async () => {
    (fetch as any).mockResponseOnce(transactionResponseXML)
    const [err, res] = await to(getTransactionResponse())
    expect(err).toBeFalsy()
    expect(res).toMatchSnapshot()
  })
})
