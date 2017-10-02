<?php

namespace BankId\Merchant\Library;

/**
 * Description of Communicator
 */
class Communicator {
    /**
     * XmlProcessor instance, used to process XMLs (signing, verifying, validating signature)
     */
    protected $xmlProcessor;
    /**
     * IMessenger instance, to be used for sending messages to external URIs
     */
    protected $messenger;
    /**
     * ILogger instance, to be used for logging messages.
     */
    protected $logger;

    /**
     * Creates a new Communicator instance
     */
    public function __construct() {
        $this->xmlProcessor = new XmlProcessor();
        $this->messenger = Configuration::defaultInstance()->getMessenger();
        $this->logger = Configuration::defaultInstance()->getLogger();
    }

    /**
     * Sends a directory request to the URL specified in Configuration.AcquirerUrl_DirectoryReq
     */
    public function getDirectory() {
        try {
            $idx = new IdxMessageBuilder();
            $xml = $idx->getDirectoryRequest(new Internal\DirectoryRequestBase());
            $xml = $this->xmlProcessor->addSignature($xml);

            $response = $this->performRequest($xml, Configuration::defaultInstance()->AcquirerDirectoryUrl);

            $result = DirectoryResponse::parse($response);
            return $result;
        }
        catch (\Exception $exception) {
            $result = DirectoryResponse::getException($exception);
            return $result;
        }
    }
    
    /**
     * Sends a new authentication request to the URL specified in Configuration.AcquirerUrl_TransactionReq
     */
    public function newAuthenticationRequest($authenticationRequest) {
        try {
            $bankid = new BankIdMessageBuilder();
            $xml = $bankid->getTransaction($authenticationRequest);

            $idx = new IdxMessageBuilder();
            $xml = $idx->getTransactionRequest($authenticationRequest, $xml);

            $xml = $this->xmlProcessor->addSignature($xml);

            $response = $this->performRequest($xml, Configuration::defaultInstance()->AcquirerTransactionUrl);

            $result = AuthenticationResponse::Parse($response);
            return $result;
        }
        catch (\Exception $exception) {
            $result = AuthenticationResponse::getException($exception);
            return $result;
        }
    }
    
    /**
     * Sends a transaction status request to the URL specified in Configuration.AcquirerUrl_TransactionReq
     */
    public function getResponse($statusRequest) {
        try {
            $idx = new IdxMessageBuilder();
            $xml = $idx->getStatusRequest($statusRequest);
            $xml = $this->xmlProcessor->addSignature($xml);

            $response = $this->performRequest($xml, Configuration::defaultInstance()->AcquirerStatusUrl);

            $result = StatusResponse::parse($response);
            return $result;
        }
        catch (\Exception $exception) {
            $result = StatusResponse::getException($exception);
            return $result;
        }
    }

    protected function performRequest($xml, $url) {
        $this->xmlProcessor->verifySchema($xml);
        
        $this->logger->logXmlMessage($xml);
        
        $response = $this->messenger->sendMessage($xml, $url);
        
        $this->logger->logXmlMessage($response);
        
        $this->xmlProcessor->verifySchema($response);
        
        $this->xmlProcessor->verifySignature($response);
        
        return $response;
    }
}
