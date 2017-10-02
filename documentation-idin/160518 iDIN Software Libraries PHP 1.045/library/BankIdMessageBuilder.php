<?php

namespace BankId\Merchant\Library;

/**
 * @internal
 */
class BankIdMessageBuilder {
    public function getTransaction($authenticationRequest) {
        $authnReq = new Schemas\saml\protocol\AuthnRequestType();
        
        $authnReq->setID($authenticationRequest->getMerchantReference());
        $authnReq->setVersion('2.0');
        $authnReq->setIssueInstant($authenticationRequest->getCreated());
        $authnReq->setConsent('true');
        $authnReq->setForceAuthn('true');
        $authnReq->setProtocolBinding('nl:bvn:bankid:1.0:protocol:iDx');
        $authnReq->setAssertionConsumerServiceURL(Configuration::defaultInstance()->MerchantReturnUrl);
        $authnReq->setAttributeConsumingServiceIndex($authenticationRequest->getRequestedServiceID());
        
        $authnReq->setIssuer(new Schemas\saml\assertion\Issuer(Configuration::defaultInstance()->MerchantID));
        
        $authnReq->setConditions(new Schemas\saml\assertion\Conditions());
        
        $authnReq->setRequestedAuthnContext(new Schemas\saml\protocol\RequestedAuthnContext());
        $authnReq->getRequestedAuthnContext()->setComparison('minimum');
        $authnReq->getRequestedAuthnContext()->setAuthnContextClassRef(
            array($authenticationRequest->getAssuranceLevel()));
        
        $authnReq->setScoping(new Schemas\saml\protocol\Scoping());
        
        Validation\Validator::validateAuthnRequestType($authnReq);
                
        return Utils::serializeAuthnRequest($authnReq);
    }
}
