import to from 'await-to-ts'
import {
    fetchDirectoryResponse,
    fetchResponse,
    fetchStatusResponse,
    fetchTransactionResponse,
    getDirectoryResponse,
    getStatusResponse,
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

const statusResponseXML = `
<?xml version="1.0" encoding="UTF-8"?>
<awidxma:AcquirerStatusRes
  xmlns:awidxma="http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0"
  xmlns:awenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:awsamac="urn:oasis:names:tc:SAML:2.0:ac"
  xmlns:awsamdce="urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE"
  xmlns:awsamecp="urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp"
  xmlns:awsammeta="urn:oasis:names:tc:SAML:2.0:metadata"
  xmlns:awvssamlass="urn:oasis:names:tc:SAML:2.0:assertion"
  xmlns:awvssamlprot="urn:oasis:names:tc:SAML:2.0:protocol"
  xmlns:awvsxmldsig="http://www.w3.org/2000/09/xmldsig#"
  xmlns:awvsxmlenc="http://www.w3.org/2001/04/xmlenc#" productID="NL:BVN:BankID:1.0" version="1.0.0">
  <awidxma:createDateTimestamp>2017-10-19T09:16:24.451Z</awidxma:createDateTimestamp>
  <awidxma:Acquirer>
    <awidxma:acquirerID>0030</awidxma:acquirerID>
  </awidxma:Acquirer>
  <awidxma:Transaction>
    <awidxma:transactionID>0030000020088521</awidxma:transactionID>
    <awidxma:status>Success</awidxma:status>
    <awidxma:statusDateTimestamp>2017-10-19T09:16:24.226Z</awidxma:statusDateTimestamp>
    <awidxma:container>
      <saml2p:Response
        xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" ID="RES-0030000020088521" InResponseTo="BLQ0030000000000001" IssueInstant="2017-10-19T09:16:24.281Z" Version="2.0">
        <saml2:Issuer
          xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">0030
        </saml2:Issuer>
        <saml2p:Status>
          <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success">
            <saml2p:StatusCode Value="urn:nl:bvn:bankid:1.0:status:Success"/></saml2p:StatusCode>
        </saml2p:Status>
        <saml2:Assertion
          xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
          xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="_a75adf55-01d7-40cc-929f" IssueInstant="2017-10-19T09:16:24.282Z" Version="2.0">
          <saml2:Issuer>BANKNL2Y</saml2:Issuer>
          <ds:Signature
            xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:SignedInfo>
              <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
              <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
              <ds:Reference URI="#_a75adf55-01d7-40cc-929f">
                <ds:Transforms>
                  <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                  <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                    <ec:InclusiveNamespaces
                      xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="xsd"/>
                    </ds:Transform>
                  </ds:Transforms>
                  <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                  <ds:DigestValue>3f7gw0K6NVfiqBp4oO7tzXqcVMlFi2w3y85l9+sgdj4=</ds:DigestValue>
                </ds:Reference>
              </ds:SignedInfo>
              <ds:SignatureValue>Op41zl/1t5epl9csOfPlWtwPA2wn757LCclno2lv6DvYfvLP4y6Nff8JQ30RaVv78hxZ5GVtLBzK4Cq6JuXNZSIQsPV3g0bTuNoQOEG99OJOlHNAOsKuqohjp9SXhlu0suWfGFm4+NP+G9i9tQjCZPPUr6NI7M+uiF4qII1RsTPjDT/m+cpssS3aC+ogqAmgIvS281070fBmI1wYG8FJiz0Gd3+HCu6cBb0WxlWjYe8xxlSsRK0oX/2PC0TC05iylObRksTqWnD0g42RfX+yys8E2KiVEMTKq4ijm5ArCUfT8bJ1CeeK3uoxYABucgNWdic2fD8AT8u3W64m2mQ46A==</ds:SignatureValue>
              <ds:KeyInfo>
                <ds:X509Data>
                  <ds:X509Certificate>MIIDbzCCAlegAwIBAgIEeCuDtTANBgkqhkiG9w0BAQsFADBoMQswCQYDVQQGEwJERTEMMAoGA1UECBMDTlJXMQ8wDQYDVQQHEwZBYWNoZW4xEjAQBgNVBAoTCVdvcmxkbGluZTESMBAGA1UECxMJV29ybGRsaW5lMRIwEAYDVQQDEwlXb3JsZGxpbmUwHhcNMTQwNzA4MTQwNDU1WhcNMTkwNzA3MTQwNDU1WjBoMQswCQYDVQQGEwJERTEMMAoGA1UECBMDTlJXMQ8wDQYDVQQHEwZBYWNoZW4xEjAQBgNVBAoTCVdvcmxkbGluZTESMBAGA1UECxMJV29ybGRsaW5lMRIwEAYDVQQDEwlXb3JsZGxpbmUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmCC1wb07Zza4csVSMWJNhkZttvAjNYFPtlsHI6aZdLHy04BMx27lXFYexs8ZhNtyhniIaB8O3OV1cP03cI3tWa2Q55eX1BysvmDnTYMprHiFktYvSuXdN1PFa8NNswNSLMsgja3Tp+SrHYka0MtsgVM79Rk16ExvSaGmYO0OV5dx666yKVUCBV/lU/8tyIhHQAdTM4KGdWggfPbcI/KkJeSk3YPHY1LbmdpdGDS8UJcBwuOw3JII8cXj3oDPGQWuXVfKVE2iS9IiEjAipTlfvrA1yZqwfq6PcUSrVEWa++kr/zTzSUAwlIHXL8OpLzi0cGRgdtVEjcvO1DkUuQrdBAgMBAAGjITAfMB0GA1UdDgQWBBQfp6FTr4Fw6bVeVGY0XvVtEsEu6DANBgkqhkiG9w0BAQsFAAOCAQEAFrD2fcNCyKM346xYRJ84PDaLA2MagOy9pC0j18iFGsR+LZpALkYQQweM2Xu9IWs+IJdTC6gnuQzCedAAFF+ovXs5r0bwwG7cmtOfdYQh0tjDk515MbVeVSXSnROJLPJVjcNeeHfdSAfKhJE3bmDtfVsPVtkjbuh5waisKbswb53+aM63PgNHdHt9X5la0HhY1Ggdxd2UicSl5+6ffEmSMQ9jTh4JcUMMvhi4bZeVM4renRWjF5v8VITl6lLZy3lKDzip5Mw8g8mtaj1GsY55/Q60vFSvLJztwuQw249zImAZ4JAINmrIPfpDT6wnwnprRXwgvE4o3AAFYCyJuHTZmg==</ds:X509Certificate>
                </ds:X509Data>
              </ds:KeyInfo>
            </ds:Signature>
            <saml2:Subject>
              <saml2:EncryptedID>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_b36c4a0e1929507249faf3fdb27e2c9c" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_0c6979ecaffe6d944ba98d1612ca5c7b">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>HAzrEN7OREm7bMWYnE2OiGQ7jmV9e/5MoxR8adx3YDv6ESN7SQ5YSIvA/EibApTHOVN698p7YXK4T+VB1FecEKtFxyoM46UyYBjB6IVARAvCp8BpwIxvJtbK8VrqXaeSPmUODhAZDCCz1oSTbYIN4If78ZhxeOfNUQ7AEZ9bZJ5q9VsXSUuUqxpDH0lvpHtd2b4jhxXpiXMkZxvLVYXJKFYP2yZT4mUhQDvH/EBca40Yu1/mqmMgk36KbxR5caqAQRuvrhAyl+umqLV/SwH6jfVNcGgTGJCPNvcIRTGjr/wdEDJe6Z9yPZwAiwwOOD0Tqz+W857FvYRvcHVjqKt4bg==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>D71hZ19KoWpTvQCWK5bvuLVXlA2jnpIpt06M9lsI1e70bdQan+LgRTo6fU3QDa+N6lLkhxRzzMtBEpjUV2rK9eVT2jJ7qJMlTwD+m9G1x0QkRilMbdg3eTQZkAgRCtRYfiwXyuAdMODbz8pNtaWFYoNmRV+rmyDSf1SkuC/wfCOgx2hWOunGQEHZA+WCThrkrfd5ihKQ1MKb3tP3hBFKtJExMbxTctWZ1b8ieCYT/Iyi8rb0to46t3u8kGlQm4lS</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedID>
            </saml2:Subject>
            <saml2:Conditions NotBefore="2017-10-19T09:16:24.281Z" NotOnOrAfter="2017-10-19T09:16:54.281Z">
              <saml2:AudienceRestriction>
                <saml2:Audience>WL Validation Srv</saml2:Audience>
              </saml2:AudienceRestriction>
            </saml2:Conditions>
            <saml2:AttributeStatement>
              <saml2:Attribute Name="urn:nl:bvn:bankid:1.0:bankid.deliveredserviceid">
                <saml2:AttributeValue
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xsd:string">21968
                </saml2:AttributeValue>
              </saml2:Attribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_14cad47c9b25c3024c774ddc741f48d3" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_f2aed1b52ea131bf6fd3d78ea947361c">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>iLRFMns/fsNMFptAKY+CwCQyhfi+9ETtg9frMwvlDDHkd4QQzDO8loGXXkjH9b5jHhX3PNTb09aODmYaoVIHAjFL110O3is/OkhOc4JC7ygh/roGfMZCcHr0P1eAXZPwCDelMzY1muylIvImhLdh5ef8liFmAFZ3S2bxLa9OKjhRELm0/Cj1/WYfQGqJ/6GxATD9MRRfDCu8r9Kb9az1WQ9mFHW/0kkcMznFLNO1Hwql6AtP6F67601ghqGqeEQZc13DMSN61UJYXY7U9utt+rqv0a0rJK6ZP96Xihll4BnjWncrUqkbsXo3iMB5oJTeEnOqhyqYkbJS+GMrHx07+g==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>FESYwCPzZGOfKYho7lG/7LXHMuDKWhuGdOu5Poeu5b5Yc58UpT33PrQZHpLpSSWBBpNBiX2DBDXpJ/227XjftavjS0W9ItEZs6wY0nxHh/kcRPEm6PBpJe3oQRvwFn+Aa9Mm9peY3tmJKa/Cs9wsIaS1yfvI9zvL+E4A7IyDl31GQNj6BhUglvikbArpBcpjm5wmNXveiedLQsvGluRjrHqDVkGneCY5XYS2lGNhFaMQrndlouBQaI2uqRBQHvUo8JTuSw9anxOumiLTBPnWcLufHI8Y2lfT2zbw3cn8jMvgiOfGLTR0tY4xD8wcflo2pzxtMgBt+wZCOQMeHI+BW6LqvFdEkeeOuhpPq9/y3J8fca7kELiGZsTe7jkSwEvlGzwU3wUCzMHhWIEYV84r3xL6uPGuDJPD/qRjnQPQkDsAKM0eeqivlEcw6TYUbhRn</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_061339f00e8b6f08a1b2f4e8c5a4d4c0" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_28074989aba0ba5258178a4d2c6e3bff">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>O4kwCommnhwbnUsFjOQobdigCMmwmEV4M3f9Jp9/opJI8jA4TmMNcQmj7vBNI0qLNauXw7KzUvA/TkgEa9amjklq2/kmiGxTKhUWa5JBzR6m7RbJYGj3aN3c0vqnKHl8N+/Tw6RPoULKFJOPiVHxQ24tbs9usBK3xyDYYQW6gSxZpL9ViXKnHzmorvVrUYBT8itdLW+SoH4jSrsaoZY3wO0OIruR77EPdYjGXx4r3HsXTY5mI1dBXC2ZvN07R0UzE+cUoHdi9q2UHylFO/TF4L+50tTEdyBMoO+WM9LiO7JycPeMEGXt+70kXBcZFPjmaPquk9SS8scNFDqoZZuJCQ==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>ReXmWCVt3/+fX/TtW6OkONr/SCf8cjPwpea36tUpbt4MD9fyMzihYuZmf/Auyn6OmPO26NqRWTQDKr+uQQxoWbLZo00hglsZSkWRGmrPvOzmv6WoRDVT9qFqIu3Sii5w7VahCfV+63lGLy6QJoZs11JDPtT212/G4RMxZl7S4RIgTvM+sirr4hUCVzOnSlofQo2sFy22WeqtQyuyMixbMR+9kOBtilBYRb0pkee7ITb1QP1WW0lj+Cl5L0Qd3i1oeuK8MTiI8zFKv1en1wZeXmw6gCZJDhSUSS2QM3pprkI2yV+KnvEMs7QxzV+ItZkYKEgvl8Ld91YikOyNU5h9nvkPvpWIJ2huwAcHE4R5TJfH7SOsR0tv46l9Fd4bJ7ZbnJ+Qk9o2XP6/KKeSuEcmUwc7GWcn6pjs+9JH2Xx79YLnlZtSTfS3SYi7IHrN7toH97HgLrAm6MIpEcosDmtWiQ==</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_e7d6f833e867007d31fa88ad23cb21f9" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_1459f353072d71a49aa9af20d9143006">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>KFdqjp9dRE17WnqgepByG6Lcu43OwGURLL4M/5jpTPlvXmafWybjaDoE/NIkjr/QHeOdliMzImUZUzljCm9YHU9EGrLcc3fyIs+18KFG7pGF5FewNkzdjqh/ump+6AQXXDTydmgc4n3F7mlm61MAicnRVZMDpS5W+VCap3/mG43TEaWERICAUSNX2twfTVFW01a+DITJXraUCR+PoMI12KQw3bPwK3qemtH6F6oVcevvGPFtkh2c5j2DCCE6BpJYLrhdBtcuPqx9JHm72Ofj8UQxtrBC/7fohb58eJpliDZe9Vi7wQTo9QehppvaU6YwyTcZx7x6CPIpU4qrJlTW0Q==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>jB/ATz6qOLAV0cGEEZ+PwQbByP8MRTVCIwx6vZfQQFIqxnU+e6UHAaTw1p4IL89OAp854TUuDtNlikB6IKkVwS9W+9/+ZEkrI0NNkuUnUGE7Jh3silCaCucpZhGoLhEFHsLLv3YYlquItJOCjzHwwCZWtB/LtyKaYk2qN6Vf9XuhDvK6YWc3gLhNO+NZPxnPeWbI7hNudiyPngFuWPXQX1s0o8jeBkmYjP9UJdOh0c9R2adhlm4WVRSCrziv0yOnY8t4saZJJGgeKOIAdhUMfT+Q0ak01N5TTmcSnrRDk516I1WAGn0ra8PMmCwlhel1xA5+fwaTo44WTH9Kb6G6n/WbXvptQ0WTd6+MLn36W2iqbPhpohky0zVjjje8gO8Pt0gnWNuCiY/AfQpTTA7CJJksBPIxHSALntOBmK9pOSO/br/O8CVgyvWCg47mgQcB</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_d5c573de38d8fb554c3a42b9003dd502" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_f131e299fb5fdf0ea213909be26e2752">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>eXTWT9Xli15p9IXUoocGOsP21go2FOCNexbhrSLHpd2lB4qdTRo5eXLeGL8/wfTQsWdALMV4cldJl6DL5iT3lXC+l7WhPkAueyYbHxX6QLgLS4IsPcSntsUkm0RbIKjzyeeG2UVS3BjCEUO9UNozpmkt8oHz7CyO19IJ1D6IJcQLZyLo2MFCcQv6KkLxk/h08iL9paA2IKWOl94eGWFRnMn22IEyvHs6umLcTWSYs5v3qqAZhS0xav3qzhc/MkheLOQf8QwMU9kiEHc/89i27YDzRWndaXibNbHu/rBJGwMvGvxdHwesJbQk6DEmloL2rL3yVvR1AJej06iyC1/WQA==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>Z8Gk5DKRya/C3OwxSlZ/MF3gJSIhRoCPeOE0mKQ8tVbjNL46YU70Ai9qNF1xbVp7Q69d2GwRU/eYbUZQvH+OIyc1CmwnjzG6r9K0eC+/LMbd1MF5d75B7bjsccoY5jlN2PkRckH0SYYQTbJhfCGoU9E0lfkbz9WgaCF7APIHjNA/EWshpTFeko4NHjy1Kac+b12Zy9zsiJxE8ZinOzpOvFzfCxmV06kex+JJAtdyeD9KGycx/NAOI/CSiYR7ebvci2/KN/Jhbl9jLO0luJF9yK87C27r9IfxOXCDxIeyaT+zLYP1T5ILX9vlgFhKz7fJ+ldlpVFarOi6IUE0YlAapWnvwvginQaMgFlxFfKxeJmHDbp+dRIRkv8NwV6uztw/Psi4NB/d3oJLNNf/wgOhtTYcJm1Q8/6IlDSUKCF9Xe8Uf0urEcOMMFHKL3dXq+9y</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_6f23a54f09c580f4c6523a17ff9ed9b4" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_f097f4b069a1737f82cc3d369d08e119">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>UGVVcqkmykWS7lAW3idy/yddIx1b17O8D1pDkqwLK7fxabxuXs7DxsbkGGPmmiI4uDshn8dObq7gVeej3dz8K3gefZB8uEsCkhqN/gMHLUr2RvpxIEghxsJMV2EEFpK/EKmXgNZUB0g5/hRWtR6M36ekPFfZAIpkd45HBz8YLypeKh+kCMg3Ako/KkpjNyHIrBKKRdGrxQgK/A+nIrdXRXaTIuFWl+xJCeLv52RKgPs+rPLE3SzToHJAJsSKFsp0Y59H6Qs2O3w6nXyv/FGAJvDk13Qv910ZK/0U3aT/lhgxVqLQJ1pSRFyopnu7ncVKcFPubUseesBpRlpIbB9ySg==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>W/fdiAZjtmzkY5xrX9fSUEyzF3yTr+AadZRd1/lLJW6iakun9k0ikSjgQ2hdoxez8YJpr2wppaz91poI046IJyhtdRXDCHWcPt6hFUu8h8NkPnFBTdU249DQQbFq03u1BjuVBrnmniQkQU/ikCzN/UV4mFzmYemBa2BQugVHUJh93Zuo6ppEyudk4HTB5XNOxlQK66B8pUY2GfSxOW+HRGmG0j84m9KDKuQABiLb7XbGlaOScfhivIzKAleOt1f5inFsq/DDfCoY41uuww8120+la/BXsbJoW+NfQmsUgv4DPz3Y2sYQ6cSjSQR3JdQuz+Di5/6enT9Ni1nf8L2nixX4qCaR31yPsyLyuE28hZyLAMra+F3ARQS+ebmfCHU1TeRbxNBQAbPBPYNca7uTxocqE6Ku+C1BVt9EiHMEI9vKUXQ9aZ+41q/B9vADhU8o</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_865b5ab2b4e4e5f45ca230e4ecaffb41" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_4054917ec9c7974e375539d105ec53df">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>CsG98kIXCyTInBopz0jZQQLfKH3zp+DYTOdGHMR4F8gO6D5Lb6e5sImcSfAzvj6GJzAxUif6jXk6N3o2E1Vhb7FGJ7xkCax6yMC3E/45RN5Y+uP0FgqpsuxCWNe32TDCFtnnWMvBLxed2XSWFXJm8AIe1uWxluW/CS0zn7Q7ZuFtuzm1fy3CNyk7VCcBlhs1oyJmKynvQ4YvKK3w4eWHMR+J0CmPdpV65hZTzw/dbvmYYEVb9l4M1ygj4wq9ym/Rwb2jw7YxT+7ufrcV2MNdkC1GJKEce2En3vBZcA6+kkMJ7hQL0PNGIGr1cyhP8ac+zKW4Xu3uxQPgWtutBRj2TA==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>vzZlZoAHUWfenGZIDxprd/YqKOZJdexDxP1X1L11Zyh2Ejg3i/VUWc/1YJdh8GhuBRPzF3Vkb/EjmVaUDd8BOAlpR19vLw/L2Z9WHW0gkpx4ny8tjbfgmPF/Sj6a9KdXLhF8U6oN3BmEAewgTsG12wgqW+4zn7TvY8jSqlA46KpEJPaw/hkGo3jr3j3/63cvyftKQtJqrDLIg1p1UukadLlEjorK6Uz/h+B3OUB8Co15oiN56Sot3Nwbfz3CEQfyZYPt82BTNuMAlGkwYLt4q/wvkHUzR8HzrgyIbhhyVERjrYf5KmRt6JQxA+/iDiJLMZniKL/oGAPDsGsO7NEaCNMknUgdfoOAu87OfUI+Op7OFmEblYOy6Q71UjKrUdOkmByidJ5RkySLGUIoPGSE1I1//IEP+3mPWyA09njwwGE64xLUEQt2gcw2tB1v8vsI</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_2e8c506c44950c8d35a65e1dabc64f03" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_2a2682bf9a61ef7cbc0cded203c124f0">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>B0M1whWGM/SFTZiA3xdi24xwwbl7UW09nZXVyw19k1lbDBnwydbWaLI7CUkA1gokmkZM8HVaGc0+XrXO03KlofpaKhmh9au3Cqw5ntxiBqqXPFaqyb/abOXYz0z5YAnO7LdysxzCH7QoaoF37rZqpUgVmOREjriKoKAsPU/pR0901ywG4LIm/xbdcVqegFnZJUUiRrQrhw6RTsRMx6ACl60EABGo687Rho00VWB9ImicaAr+avgYBJuxHYlpEl2jedhUuhz6Z34ZhAHHdFUcXMKKbAlZy8zr5szMJ8d9l7E6F1tWa/tYd6WwLX3cJ+Mhx1XAEFi/niQiPkvjojlU3A==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>4L09h4go0RHxwFafO6HS9DIb5X8VFUWZepAdz/LSGVekL3+a3nbiTiKZg1KWyykWxgtniT593K3Ywaq1eZToP46mUVHwsSV4eSgxKu02UJDBqHX2dfMVsaf5Oe6lW9ugEg3wPXuixv+SQA5vCOnZbGmbZOS/PszTae0qP+gwpAhJK0PM2BXRnDGoy7S4YVP8KAdiu8D06I0DOhZEog255Sa4GrATnftlPjeGyLZeFgjYzhzuEHk7QAH4GJMqsxeZOayquK8eardi8nX2KzXIb7lPHxLWO2NgCtK9XpYnWt0GJHSie/haJMrQbKmpwXd6Np3jG/cyPiA1co1DlLrtOhQ+3dTgXw15ycOBBgH37D9H+vhnvr8JPNMNfk5q82jm7Md9Tr5OfC94g4WMEyofohjj/FBhV5KBs0NDkcHx62E=</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_ebcb4efbb6f9e6430fdb87f9e549068b" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_8119f853dc0ccb645da63e4f6467d0f3">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>YDfiVKLYA33xnM7xHAUlx+zXnOmQj4WOQmVPbe+NazS1Co15DjoF+wmDSQ3DFhiMqL95PP3/y1TCPxQHLyTe5ou6JR0MK1jE+eL16KrFKjrvjKiRnV/vP/gHc/mc8KiWKWe16VRVkI3DpWjS+0S7BdRB5RjTF5S6Ah3XUtlIAbZnB1Y1pttFRJx6RHBKl2UhZOsWOc5JPV3DJO7MadgdCIdT5gThdjjtDphNCnvln4Yf19PQ3eaiZDpas3M1Kqqn7Q9DGKZTNX8A+aW1+mxNtB1AdZiYwF1Nbv35dKg8qGXy8IH355xitPyZNw2C2bYR2yvCQx29UJwRDFGyYNKDtQ==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>TAEufz66IOcMq33JgK4e+oUxvAtiqKl8N+Uf9uRB/HwpTF/D07uDYlLYr86lJqHdKK0ZZgTg5qFgo7viymop4ybnEHvJNKBA2qyDebMtEuPaBABKTEUGmKxdbZLkx6xoIQGjE8OFPMxiWeLFDZq1BR2OU9V/qd9A7RnebZy8qmkcGAzOFASjQRDSicbojODx/Oc3H8OdXzw808jTytrZR5KojmNfno0QvxS3dFI+0g3sPBCUyd0Pf+fCaOePCsCR0KW/2wBDS26PNWj9BZQ3GPvBddcfDsSGldmvsZB1bqoawQJ847GqWMSCQI7sxmfle6eHCSPEYOi0y19EDSJiNEDYFfjpb29i/fyMDnKGCqvxUvhjX3KEsBXKQCG/Hyy9G3yhA+WTw6kbmbll8v8iX8nPclZI4z71xbh72OGnxFcL7vo5cvjYCQE4WDrb4ZDx</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_ad2ebb4f5acc4b36fb9c0182594b795a" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_8a2fdbad2946cfcaded9ddc37fedf7f5">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>OYnM23bzciNbkqPSOYJBGTPiputUqkPpzabEca/TAK3owacLQ3BVbitQekxFv2ZK7pkjjlggel0A1U115aqN4hIdJdubJLVQ4LsGA+aqAY7uh/lEGlGtKjkZSaVsU7ma+/2DpIL+ZsHqti/b/Bzw+7Nbjn6+ECZDKNlwRZz8ySkZH64+hCHXXujEQWw56xtis9DmidtdPRnRuZtx0R6g26npLHUo9/inQ0lZqTfAP/DkixG5Altg5iWC9L+MLwgNrAZBYm3EupLpDt+jevYzhpbETX2pWHS4iwS+u6vrtaNv7m6BWQfWGmXqdKETDrzD8GygyHGCV+FivkHgH9f6tg==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>hMYp3O8kUWV2FxMAV113BJBw904/cGJ0tqlVDbGgKT2T7nmwgP5X9LLimwyWnc/CIscavkMClK/HkrZ50Kofw8lDCd0PSZAuFdblDcH96SdLRdL+XhpFe+WIzb7ODVC9p9PWRER7p9x5s4Lp39Bq2YGx6O16Tfm0UNmLHhAtYcfnJqCrpIzDu5tgpCxQ3AxcuWiqYDc5x0yZ4u2w4uwu7tJ38CYGG5hg5CS+QpLzddT5lIaXUKlBEMVmEpzyP2VWRxPR40G7DMlbcc9RvNRtdfEoye05qSYuc2vc7vUiqjjhackPMzgDtypk5+54aqDtXFjgsoDvOZRjo4HfbsX1FFHuFfhZ7nafh0K9IxYHMaZdJ+5Cy5vyMfXeCmBla2oMqo47SlZ5e2gnaLOOz0z9Vzrkn+IkQLSBx0LaWK6p8ts=</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_d73c7e4ca2283c7c57fb68bb637dcc2b" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_52e236b289ca7213b568857947841028">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>OW03zBgXC1Gf/0aTJMEOrwACm5KGhTrKS2c4XPlJQvNUYQqPq25AycSKd6Q5Eo/Snq3Gf8wJDqxTD1CVUBkNEE4vd4/rwIltIR5nBl03465nqnf+IizzN6vV4Jx/AYVf4sCRDGiFtdYJZkkp0pubso7JpCuNCdT7HsDEwbWW7qr7BceVrj9juu07hfYV3KAju7np65f2PrmDFq6EarpbXfcCgIHHlUX28WxHe++neYlzmsn6mW/thxzFe9H1RprWH4/UbdtyPW05O0v37IJZUCucZ5hy4XVEO6wkzWliY0uiVyXy60IJTzTvGGGh/pOFLpMsNudGTsXg2HGubDNqtA==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>xQwPfcc8Kff4hOdZ5gt1wzb2hwIp6jsN1rA6iq0KaLs0MA3qR/x5etmCrXAXSSMybWahIM7c10h+uNFFLUzfijVJEYqPF5EjxJ5VXMDeWGxvHPBPBPxOOdSzULFLM0fY+akcFJFlkYz4Yl6ixiq8GWG+W1izInQ+9tj9G/xJNhXPjpCmUvQ87XthlKVf6hYQdCTs3WFbBwRkGi/AvmikTXziEeHfH+6eAXcwAu7JICBTyhmiucuwbUdgKD+KHBI5e3Ycdk2+GlPNOfdMPL22sfY7wywSQlI2adE/h2MisNXf5BcZTHgaubcG4dKoI60JkI1qQTXXx7IuRn+9s06vEepwQzDLvc62Yj+Vdp8Sd6teGCia4wbvPXQsfvZUu/7tUnt2t8wc09OT0tM2B76QUaISvcCT6GAmraZ5IkWJBY5A91fZELVsqHRqNh8hZO0E</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_0d3f1dcc79ab659e0a540ff63d2e8b58" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_9a8d5a41d03698231fe9c0fd26da2d0e">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>O+MkhAKyU6217CfNKbMSIFeiF/X2Y2vKmZjk9IwdCd+u+0Dii7WZGo6x2b6+jNif7dvQCCl5W1rIXF7KAt3vR/9Qdi4FyVrsOQz0nh6KB/S1vBhOJWbzE0+xgJ+djeARrTEjUWoyCOBkC5epfNr5HfHwuosaFE4DZDLf/4fnrbdilbBzJUO8o90vZEA1ge0uemLdnbo4W6jICQTBGeLcRNt072NEn+8hok3PHJSk8EvwYdNEszqqUZ7vwPaRj4Y5QVh1DUI/TQQyrTPF0lrIz/lDhD4pXtTSkTSXKCBKeqlWP9h6xWZ5dZM45huqhkg0460JqDnhYCzaKg31GCu9Eg==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>ACL9jDGYLAlJ15/aQIcjp1COrKw8PqZ1xZ1lFKdnciHSHb2zL5j77oXmj+E7M1oILf5b62W7mbIqVDmpchpJdy1y0L6xk0iqf/37CdUSr9XFtwkOTKVMxyzspIsvvSaQqS5IngIa+oPSm/W66kjt9xjfOsUrAzgi1zojLvsPjDV9wNRzVL6Un1NtpxWHGJdvTFTU5iU0Hp36LOvTX5bJWTOV6UpfZzOLJMZad1TapsYX5NV9OMr6jvpBwEz7JvR2WX7RxHbj5iPXEigS571E69Vmt5gSTbYBSEuR4F+3oIcn3GHr38d7lsSNNU/ml033OjufI+EZDTDDjbsKrYLJjs2jcCUX9uOO4yQnaxHPuM07qjnkQRlsYt4veZQWckFARTlBEzr/BWDBxgcer9CenlzubWkpdJgQc28hfpI8N8k=</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_932acd28e2afd1930fd7bf3f8eec4a43" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_efe93cce10b3625123391459307750d5">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>XrQ973hk8Z6o+C9gPW/QfpKJWfP+KhbgVjIme/yZy8a2vLCW6P3zS41VZ3Ay8ggQxm7BQtR7d5vZ/VbIPPs/ZfQDlbrZu5dQeHqtgLBTlahv8TZA5WowBWn1lb7KxG40C3h6QAOsPxFv8zssIOHiwUGPp0Tmgq9gIseIQZIgVb3poYgBJCkr0rM6ebab6iZaA2X04Nur19NCWCP2/h+UpXNRh59xEOl8ZUMhkozC0jJDc9vB5qgzoIqe2VuapimkjobbnPF9tjdGYJw04iEPOFOWcOVbnw23CYe6GVlUUCmCWZk4E80x4KqCKLTdBIxolnluDr1AINiGUz7IVsueuw==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>aIrItcjEuJwG7inlCXXmOYxWq7cUAOySKflJ5pMznSyIA0IcOfDzSIaW8ZAzj+abmq8+1MYR54ws1v5l7SbdvoMxJ/vSk52fT95gZHddpRZUYT8qjh7pKpxt5bFKxpqv+qHtNPCjS3NoZcE2w4oHB2Oaw3NDSiojSecdR9x1EBksOYpAejaGEeu5uqzcBzrs5AduhppkwZFbyzU7tBB7Jh31+dmfrkaebNqiY9zhnkCrIh6eDKETEp3uPu1wJIYev+rWoi5B6CbjnWwqJmWJrkbmcsR97AseIBiFTxRBvE2y8aI8CSVW/SyoMR1o2PCrXry3OeVC8xCXwiy1Mum9xrdISCdYmU3VpaxQmi1E2fBKu9WXb1n/msi9nVmhMn1h11zQzdFlaZoLetgmt93crIBEofyJXDO5UB3ReZWrOs0=</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_a892755ec4a63f1039ee7628c31744f2" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_3629ad1cd88a4f81fb5f8ad11313e126">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>PqrH8CcDY9n2qTvNUSTD827aCvcguIX3EBPPNdt3tjUGgqIa3tdWOgVMHJka9YhSGG+osWYGgHMFBxZueJNC6D18FCypcDSpofLgWKg+OBh2eUTmcYA6yIPRGKZQBOgkzKbyHnW5NDD+vuRXh3i0BOu6eyznehyMZW1K0aAZyn2UF/V6gB9AZpo9g1KmqL0a4rHkaGqG/DnMmRQTiPbgymfJykFem8xpikRA3lav17BmSYVmFh3nLxiqPUAN27gPEMoTUelT2piXhOJolmtYcAjXVGrcUnkhkRDnXUNbnF6yNagOI7EQfytFirCZ6VlGssl13GCoPa+OSJ99kfTyRw==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>IAfURMK2nCyTVZ9kQrMviocQuwGp06VPQuiIZ3Iv/4owqGoUFHr9XkqNh8alL0NOg3xbZa77zFO65VkIVOo2bp9qmxrp240jkvZ9O0Br6k2Q39oXlD7srPk4eyLcPaF2h82bJ6wHAjKbQcTODKRNzM9ftY5d8pXwvl0P6JCWMd3kZbMJBHJa4iK7ZD77chmF8hz2Sootu1EvrkmOxU9Mnn7YhwroO09v8qK8shvNomyebnOE4oqQKRfkey6mwR5hGy474dA4rCtEbuuSr0xPGgsQPd67rLGOym5LhImxtd57DuOKnV68updvsrr4tNOGb7bEmBYf3b1O6LY6HQB4BSZaO1FfuirgiEuHqGpDo3DALl3QvWzyLp9XikdmyS32q8YX9nSkC8Ynrrh5h+QrEjKkatbbRn9V3uUv7n7srug3J6RRxkH4Xv1P0iXaB0Sp</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
              <saml2:EncryptedAttribute>
                <xenc:EncryptedData
                  xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_8a778fa6bfef408c92f3280aabe7227e" Type="http://www.w3.org/2001/04/xmlenc#Element">
                  <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
                  <ds:KeyInfo
                    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <xenc:EncryptedKey Id="_9041f1364c2da152fb0da4601807b7f0">
                      <xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                      </xenc:EncryptionMethod>
                      <xenc:CipherData>
                        <xenc:CipherValue>H+xDBrrv+0ll2BF30ubSUCtAmb9+U+JQ8Xfj2TBSUHujNKU9wQMh16zHm8QIXu5H3AUXOIWXolEdcEBmtHNarmrTSui8l0NXDmr2+8x9vF2nkQhO4V/m9F7LDvWaFX1eHVVJ+4k0VherpzzemTB+LW0mUqKfe5GZKYhFuVcr4eIWG5e8NvLiiwZkaSW5zurL7HF8Y6DuCpfQh4k+FdCKiYdJfYRPLPPo/JT5rI0R06Y2KycdB5lhnJyRLhJhnQ/nwtq5N2UNpyEdKEYXSmRBR5yQZGxAXkCeZrxkTYX7w8ydUAlwjfSVj0BLvY3DGz5mcn3r+1e/zHAJX/0F9nxnAg==</xenc:CipherValue>
                      </xenc:CipherData>
                    </xenc:EncryptedKey>
                  </ds:KeyInfo>
                  <xenc:CipherData>
                    <xenc:CipherValue>ogQB2R3LeMezjEYO3JLPX0e2yZfRIc74YTfKnbXkgWBNXfE2EmlNAuj/SQUIZ6vofYiL0AUsONEdAVPKYrHPQVduMSZrWL68VO+49rI/gwcUREUcweKZySR765Adurs9o2AZvaptC+ugJ9LKA8VOG3kDVMqD/JY7f8ncX6Z/vMaoad4JAtdtujGm2JBRNd4tLu18GiRxTosJAaqI69rkutiAIFQcb5CTB0GTGr9oPZp1pwxUo1sDbYoaH3nw7HPO4/eTztgXSHAG0xO7n22OUPQzWkZQ1zmnc+DBr19p9AJu3LRXnwM2pkldS9YCS3Mkn8rnhkE2oK0bPWqyABX5ANOWYE4SylAjU0lMglg2rWXy5A5u0c0tgPWYzTPykfyQuSOkGEyRyTtWxI7NN6Dl1CC1OofhYTUCFC14zEJ4hdQ=</xenc:CipherValue>
                  </xenc:CipherData>
                </xenc:EncryptedData>
              </saml2:EncryptedAttribute>
            </saml2:AttributeStatement>
            <saml2:AuthnStatement AuthnInstant="2017-10-19T09:16:24.294Z">
              <saml2:AuthnContext>
                <saml2:AuthnContextClassRef>nl:bvn:bankid:1.0:loa2</saml2:AuthnContextClassRef>
                <saml2:AuthenticatingAuthority>BANKNL2Y</saml2:AuthenticatingAuthority>
              </saml2:AuthnContext>
            </saml2:AuthnStatement>
          </saml2:Assertion>
        </saml2p:Response>
      </awidxma:container>
    </awidxma:Transaction>
    <Signature
      xmlns="http://www.w3.org/2000/09/xmldsig#">
      <SignedInfo>
        <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
        <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
        <Reference URI="">
          <Transforms>
            <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
            <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
          </Transforms>
          <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
          <DigestValue>gaoqvcUnGXmcu2sd9/VAvSFs6LWt0ZW7T0lLMYJFlCc=</DigestValue>
        </Reference>
      </SignedInfo>
      <SignatureValue>c1oQ/QRDTgZ00hkPEaiYcbRyoTzK5zR+eGFk4Nl83ynBt5RJCDBnPLSOfizN638E3hRzVSpzk2b65pBHAPzI635JOfXvD5DX8lC43Kse8qQazIv7/wyXMBrzrCwT+6tSuy7k1T8ZgHlOF1+ciDPSygIqrjnOX5xYb/205t+orsHBCAW1vFN2yiExv6w9GJtezB5BET3A+GqzWc+zMRSypAxnW5x6IXvvgo+BMewx+2QMMCH0CqmT2rEWNC3IeTWLmRAaQV/DXLVilFbjvgWEN/3Zo0ssMSiHDLpg/laiqO/h8kpClCIu+FUd7YjUjdOp+e/OauwQCn4v/wds7/yUFw==</SignatureValue>
      <KeyInfo>
        <KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName>
      </KeyInfo>
    </Signature>
  </awidxma:AcquirerStatusRes>
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
    const [err, res] = await to(getTransactionResponse('XXX', 'TXTID'))
    expect(err).toBeFalsy()
    expect(res).toMatchSnapshot()
  })

  it('should correctly parse and decrypt the status response', async () => {
    (fetch as any).mockResponseOnce(statusResponseXML)
    const [err, res] = await to(getStatusResponse('TXTID'))
    expect(err).toBeFalsy()
    expect(res).toMatchSnapshot()
  })
})
