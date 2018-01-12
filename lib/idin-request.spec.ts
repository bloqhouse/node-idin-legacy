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
const directoryResponseXML = `<?xml version=\"1.0\" encoding=\"UTF-8\"?><ns3:DirectoryRes xmlns:ns3=\"http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0\" xmlns=\"http://www.w3.org/2000/09/xmldsig#\" xmlns:ns10=\"urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp\" xmlns:ns2=\"http://www.w3.org/2001/04/xmlenc#\" xmlns:ns4=\"urn:oasis:names:tc:SAML:2.0:ac\" xmlns:ns5=\"urn:oasis:names:tc:SAML:2.0:assertion\" xmlns:ns6=\"urn:oasis:names:tc:SAML:2.0:metadata\" xmlns:ns7=\"urn:oasis:names:tc:SAML:2.0:protocol\" xmlns:ns8=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns9=\"urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE\" productID=\"NL:BVN:BankID:1.0\" version=\"1.0.0\">\n    <ns3:createDateTimestamp>2017-10-25T11:54:15.603Z</ns3:createDateTimestamp>\n    <ns3:Acquirer>\n        <ns3:acquirerID>0030</ns3:acquirerID>\n    </ns3:Acquirer>\n    <ns3:Directory>\n        <ns3:directoryDateTimestamp>2016-10-12T06:37:46.000Z</ns3:directoryDateTimestamp>\n        <ns3:Country>\n            <ns3:countryNames>Nederland</ns3:countryNames>\n            <ns3:Issuer>\n                <ns3:issuerID>BANKNL2U</ns3:issuerID>\n                <ns3:issuerName>eTT ValidationService</ns3:issuerName>\n            </ns3:Issuer>\n            <ns3:Issuer>\n                <ns3:issuerID>HKVSNL2A</ns3:issuerID>\n                <ns3:issuerName>HKSVNL2A</ns3:issuerName>\n            </ns3:Issuer>\n            <ns3:Issuer>\n                <ns3:issuerID>BANKNL2Y</ns3:issuerID>\n                <ns3:issuerName>WL Issuer SIM iDIN ABN INT</ns3:issuerName>\n            </ns3:Issuer>\n        </ns3:Country>\n    </ns3:Directory>\n<Signature xmlns=\"http://www.w3.org/2000/09/xmldsig#\"><SignedInfo><CanonicalizationMethod Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/><SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/><Reference URI=\"\"><Transforms><Transform Algorithm=\"http://www.w3.org/2000/09/xmldsig#enveloped-signature\"/><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/><DigestValue>CU95uYIOoaJjHf76KYzhaaVt/84lOnuEG9X/OhJdgUc=</DigestValue></Reference></SignedInfo><SignatureValue>F21sQgxcbW57flZkixCnblYfcM8JlGguemlF56/rMIGRP9pi3BNPCpzFS2i3u4IM2CfjtaoeHfiEs57X664l6YE4XJ+ff4QUlBbNNa1A8Vfoj/v/OJVnL1wTZTOo9anQZurNulwubtifQcHmGbI/rQFk2l6B5uH8s/mPijGe7HXq7Zi9uKpE6Gf5QxyPwNuPGKMt26h8YzAnsyLCUOtkrRzZw+WRqHyLw9EZ9yVMPU5akcvpzmTpK8NL2KnbaDrUanZRFGCJ95YMxRKD4i9CeU7EQyzF3mRUGDGEddE5cHiiqU/TXm/s52+pI+EnoSJQAdY8AqUZrygPO42KEufAMQ==</SignatureValue><KeyInfo><KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName></KeyInfo></Signature></ns3:DirectoryRes>`

// tslint:disable:max-line-length
const directoryResponseXML2 = `<?xml version="1.0" encoding="UTF-8"?><ns3:DirectoryRes xmlns:ns3="http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0" xmlns="http://www.w3.org/2000/09/xmldsig#" xmlns:ns10="urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp" xmlns:ns2="http://www.w3.org/2001/04/xmlenc#" xmlns:ns4="urn:oasis:names:tc:SAML:2.0:ac" xmlns:ns5="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:ns6="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ns7="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:ns8="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns9="urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE" productID="NL:BVN:BankID:1.0" version="1.0.0">
<ns3:createDateTimestamp>2018-01-12T15:06:48.455Z</ns3:createDateTimestamp>
<ns3:Acquirer>
    <ns3:acquirerID>0030</ns3:acquirerID>
</ns3:Acquirer>
<ns3:Directory>
    <ns3:directoryDateTimestamp>2017-12-06T16:08:56.000Z</ns3:directoryDateTimestamp>
    <ns3:Country>
        <ns3:countryNames>Nederland</ns3:countryNames>
        <ns3:Issuer>
            <ns3:issuerID>BANKNL2Y</ns3:issuerID>
            <ns3:issuerName>ABN AMRO iDIN issuer simulatie</ns3:issuerName>
        </ns3:Issuer>
    </ns3:Country>
</ns3:Directory>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>vOuD5/x74oGevGNZpoaSKqnosuwDWK9yn7btBA3bIX4=</DigestValue></Reference></SignedInfo><SignatureValue>CakKCNKBglj8aGgwt6Tk0IvRCZzCcQc9aMB+/NvLcraEdha0CCSIH3ODv0reAW86MKQfoDmT/qRveclYP7NaYo7FitjflXNvR3Sms4U5mXKRvVdRqNnEW3MSsLF0FzozNqlZzoCEo7ZLeh99NPFYrvlUwhldsw4ogi5UgJTDqckoJzcHggPXUzp7NCSxk2e2DrmrVm1LyYzrjGsc+afu7XQbyOkxsK3kbTZz0UK8RFBRia5aex8Fo9SbVjqkKCHID9IJIDxxUDVIXerJRkGDmPNMeaNVCXuJ1TEb5F+cVpI9yOQSWG6Y8iSKT4wueSJLAbkgEyCVy6pKfKO/yLS96Q==</SignatureValue><KeyInfo><KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName></KeyInfo></Signature></ns3:DirectoryRes>`

