<?php

namespace BankId\Merchant\Library;

/**
 * Description of Configuration
 */
class Configuration {
    
    private static $_instance;
    
    /**
     * Gets the active Configuration instance
     */
    public static function defaultInstance() {
        if (!isset(self::$_instance)) {
            self::$_instance = new Configuration();
        }
        return self::$_instance;
    }
    
    /**
     * Merchant Id
     */
    public $MerchantID;
    /**
     * BankID contract registration number sub of the Merchant. The SubID that uniquely defines a trade name of the Merchant to be used for display.
     */
    public $MerchantSubID;
    /**
     * A valid URL to which the Consumer is redirected to after authentication
     */
    public $MerchantReturnUrl;
    
    /**
     * The URL to which the library sends GetDirectory request messages
     */
    public $AcquirerDirectoryUrl;
    /**
     * The URL to which the library sends authentication request messages
     */
    public $AcquirerTransactionUrl;
    /**
     * The URL to which the library sends Status request messages
     */
    public $AcquirerStatusUrl;
    
    /**
     * A string which specifies the certificate to use to sign messages to the Routing Service.
     */
    public $MerchantCertificateFile;
    /**
     * A string which specifies the certificate to use to validate messages from the Routing Service.
     */
    public $RoutingServiceCertificateFile;
    /**
     * A string which specifies the certificate necesary to decrypt the SAML request - may be identical to the Merchant Certificate
     */
    public $SamlCertificateFile;
    /**
     * You may overwrite the signing certificate, if you want to load it using a different method.
     */
    public $MerchantCertificate;
    /**
     * The password for the private key of the MerchantCertificate
     */
    public $MerchantCertificatePassword;
    /**
     * You may overwrite the acquirer certificate, if you want to load it using a different method.
     */
    public $RoutingServiceCertificate;
    /**
     * You may overwrite the SAML certificate, if you want to load it using a different method.
     */
    public $SamlCertificate;
    /**
     * The password for the private key of the SamlCertificate
     */
    public $SamlCertificatePassword;
    
    /**
     * Enable/disable logging
     */
    public $LogsEnabled;
    /**
     * A directory on the disk where the library saves ISO pain raw messages.
     */
    public $ServiceLogsLocation;
    /**
     * This tells the library that it should save ISO pain raw messages or not. Default is true.
     */
    public $ServiceLogsEnabled;
    /**
     *  A string that describes a pattern to distinguish the ISO pain raw messages. For example,
     *    %Y-%M-%D\%h%m%s.%f-%a.xml -> 102045.924-AcquirerTrxReq.xml
     *    %Y = current year
     *    %M = current month
     *    %D = current day
     *    %h = current hour
     *    %m = current minute
     *    %s = current second
     *    %f = current millisecond
     *    %a = current action
     */
    public $ServiceLogsPattern;
    
    private $logger;
    private $messenger;

    public function __construct() {
        $this->logger = new Logger();
        $this->messenger = new Messenger();
    }
    
    /**
     * Set all members for this Configuration instance using this function
     */
    public function set($merchantID, $merchantSubID, $merchantReturnUrl, $acquirerDirectoryUrl, $acquirerTransactionUrl, $acquirerStatusUrl, $merchantCertificateFile, $routingCertificateFile, $samlCertificateFile, $merchantCertificate, $merchantCertificatePassword, $routingCertificate, $samlCertificate, $samlCertificatePassword, $serviceLogsLocation, $serviceLogsEnabled, $serviceLogsPattern) {
        $this->MerchantID = $merchantID;
        $this->MerchantSubID = $merchantSubID;
        $this->MerchantReturnUrl = $merchantReturnUrl;
        $this->AcquirerDirectoryUrl = $acquirerDirectoryUrl;
        $this->AcquirerTransactionUrl = $acquirerTransactionUrl;
        $this->AcquirerStatusUrl = $acquirerStatusUrl;
        $this->MerchantCertificateFile = $merchantCertificateFile;
        $this->RoutingServiceCertificateFile = $routingCertificateFile;
        $this->SamlCertificateFile = $samlCertificateFile;
        $this->MerchantCertificatePassword = $merchantCertificatePassword;
        $this->SamlCertificatePassword = $samlCertificatePassword;
        $this->ServiceLogsEnabled = $serviceLogsEnabled;
        $this->ServiceLogsLocation = $serviceLogsLocation;
        $this->ServiceLogsPattern = $serviceLogsPattern;
        
        if (isset($this->MerchantCertificateFile) && isset($this->RoutingServiceCertificateFile) && isset($this->SamlCertificateFile))
        {
            $this->loadCertificates();
        }
        
        $this->MerchantCertificate = $merchantCertificate;
        $this->RoutingServiceCertificate = $routingCertificate;
        $this->SamlCertificate = $samlCertificate;
        
        $this->ensureIsValid();
    }
    
