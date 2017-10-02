<?php

namespace BankId\Merchant\Library;

/**
 * ILogger interface: defines methods for logging messages and debug output
 */
interface ILogger {
    /**
     * Logs a trace message.
     */
    public function log($message);
    /**
     * Logs a request/response xml message.
     */
    public function logXmlMessage($message);
}

/**
 * The default logger used by the library
 */
class Logger implements ILogger {
    /**
     * Logs a trace message to error_log(). See: http://php.net/manual/en/errorfunc.configuration.php#ini.error-log
     */
    public function log($message) {
        if (Configuration::defaultInstance()->LogsEnabled) {
            error_log($message, 0);
        }
    }

    /**
     * Logs a request/response xml message to the directory specified in the configuration.
     */
    public function logXmlMessage($message) {
        if (Configuration::defaultInstance()->ServiceLogsEnabled) {
            $dom = new \DOMDocument();
            $dom->loadXML($message);
            
            $filename = Configuration::defaultInstance()->ServiceLogsPattern;
            $now = new \DateTime();
            $msec = substr(explode(' ', \microtime())[0], 2, 3);
            
            $filename = str_replace('%Y', $now->format('Y'), $filename);
            $filename = str_replace('%M', $now->format('m'), $filename);
            $filename = str_replace('%D', $now->format('d'), $filename);
            $filename = str_replace('%h', $now->format('H'), $filename);
            $filename = str_replace('%m', $now->format('i'), $filename);
            $filename = str_replace('%s', $now->format('s'), $filename);
            $filename = str_replace('%f', $msec, $filename);
            $filename = str_replace('%a', $dom->documentElement->localName, $filename);
            
            $filename = join(DIRECTORY_SEPARATOR, array(Configuration::defaultInstance()->ServiceLogsLocation, $filename));
            
            if (!file_exists(dirname($filename))) {
                mkdir(dirname($filename), 0700, TRUE);
            }
            
            file_put_contents($filename, $message);
        }
    }
}