const transactionResponseXML = `<?xml version=\"1.0\" encoding=\"UTF-8\"?><ns3:AcquirerTrxRes xmlns:ns3=\"http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0\" xmlns=\"http://www.w3.org/2000/09/xmldsig#\" xmlns:ns10=\"urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp\" xmlns:ns2=\"http://www.w3.org/2001/04/xmlenc#\" xmlns:ns4=\"urn:oasis:names:tc:SAML:2.0:ac\" xmlns:ns5=\"urn:oasis:names:tc:SAML:2.0:assertion\" xmlns:ns6=\"urn:oasis:names:tc:SAML:2.0:metadata\" xmlns:ns7=\"urn:oasis:names:tc:SAML:2.0:protocol\" xmlns:ns8=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns9=\"urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE\" productID=\"NL:BVN:BankID:1.0\" version=\"1.0.0\">\n    <ns3:createDateTimestamp>2017-10-25T12:03:58.983Z</ns3:createDateTimestamp>\n    <ns3:Acquirer>\n        <ns3:acquirerID>0030</ns3:acquirerID>\n    </ns3:Acquirer>\n    <ns3:Issuer>\n        <ns3:issuerAuthenticationURL>https://abnamro-test.bank-request.com/bvn-idx-bankid-rs/consumerAuthenticationSim?hash=%2FZ0i5s5diBp8HS3Lwq72I6ns4TVSnxfzLzfZrEXoMCw%3D</ns3:issuerAuthenticationURL>\n    </ns3:Issuer>\n    <ns3:Transaction>\n        <ns3:transactionID>0030000020094512</ns3:transactionID>\n        <ns3:transactionCreateDateTimestamp>2017-10-25T12:03:58.983Z</ns3:transactionCreateDateTimestamp>\n    </ns3:Transaction>\n<Signature xmlns=\"http://www.w3.org/2000/09/xmldsig#\"><SignedInfo><CanonicalizationMethod Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/><SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/><Reference URI=\"\"><Transforms><Transform Algorithm=\"http://www.w3.org/2000/09/xmldsig#enveloped-signature\"/><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/><DigestValue>rr1eYkX/BXdkUL1YtXYfl1pDZ+dZb49+DjefpdU0qto=</DigestValue></Reference></SignedInfo><SignatureValue>ePOGCXSU8GTtwXPRb+n3Nol4ogikwxJW0zJGeobBNnvCGVoCkoy82svvUcoiMN+MRbS54FaBG9HqcObNpfDZYozR12sfsDizyY8NiKu64rQ7cd0DJ20QuLmy10VeoWuff3vnons/l73rr32sf9mTSM8EELUb4LQczCDEw2G1YzFX1PfMws4cUP8xJIqQKXxU9TjF272dnI15JNsyB25nV9WCtXJ8cdVnI4KFP1AFHfEo+OHq7tGdb6nwAgRiC4R73lm11+89aR7iucKuhQUDNAUbcWozY+pfcZqsAntDr4jv9pSzwHSweHcgHFOyScr1Jjvd7whh1kekfmjmgFfj/w==</SignatureValue><KeyInfo><KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName></KeyInfo></Signature></ns3:AcquirerTrxRes>`