    /**
     * Sets the Configuration object to be used by Communicator instances
     */
    public static function setup($configuration) {
        self::$_instance = $configuration;
        
        self::$_instance->loadCertificates();
        
        self::$_instance->MerchantCertificate = $configuration->MerchantCertificate;
        self::$_instance->RoutingServiceCertificate = $configuration->RoutingServiceCertificate;
        self::$_instance->SamlCertificate = $configuration->SamlCertificate;
        
        self::$_instance->ensureIsValid();
    }
    
    private function loadCertificates() {
        $certs = array();
        $pkcs12 = file_get_contents($this->MerchantCertificateFile, FILE_USE_INCLUDE_PATH);
        openssl_pkcs12_read($pkcs12, $certs, $this->MerchantCertificatePassword);
        $this->MerchantCertificate = $certs;
        
        $this->RoutingServiceCertificate =
            Utils::normalizeCertificate(file_get_contents($this->RoutingServiceCertificateFile, FILE_USE_INCLUDE_PATH));
        
        $pkcs12 = file_get_contents($this->SamlCertificateFile, FILE_USE_INCLUDE_PATH);
        openssl_pkcs12_read($pkcs12, $certs, $this->SamlCertificatePassword);
        $this->SamlCertificate = $certs;
    }
    
    /**
     * Attempts to load the settings from the application's configuration
     */
    public static function load($configXml) {
        $configuration = new \SimpleXMLElement(file_get_contents($configXml), FILE_USE_INCLUDE_PATH);
        foreach ($configuration->appSettings->add as $item) {
            $key = (string) $item['key'];
            $value = (string) $item['value'];
            switch ($key) {
                case 'BankId.Merchant.MerchantID': self::defaultInstance()->MerchantID = $value; break;
                case 'BankId.Merchant.SubID': self::defaultInstance()->MerchantSubID = $value; break;
                case 'BankId.Merchant.ReturnUrl': self::defaultInstance()->MerchantReturnUrl = $value; break;
                
                case 'BankId.Acquirer.DirectoryUrl': self::defaultInstance()->AcquirerDirectoryUrl = $value; break;
                case 'BankId.Acquirer.TransactionUrl': self::defaultInstance()->AcquirerTransactionUrl = $value; break;
                case 'BankId.Acquirer.StatusUrl': self::defaultInstance()->AcquirerStatusUrl = $value; break;
                
                case 'BankId.Merchant.Certificate.File': self::defaultInstance()->MerchantCertificateFile = $value; break;
                case 'BankId.Merchant.Certificate.Password': self::defaultInstance()->MerchantCertificatePassword = $value; break;
                case 'BankId.RoutingService.Certificate.File': self::defaultInstance()->RoutingServiceCertificateFile = $value; break;
                case 'BankId.SAML.Certificate.File': self::defaultInstance()->SamlCertificateFile = $value; break;
                case 'BankId.SAML.Certificate.Password': self::defaultInstance()->SamlCertificatePassword = $value; break;
                
                case 'BankId.Logs.Enabled': self::defaultInstance()->LogsEnabled = $value; break;
                case 'BankId.ServiceLogs.Enabled': self::defaultInstance()->ServiceLogsEnabled = $value; break;
                case 'BankId.ServiceLogs.Location': self::defaultInstance()->ServiceLogsLocation = $value; break;
                case 'BankId.ServiceLogs.Pattern': self::defaultInstance()->ServiceLogsPattern = $value; break;
            }
        }
        
        self::defaultInstance()->loadCertificates();
        self::defaultInstance()->ensureIsValid();
    }
    
    private function ensureIsValid() {
        $checkNullOrWhitespace = function($value, $name) {
            if (!isset($value) || $value === '') {
                $ex = new CommunicatorException('The configuration parameter is not configured: ' . $name);
                var_dump($ex);
                throw $ex;
            }
        };
        
        $checkNullOrWhitespace($this->MerchantID, 'MerchantID');
        $checkNullOrWhitespace($this->RoutingServiceCertificate, 'RoutingServiceCertificate');
        $checkNullOrWhitespace($this->MerchantCertificate, 'MerchantCertificate');
        $checkNullOrWhitespace($this->SamlCertificate, 'SamlCertificate');
        $checkNullOrWhitespace($this->MerchantReturnUrl, 'MerchantReturnUrl');
        $checkNullOrWhitespace($this->AcquirerDirectoryUrl, 'AcquirerDirectoryUrl');
        $checkNullOrWhitespace($this->AcquirerTransactionUrl, 'AcquirerTransactionUrl');
        $checkNullOrWhitespace($this->AcquirerStatusUrl, 'AcquirerStatusUrl');
    }
    
    /**
     * Gets the default Logger instance
     */
    public function getLogger() {
        return $this->logger;
    }
    
    /**
     * Gets the default Messenger instance
     */
    public function getMessenger() {
        return $this->messenger;
    }
}