const statusResponseXML = `<?xml version="1.0" encoding="UTF-8"?><awidxma:AcquirerStatusRes xmlns:awidxma="http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0" xmlns:awenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:awsamac="urn:oasis:names:tc:SAML:2.0:ac" xmlns:awsamdce="urn:oasis:names:tc:SAML:2.0:profiles:attribute:DCE" xmlns:awsamecp="urn:oasis:names:tc:SAML:2.0:profiles:SSO:ecp" xmlns:awsammeta="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:awvssamlass="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:awvssamlprot="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:awvsxmldsig="http://www.w3.org/2000/09/xmldsig#" xmlns:awvsxmlenc="http://www.w3.org/2001/04/xmlenc#" productID="NL:BVN:BankID:1.0" version="1.0.0">
<awidxma:createDateTimestamp>2018-01-12T15:00:52.552Z</awidxma:createDateTimestamp>
<awidxma:Acquirer>
    <awidxma:acquirerID>0030</awidxma:acquirerID>
</awidxma:Acquirer>
<awidxma:Transaction>
    <awidxma:transactionID>0030000020170371</awidxma:transactionID>
    <awidxma:status>Success</awidxma:status>
    <awidxma:statusDateTimestamp>2018-01-12T15:00:52.336Z</awidxma:statusDateTimestamp>
    <awidxma:container><saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" ID="RES-0030000020170371" InResponseTo="BLQsuccesHIO100OIHtest" IssueInstant="2018-01-12T15:00:52.396Z" Version="2.0"><saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">0030</saml2:Issuer><saml2p:Status><saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"><saml2p:StatusCode Value="urn:nl:bvn:bankid:1.0:status:Success"/></saml2p:StatusCode></saml2p:Status><saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ID="_a75adf55-01d7-40cc-929f" IssueInstant="2018-01-12T15:00:52.397Z" Version="2.0"><saml2:Issuer>BANKNL2Y</saml2:Issuer><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference URI="#_a75adf55-01d7-40cc-929f"><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"><ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="xsd"/></ds:Transform></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>OF5abf+XZVmtuf4rPh26ibBenQFz7KFB65eTJ8Avzo8=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>PguWqjbaQ1AcRXtL5KWQuelLKvHwdzcN33uFZPHieOUNEGL0eJjnsVWr05qWq34phSH+YwC5i8wHw+qsKta6Vtwu8RvstwUEzJJprV8znmA6OJRl02JS4edGqunsxnMFusctAtxo3b5WeGa1wrmemnoU/XAFp5vam0ReS3QgpOIcCWolNFroC6onUS3eep8yRAeZVqzQRimJqLacoMfq8Hjorz6vrOKXwQlDjlpkm0h12A7OEBmCW5o6Jt1prFq3FRruvBAmVWk8De0UUi9jGomfQJGuV22romVlAOHj+rsnPJk/QZMs6XKaDWGDfF3DhxRat0bbTM6C34WH+Cg7cQ==</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>MIIDbzCCAlegAwIBAgIEeCuDtTANBgkqhkiG9w0BAQsFADBoMQswCQYDVQQGEwJERTEMMAoGA1UECBMDTlJXMQ8wDQYDVQQHEwZBYWNoZW4xEjAQBgNVBAoTCVdvcmxkbGluZTESMBAGA1UECxMJV29ybGRsaW5lMRIwEAYDVQQDEwlXb3JsZGxpbmUwHhcNMTQwNzA4MTQwNDU1WhcNMTkwNzA3MTQwNDU1WjBoMQswCQYDVQQGEwJERTEMMAoGA1UECBMDTlJXMQ8wDQYDVQQHEwZBYWNoZW4xEjAQBgNVBAoTCVdvcmxkbGluZTESMBAGA1UECxMJV29ybGRsaW5lMRIwEAYDVQQDEwlXb3JsZGxpbmUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmCC1wb07Zza4csVSMWJNhkZttvAjNYFPtlsHI6aZdLHy04BMx27lXFYexs8ZhNtyhniIaB8O3OV1cP03cI3tWa2Q55eX1BysvmDnTYMprHiFktYvSuXdN1PFa8NNswNSLMsgja3Tp+SrHYka0MtsgVM79Rk16ExvSaGmYO0OV5dx666yKVUCBV/lU/8tyIhHQAdTM4KGdWggfPbcI/KkJeSk3YPHY1LbmdpdGDS8UJcBwuOw3JII8cXj3oDPGQWuXVfKVE2iS9IiEjAipTlfvrA1yZqwfq6PcUSrVEWa++kr/zTzSUAwlIHXL8OpLzi0cGRgdtVEjcvO1DkUuQrdBAgMBAAGjITAfMB0GA1UdDgQWBBQfp6FTr4Fw6bVeVGY0XvVtEsEu6DANBgkqhkiG9w0BAQsFAAOCAQEAFrD2fcNCyKM346xYRJ84PDaLA2MagOy9pC0j18iFGsR+LZpALkYQQweM2Xu9IWs+IJdTC6gnuQzCedAAFF+ovXs5r0bwwG7cmtOfdYQh0tjDk515MbVeVSXSnROJLPJVjcNeeHfdSAfKhJE3bmDtfVsPVtkjbuh5waisKbswb53+aM63PgNHdHt9X5la0HhY1Ggdxd2UicSl5+6ffEmSMQ9jTh4JcUMMvhi4bZeVM4renRWjF5v8VITl6lLZy3lKDzip5Mw8g8mtaj1GsY55/Q60vFSvLJztwuQw249zImAZ4JAINmrIPfpDT6wnwnprRXwgvE4o3AAFYCyJuHTZmg==</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature><saml2:Subject><saml2:EncryptedID><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_8024aeb54dd34a38a73a2028cefcaa95" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_cd7f79940c1106001e133b93f9259d23"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>mqj1Ww9PBsunj3dEQFSsaYV+DhS3XT8fY5QVTFBBDCISYdwTvKSLYZNmWSTXLJT6/O+9RhEc744uMyoVGpyol0cO0tCwImTeZ4pD3Niyc2LzOe0zVLWi3vpb7p/i/bC7t/08mejN7MWPSbDJjo3FEeB+nGN4bIKQYNM50M8lVco+22VY+vWpm5Gc26dkntJ2QJhnm73pSY8wm7umcLqKnYOqMKjS/tsJ5woMBgLjtkjCEtjGACFw+C3CWNWjQqppCGuW35rNiEf52iaAM12qjg6jFolRDt9v9jaA0wWZ4PWz9Yw/9q1ssiVs9TIrqkV+jOwPekpIvj6XNRvjO8LqlA==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>Miy4z6bHtPjvd1aHYuva2kzUm7a1KqqcrsO/bRnD2N83oIbiaqpY1L/zBn+itLAIyCJsoxZnISX8HikUDEVOjhIO271CsodeH5ATe9C6oPp9cRA1ZSI2v76dieY101ZAa58rUkOu6avBoi7gFiGojzC6DrfjrKYQLDYyWZ19QpXxJah4Np3V+h7gqSPxln+d0NOsFWInDoK9INe6nFUVljJcGRku2ceh3nxYeiRXUkZc0k1nWQg1ROWPMMXHj1nR</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedID></saml2:Subject><saml2:Conditions NotBefore="2018-01-12T15:00:52.396Z" NotOnOrAfter="2018-01-12T15:01:22.396Z"><saml2:AudienceRestriction><saml2:Audience>WL Validation Srv</saml2:Audience></saml2:AudienceRestriction></saml2:Conditions><saml2:AttributeStatement><saml2:Attribute Name="urn:nl:bvn:bankid:1.0:bankid.deliveredserviceid"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xsd:string">21968</saml2:AttributeValue></saml2:Attribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_916695632614b63fe46e6417058e1b8a" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_37c366b6b8c867e94cde60f7966a8d81"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>hSRLANXjlNBfZkL2RjAyMn2N3LIqFmrzdambW2HvTj+RxcIZ2wkx1jepeG5GKlUlEHPOTMD0/i8GwUoEPPC2FY6WI4tjfqfoeq/hnrc70OD1HY88Udc2P5a1VQzRRDFUl6gbqWYDZo8hcGPomrD9g4RKdJ0baOV1wiiH5A8zwQIDNa6d325EX9+2glribiddhtR4mFBQQiCEQFwQXMwI+YHNgVAQuE89vfVgC3pFAQAY4IVKXhay7OAMLCdGwRsqcJces+tgG0K44tUD4EKyaFhvwHqSxck928SY/l0wId/W5o1jQSGvecx05/vVpOTIbNI4CgnFh8eWzs5xOXjc1g==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>Vgt8pkRVvm8Z+v8gKPrweqAh3qx3Mz1eKZ4uRJywqMgicrqQeWectyX4PmpZp7kTGZKBz74u+Ga9kgIu9Mm3sBGKeC3O7jqG7/OQ/vCYCWzQUJ5L55i2+rktdO0z4777MDYj9OArqtzRMiCXv8aIktpRrIWSaKGLxylXfJwRfD/5AvLWbLQYnTyUPErlY3x05Lqz9xH2fxl5eXpJnCXKQoSZ7O0TCmZyIp7QXkH09h+ER/FQLAHPtU7PDfWaN2hGJMTc/FCzsYLTFh4OA5Ca0YP/FLUzpV9UKUKqbitU45HKUCL9qtYZFlqAdlItBcZ0TpbaNUbfs1I8X3v/mn8VhP0+PwQLUQMi2xbM5yI7FOcgDmEr0Q5iFAlYJoPiArSTmqhLqe/Uh0+w+HpOHPOdKkF0rIImnfDXX866CxU1Og0Lqam40UYKShG7ywY4CTr9</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_2f696f3f3ac229c55c80ac117f93de1d" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_5de2bc4723de73ef843a201e6113febf"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>wofgmEazw2dOuK0MBcNw+P5nrss8egtJ+ehPKbzRmQ8+vp5OsX1wLo/JlX0JkAsGnibMFJ7LrLSN4A920QzW/lHXj9N/Q9GSlO2ilZHvhy4lhIUQ8+Zvjbzj5Jn3m0obit/dxobGkUS3fX3qFvOkDJUpeLHK/E1pgUILxO/eZz4O/nMFHLoef77G+hpm5mB9ZNC5g4403YL21F+JEo5IONYILXuxLx77Lj/A0sIadlZwR64nJH6++RvNxsVioqoH8hj3zkKhW+Gtu5MDhUdkXwq6as+d96id4CHNQVHveazOqxf0SzGUJW8P4rcuDivInMvWwzJEUv+33qOmtgbYew==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>kLJ5glc/5httGUPWksVLnLxiUOr205Tv+vs2SbHGDnAQS9gbnIr3kC0+k93XOdqTbvwXiYUz1EMr9aSOAZDzKpTDkr4ACcXMKNy2sS+gp6sHbVHUa2eO4C78nbjQHV0OcTjBDqeCrXHZNmhcQhf2jhgNEqNeU0rw35FTSojQkBh4vDQIIs4m0JokWRpMWfm5jxhIVZ+6EwTAbGhUAFS+UuBt2B5KFVbUMqUmuf5xOz0I4dKG60b2nSe8eiuGDhrQyraN7JsGPnY5zYFICmMdFNxNk8UfkzaflP2RoLOBAat1ipNlMg3VdzMtQzQQEKJgieZivM9hV6oxKzvU1cDjwIcWGiiyRD5OuP7G2mOLBYWbjVubMsMl1SH8xiL+NS7+nKzlsTVBoaQcFFUEt2aMrFtmpQ8OJYU9kx3ED7ulm88vZheGTg/6bR7pglaZQIMjJSYn5iGSjCvOb52fq+gtlA==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_25c4615ff8404317a46cde61392871c4" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_cf0cea8b5f276c97cf086b9c907907d1"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>atc9I9C9m4Y53xsXkYQg0XUGHVaEswi0cRWOqRkFStno5RX+0KI70nVwpMhHaLRFePbAxoW4y6S3FabPmGgXsgXaf6XVaIcWd/f4prbTxwLQPv2eSZrlSYLW+x1lzywvz59qOQ5EcYdGpT5tFKJpOE5+Zw8vIpFNQUqAG5ThQtITBiB66AwEs9WRKR4Vuz19tXS32FHl+uD/zf3DlYm1wy0/dryA8dU1rSVcOLSftjVJ548k15g1veSG0Zuvz2cHEOEhrqDYfu/vdlGVeEh4cj240eIC/NYfwYNKRgYvCCdE5uva+h/BftEiCA08WEqcsygoaOdH/D05qCK90RWm8A==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>6tqIDFWvZJLTvunV72HJiWtKaOBHjHCjBQWB2LNRw2FpIvcmDUFReuALuMickqBn8QDeIbV5n1pnlrtLPlGxyVaa5SPABitICQBeYQ9de6j3daKG1+YdCbeY55eAlhYl7uJP8CUB22W0I233CIZglzoBnzKN+XrXwECyEZckJ6JTeTH0IQY0unLrUfTwGoS6dtmJgj4l53wPuRsH1XL4A2x2QHS7wWO+5z9A/lUJBL6wmnTnV1pNYgkEXdQTVdXPSMUyM1LcAlJDboKZoO9e4aRIQBLvHtaZpJE8e4eBH53lP9ZI/qZwH6MUzUqAe1bD1QIkHKffqhCwNyslv75kUVH6FCKY43naYIxNc0hSuvTr/7vHITaabp7UhDsaZ1LXQL1wcJCaCKkCauQUOOuberrz2aZgqBEOuKH+8imoWfwSkbd1LOJ3NXQQJHBDyNeD</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_664d20157a6d52e8549d2c82b1706c62" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_230e7900ce8ab349c82dc902b5326033"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>q5Y8CLfQhTLSdFWEkeBOvweSf/zYWOj4uS1nJK3PhOBMtwzHlS9vNcYP/FiJj6qJYahVmk7QjF8V/g2gq0qNe/jG2XIKvO4ENtc6+bTzQc4Pz16mL9WfLnnJ5lQqkYV1nWs5CTAQPKJE9jgt2XpZWXW/Yj8UOCVYbnQ/0wfgPCnZGwNByIlC2LdI517p7C0WNCuQHi2OZpv/SFU90nlSuP7UtuSToStxU1W5ufCATNuQs8cv9RW8DGCcQD1ZMF3O/+x7n4utrusGm3+zPXlDvKHBPfTDPjwowV2nc4nlJQZ3URTzogKoONgyMlY7IUe7aMXK4k5t8qAPNmiXQpuOPg==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>udCK7UpmvevfWuW9G9qBLDAOFolohXnOix4c2VwzMyKopaM+wD9YQr1TUOur1qDL0TdmZ25nAzABq7x6FYrXxqWxIkrRHYUCSd8JiI8LwXbTQU1erZcKxYC97DR8KFOLoAWZtFB1ZqzlT9LFyVOien3TxN/SgiP3mTFQhUUKRgkCdHzmKaYOo0b59fCs+9EyFNwowkggYDCwMeuytbCI9K/zsWQKCTI5DTbDUbV8Tz/eaEFImzyV9KKyh2mAAyINWbVCHAR+Ry70Z5Kw4Y6GLX9HOwQzzNXqGoWslzY7hy0OLRZfl7P1ttXmKBfwk0Z02mZQO+ccFyVufHj2pLAQFCS86nbh412+Zb8KQ4jz8SpKPNYzGAq+itAMxZ+tlM3KrwJwaTXHeqKgTaPaYUr54b+gfAygbKOQxxaeXGe/W0JJ2ikrChzx6TZu7U6Lrzrj</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_fd6eab852c07cc6ae1795f30cbe24aff" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_7e3eeb74574e292dda7cd0c4648baf49"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>CtPxu1umMmtuG4JelMZ9mEdOYzDcFUWR54Eu3Kry+MIcxy3qRBlQIOZvOqGn9RJPivyQaMlOg9OnVh9zjgZi8W+4FX2+7D5UxLZNt3J7YfADCgNnNXYHkSDwZYWIcwT+wtSKUwQd9AXbVQf6AlbJAV91ctBSa35p/xmulPO89rEYkdvGeLgIOSm5rpaxYoELNRHOcUtE3LCnD0fhI1dh+SQ447Op+KkWBqky9qdY1fvJej6UU1fwNuy1omRhG/tLml8Nkpo6Ul7nvJoXH6mtav6zS6t9o+V0SGtBJWfHMeKRtwpkXoeziB+/qIPwNeY/DM7yb9g9LI+uvod0RQjUSA==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>91ABXXdY8VlpabKMZUXArsyxWSqW/EiOJ5p8oXwy2m747nXz+wXf5A1/Kmt+tmegaaeStFlGOo8Lhy/3NdcGzbk84baZardSJJC+3wH5gfpOfRuEwQfics0rd4gD/Fm16jxNNM3Wm3GotbCk17a2PQSVHIoAWHCE6F3pqfXgviK5n1mZ1UX6oeaWdiI/eeVRMmo3fv0M088GA0qJgSuuXex/KiVAPDvvlcVeurz6kiAtYUo95S+hvQatAYwPaAuHw6bBh0ESLVMrah5Z1FFCPuc07sWw8srSsL1dEdRNOrdHoC5zu7dK0Gdm7U8oBTsbbYyRiBfjJkR6Hl+gKd5DNajj5f2wVM1xEX2GmEnsHlRQnrDyB80X9ru5ebd1TnfW8CmQMGkYK7AUl4SMBpH4KXYQktmETf126EQuOvRgEWKvjn7DAymVS89ZBk9fU7aa</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_464182b09437597cef463b326b4020aa" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_864c23c26eed14ceffe979ab2c6abf25"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>dLXfzjuLK6DtkzDe3leaiXU9B2U4LO2awHufVTEPxtThrOc9y7MqXj2mbTHUGWblY7lXi0cOt/HQ9fzEwpNPcenD86ixA5pbzy9tyFlCeSpAlMPyvrpm0O8edPBB2O0Hr/oD/+2PfUE0XGU3JUP0bvrq43ckSL1+ZS1xSRlwNMyFMfsBH3a2RWCcKNq8xDSDVx+EiwB52bmqTpL5jtX1NzndwFVd7sYaZQM5QyjAwsesxjNlnznSqzuJ4ZrJ1AJF6+xI5gN8Pjyz37axC9mPNqoWAmot+p8JdEHKViCaFt9N+tF6+m1JufF17BEgbP4T83iDVREbv679t7cOrj4Z8A==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>/HHS160eRUMF+mPSS2DuOOap6O1jIYVq/5tDCYbZrz2A9AO57M10E/fUXrMXaOi3X3w1MY1cZVuFT45lPIM8gStEdBiOok9p6H9KikAdIpTiANQcGHDAJroL5lZUZQyGuD1QqYDqFZVGpqPqbzREG0psXGI/iflsSGijj8FJz7L2t7Ob4qfR7+2yTS0USvGVJmusDgvxsUX59uCqPwJ8VJ8+CX9SbTm4nh03kuh+HlOBuR9KJcOCBjdZHBvRpO2qSA8wo80yTXp6m8iVQzjPs6TSTzzte99iqaimeKKoE3HzvMubqC4A0w70QYgPr4V3CtbE6NiR24HfbMYVrChTwZTEuZbIDKAWRsaqLYdWjDxsYZkxlK2BL0I4hUgcU5ZgU6P9UTRHMP8+ABIPAlbHxdLgnsx5vUnKL6UK/t4LcURjoK3vHkJQkTlQxjY5ZN8P</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_86e8ade296e8f5375d1258ed3773b6b2" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_b69b9f70821d68e687f2364d4d2760fd"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>k/jVTih9hELxd+JpV5CG2ZwqlNl0DlJaWKAigOd+ibNQyE0qwG0AyHsVyeTjgTr8Rfl9C5tG9kgPpHalUPBbL5zVPlhBBqP0sXqgrNAiveiFfHYX2leePxdTt0GfdgKmoS+5svMgeTZWac4A09CrXeBGVYZPSfpEmL8uIHy443TYfTzZBx1urbalYcMaXDlY6wTU8yNbkjJYONstedu2z3Y0wc7E+Th1YEcQ669B+NYqZZvHtMnkV4v/i2OBZifFEJE8njkwIlW7153PW9za4gO/6UGrA8D8Lt9JFHJoWX/8E/M2WXiji+g8gImNIlSb0HyYxSZg97a80BWqRe5+NQ==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>JmQUWXa6nt1jsBk7ku/QVjIpc8ETVV6jI6u/3C71p7xNZPOEi34FMPvqSTZCR0kTjtNIE43YEzHdDmfG3eohqfFIiVLIAzm3LQtC0IM8ttPxaaDbqszzUyLVHJSw0wT/xvgzd4Oqqa4tabYbXgCLQYZS8C3rdYVMZWmfHZt4ehMgV6ByZ1bYlAwv3FHORI96VI8bRAWCmC99xTuqI29SB/7J72HpmGSHkVMyKLPwX/BigWT+HQHIOIuuIKw+v6/hRx1KPXbvBWTrhm5R7vcABOgwD9lOJPSP+22IXSO7RQHa0HzIhgNEn6+JOy/Ifhh4pR9LLFpT4oDfuzZOHqxB2uuJSkHQ4fZ/nRjL+2BYDNpU6Xng1By69Pcc8JMuzpeP8ckCKkj8F0/HHAflMOLQnth9zGTJr6b4WpSGrUUTG/c=</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_e2cc5880f67054f591e4bae1ef6c0fb6" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_ab5065b90c5b0d2c3284c13749b68cce"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>yMvoCxbw4aRts47EMCO38xFkBvj0tBNearcTUDSdoNDOENPRvPDylPcLActqbzFQdozBlHoNNF53zXHgAGqZQyOSvULN2N4aZ4ePqxMcTeqX8UjPYGX4kYWcdDMkMUBSkGAivxfydOU/bSgG/Xw1gtqnZpw76IQnb2dI4KXkXkrNTsIZ+b0q2LjddkgyA0EWntGn3vX6m+ZEsciQniA1ti0hxYLvHwQKdkp+CbvA8SfziNI7GDgXTP5oz1lEdegj3BBzuI/aOHLMu9fJgt8jKC0pv1qXg3ackulm6taYlYOwHE6up9bYX2B7YTMCQq2MjosPmCi5XsM1BTJZ2CkQmA==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>b4rT2eEKRHocOHTo0PE2pYgQ02xTaIlQHYGbfIsgHi5I9T7HTRX5PtRebVOKZ7bFXFutpgn75GCruOR0Jxof12wlaXBUI//WmUd9YMxun78nGMOPoXRiiUDcmFIjlGngHWj5u5F120Iptv1a/maPJQ7qy3mY9gyQPctRo82fWz30qhS4V7Eu/N+dpAAHpe+GQPQK7Lm3UvF3zJ4shpeUAgG5GAxY/5LjVCeg/hi3izM95zrBGbsSpYXDXi+1TByh4EHk0K7c1JpRQDcRbv/PXJ9F0g41sDNPs1pqB01B/sqDuWeLeqz+kPt4F/1O1U2O2uhqCWkZpPDCuUIePLyVNBQuhUcXtRDnK7beSFJv+S/xRCuUj3x/I/gSu4z7HEuVghCB5uaHj/Hdq7WB6Jhg2jAwSe14fD6/bGfqVxNMwVVmZ+kjJ8j2L55nytXPI8Yc</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_fcebb5d999c3d6b055e7ff67301a26fe" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_a37987fdb422f68e4c63fadb7461e066"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>Nw3L52HK8mKdcs66TBTVI/gY4cHHxv76jXmiBYXp3a26v8M/Ju5xj3A5H4TFLc7rIcq0qx0fsrDKZ6wsBu50SpwsYJhBiUCxGx4pjCOr0Aj5enY8Eti7FPbKNt7RLDHbwk5YSAL+iIAF6W1QBXojsJW8IpaMLusgKuQSO/9p6I0Fe4VQVMoDTTNyRpEbioEyA1jnjKC24zKUy8O9CfBlIiXn/kTnAI8RxBEg9CQITh0whrT33M2AszFc2nQK72HpWrga683pl28jzGplaWwygswjqRJ+Tf/Z5w/JWuvHy1hmeTwkk1pWm8iY8K6hjcN3uLeK393lJsQgEO/PRkOFFA==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>1YD9VtwCAoQMKIKecIbuif41ekDGoIDf0PMoBSTQNhIJRFx5w5ZkztKMo5G6Ng8ex1NYjTlZG4bcLT7MeAJvA18rKTUeadWKWYvtgLpvterg3vLXWDfLB00OZP4ltHfLaUkef3p/OVwHBOgpNzwQ4D8uQsAfuwnDzdaS/BYyBWmZ/H3w4YXwGQuzFKEnreCf6TtwXh5hYhpK7t6t/yc5YefERCsEaRYQIiB8lQ0f4CNo/++AFjgT+ZZjR4rnLixAd7OpnvVn0aT29m+9yaUKDLyLdq9vVlOyPlGJWo/OXMUyl8UoKpV/AgQCXdupYJY8W4DDLunQ5sVPx+2j1B3AH7H1PqcpNcpxub7soIiJ7tK9t4FGSUD1LgeNFaDwNqEQZPUPyp2hQ2rBdaYCELQfionK9SuwfrZEVMEAoV56g8E=</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_383d290e6cd8ce7b6fdbffb7551cb833" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_3fa7e953ba38663473266e8a2b42319c"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>SvbewiAkIFc7hdjw4A9ZanFaaJK9qnQHVHIkuGTMjfyWY1wJqSU1Q7BMnzrGZlYI5VoQW9bcNn602dDjG74eJ9EfO7lvqidTSgBwuDWagOakEk5epNQhMcMN46U/aNNNekVEkVYr/CJCtE0hJHOhQrBf5tEKDBZfebWmQJvUYU36zf6HzJMKyEUakctdihs8qbnDC82do85lXOwnkrdCQrPOsVaSEOnTTSVFKjlsJR3F8aR9nP3tYoUF8zAk6z22w//TrlfQ3gHkqlTjmTn5XvnGPp4huLp9i27ZxshDlkfxbcBd0OeXS8UNmMtyFqPDj4QM5WenLiJ3FCCwhqTa+A==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>NO8iVekWExafUbEjpcjJVlG2QtIiD3GG2NJfw/Kx9r2+SW5ukvefPLBmWxIzJvYsay3cdb1Brgm2ZWzYYL7T8bBoa37P9dfh6y4Hs+SbfI7IZ8hKYuSVD/k+8gmC8qGuEs2Sgelo7sOhSj6KHsWepdECtsUADcHCvdYUR5Ylm+t1tXqC5VIaJIJedCsChLxiqG37457+dRxMDBnKNbXZXeBNPIQUKrho07/B9rV1XLtOg/ZHpcovzsr7pHQZrAM2W2VMRhlP3rxNDkfegYR2CzYLVHdZ5ghJMbT82ndUzA7RPSKrVS0ajKB9x7MmLzMJ3HoRNho5btV0FFWIHB7pcsskN9ccCU9oDBu7qKtEmeNhOz/tEuILTF2GzeZclpROOotMPEOypv6h2PLUZu4Ns/WKBCBh5tv8sKNndibdn+Z6DmVFGCNyyCwyGS5nihLr</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_bee3a547d50dbd9df2cecc50ea66c466" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_57c039729d848bb8fe6e68237ae87d67"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>eeTVu/biszWV43H5S+4Lo4O9s7RuSl+jENyq52rvbxNseTGutWA4eylSzyNXtsQjyz4zeQN3EEOAmgLywy/f6IuchewYP+gaypW3UjYpjoxhAfERfqOezSDh/zVMGstHmUOxEpjwBs71oTfqvsR52RadcrjtkzNBIu+lXhkwTPuqVu8q+a2vsiEqsaUoCJI2i9j8iiDsB18CKKKpQ5kV3QuIP9a7F+W3JBvww+Gzo9b4SmskHY33GGUkXVYCLEyERsM0FCC+wT7imNgFpAMJgCng+MUkps/mR91AKxXwS771hqNsoAMIy2Hl0J69rPfjOb+T9kvOf6RaH7KIcd2vWw==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>sw4V3m8MCn7k/LAGOFd+K+XGyGMeQY4guxtNh5SMKQAMiGRg8CxvTgx6Nntjr0h2z7LrLdcGiV2k5lMeFlHiwgR0GVbo70kCcV/ZX39TVAKgpCpjBhTHHJOXAgd5EslkEaKLbdNQ8H2Q/kAk6+IpkAe59fCEsdl8OlUcvglme8YlmkV7rYqP/S/G2ATSiRGkOtSmsJ19wf3A9qXCgeYfj3jjEvu/XfypWNOJNqRa8ATyjbxel16iOsdheAUG5FC/NsTn88JNcgMuqYoXkNkj/TPem+c0+y5UtMhQhPlhdmKKP8Mwnfy3K6W0ycF0KbWeR3chu+J6isr1uFF5Vfd1zAZ0yX+XuOXESi8UkeQz2y9s5jhcjYYkrcTQZpwbydcqSt0CfAzrSvUFJ8K/y5OUrPgN61jcKYHOrA8B1BDwXh8=</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_26476b1b48d1fd01d80bb3faad999141" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_5cbab9cca26d12f9efe4315d885e3d27"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>AmKD1EXTxOd6yAROzTpCFr6SdjI07Tmx2Tfh/p0f0VM0vbmMcp5pfaJhu4dik73EuNLaMWjG0wWSxMcQaXfRjTYl4CErTunl0zrIWgm4bQRu5oQYRHxltyRkCtcvhCGD9vjEbMXyS8AhGfEcI1NYsunpo5aeOK+BLMKou8jIIyynVR1YBUqO8R89xiS26OuVS4git+PrE9EUWpifSDwZLHOFRJCpKRSTQfK4krCeY48LhYdeIikPZyBo1smqKZS8XFWTB/s2dNeCSiv+qIl5Hexxc5HXCpOoFg54MtXv6NVw4urvEuEwUAhAbflqgv3mYzNIvdUgpCoaSPFi9R152A==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>H/fIC1hwuIpzzxKaS3P2woJaWBQgXsGr5SmJx7750A9IWWxrvFKlX4fkHPn4QgxDyUCWM1ou1Lggj/j2gA7heC30QBTqAEJA14aw2WJZWt7uXma1ly55JQf5P8wfay3WelbxuAskc7J2sR5mEhSkmGffVa60mAbSDdovyEjHfCk+ccj6Bov7NudCwzDK0bxgvHiUhYddHxlxSf3qcs2Hrs7RC/eaPVZO9sm/722oOx8kE9UpcLnI1Ahag9k64jXBXGsKsh0y/b8TQrdlBAZongATkJPUzmnar7eAdEBNg3i0oI0Bot6RUcbvUXPE6k94UqxEVRO0fQxaVhzlbPPvmg2xcwrQjD8wXmsHANMghM7Deg/YOCIZfQvTRulOn6zmRb5S9w4mbA+s2rV6W34UfoNdd744K3Oa5mV+PScC2CU=</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_a9cf5769cb2d8c5133d5b76bc8bb62d7" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_706c2e9892a3074a479f8e7d0362d755"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>hubOxQ/68eDOO6rRrluKDKvNvM98ybTkyDhdPRqr2b7lzjvMpFzCDlQRadTOZuOqNg10awaO4dFkjkBFSlAUXOjEJ3s15QxVRVYU36xTYLgBT/fdzzvkUGAZVVqFFYKrElks3fvhfv8tIFYTNtMoYIW8vbYiYUBlfPlOwvQ+jgHsmS1XoP4KoimPa9k0GaFYvVPPsJGryVKT5QMSvZ8EpvYD92KXnmSFrSDZtYMXIKXaKSOuCntTBgyctlEArCN4NE8Uft38bCDNjlA70YdHBF3fyiEmmtMpszjMiyN0Ss4JgkzLeVvCTWGU8aSts7jFwnq5akTVKcHt15t7n/qopw==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>sGS9PNPOsvHxKua2AWLcscctm9wJz8b3SF8HF7GBmvlbau9b0MoZzDE4SP9f09LkiGP5z5Qt+I5d/B142BZg6sTt1zW+HiHvxft8r8WaacHVLWeWeFBT9dQ1wlO85qxAhfCbUQVJzDqJFH6WNZ6B0jSYFIv/lG/QEVYlUACdU4LP0+Y7JZ44/eW7jme7+aUXdDnUwf2OI23+D4saFdynjnE9Ovbw0QSxvNI/dU+aYR96c5cnftrJHhoYDUXKEecrBYLlwFhHrfzqMUBac9oNTmO18Abk8PdYKRbi466H10g35AYOs/Ipi3axhzGW6mJvM/fHSMRi7x9E6Wqgm/6gwr8Nmi+fC1ZFPGX6549iedhJui67+J8/Y5c4KUYIj9TiyLMxYgfJ9Ttw+isBD8h2cFqjC2YmJk6FqW/Bv9dUDv80aCdIH4ShBhLiDDbxCnBk</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute><saml2:EncryptedAttribute><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_8ad67f7ec1c52aa651b380b13fb4340c" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_d68ed4cbdc73350f15236678e7665b8b"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/></xenc:EncryptionMethod><xenc:CipherData><xenc:CipherValue>rH1yeN1nkAg9hmWEYYyvVyyG03Vn0F/DULda0NZrG+0Azv0o7D5SCxInATcoAg546uCX9CmHI3PN2DYrDw5rF0t0KA5vhv0+3hMlBGYdoF7AjXCpx/TBK78Aj7Qd22ktI9bZ8fRqBTcEfLeNbUpPHqdw8nnOEr+vN6AyZo1hYthEAnowgwV0BrHVmybl5RsbNQI+e9GSwfJsk5j0212zESJfFyz59p269HjKGgchpT4lb3kKI2Ni9RYPCngoVw289xQOoCT07mrr0bhOm0C/ElBakE+v3zw31Iwtxl0r0o4Ikj8+JNeTJAnl8ruasDlqtom3q3jQLdkSyLyNtsjgDA==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData><xenc:CipherValue>NId7fpeP2YhVWk67L0qXO8w9SI411526n5Ami+VNmVjaULCsVEYoupVZ1Rp0SEBbEZBdC497yLgqNESRToKYHKcz7OMJaE6Wqq7FkxqEEW9ncrvV97LsNykXcST9JJ4DRKSDyrmU0yWJBaA2RJbxTRAshivX3J3CGYDtSoT6rYwhF5n3M2ucE6siAyZfQytRepxbfY2LDzJEDeiKmqfAzIOYsjF0ozgFJ4xywI7AFoAGjFl4ftF358c1ixnqsJ5PrczApVL0TtLsedgZYd4MX/i3VM1ZT9smEcIadce0S64XRFFCkGHXRUjgZTcjf4UXWAD4ZRwR5D7+8sv6Wp58AybZCJeEnyFUuQbaLYwRBdWtLlmHNnQTvZyhU84Nzypjk64iJ8e3BQPTfWoHKpD3KVOnPtAEG/Vz/uuMd+iJ9Mk=</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAttribute></saml2:AttributeStatement><saml2:AuthnStatement AuthnInstant="2018-01-12T15:00:52.405Z"><saml2:AuthnContext><saml2:AuthnContextClassRef>nl:bvn:bankid:1.0:loa2</saml2:AuthnContextClassRef><saml2:AuthenticatingAuthority>BANKNL2Y</saml2:AuthenticatingAuthority></saml2:AuthnContext></saml2:AuthnStatement></saml2:Assertion></saml2p:Response></awidxma:container>
</awidxma:Transaction>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>32DOfP7MH0O2b90fz8eIO7CzEGjcP4PvZKquq03HEdI=</DigestValue></Reference></SignedInfo><SignatureValue>Gx1mDr5gJ0BQJlIynhEXU5I9Wtsdh4heZosToiLZXpYUT+Rtq4mwLuWrh1E/yy84UlmtszkeKTTZZlnNn91EquO90IBrTpwxzRUscfnxtI+R6tshVN8SlcpPz77RQeQPew6yBiRN3dx7pXUJUej63dNV/7yWHMq4PJj9zEnWeCi8Rkt6vlyTQxQ15/zX4XhrCNQsdcFYGGzk7TnsBsTeZeZReQmEnHMns1YtH9Uie4o7/7AiqUdSrR07eaWDPNnFnfVqWv7j7Cd3u3iUSFtKh+U/odcBkyhtLiMEQflUKU/OmensSv8Dl3wa0Zt3/AJSk366+mk2g8r8zFndQxy2+g==</SignatureValue><KeyInfo><KeyName>5ef3776d972e9cdf45689eb0c316e13c1ece412b</KeyName></KeyInfo></Signature></awidxma:AcquirerStatusRes>`

describe('idin request', () => {
  it('should fail if not ROUNTING_ENDPOINT', async () => {
    const [err, res] = await to(fetchResponse('xxx', null as any))
    expect(res).toBeFalsy()
    expect(err).toBeTruthy()
    expect(err.message).toBe('ROUNTING_ENDPOINT is not defined.')
  })

  it('should send directory request', async () => {
    (fetch as any).mockResponseOnce(directoryResponseXML)
    const [err, res] = await to(fetchDirectoryResponse())
    expect(err).toBeFalsy()
    expect(res).toBe(directoryResponseXML)
  })

  it('should send transaction request', async () => {
    (fetch as any).mockResponseOnce(transactionResponseXML)
    const [err, res] = await to(fetchTransactionResponse('issuerID', 'transactionID'))
    expect(err).toBeFalsy()
    expect(res).toBe(transactionResponseXML)
  })

  it('should send status request', async () => {
    (fetch as any).mockResponseOnce(statusResponseXML)
    const [err, res] = await to(fetchStatusResponse('transactionID'))
    expect(err).toBeFalsy()
    expect(res).toBe(statusResponseXML)
  })
})

describe('idin response', () => {
  it('should correctly parse the directory response - one issuer', async () => {
    (fetch as any).mockResponseOnce(directoryResponseXML2)
    const [err, res] = await to(getDirectoryResponse())
    expect(err).toBeFalsy()
    expect(res).toMatchSnapshot()
  })

  it('should correctly parse the directory response - more issuers', async () => {
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
