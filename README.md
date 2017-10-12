# node-idin [![Build Status](https://travis-ci.org/bloqhouse/node-idin.svg?branch=master)](https://travis-ci.org/bloqhouse/node-idin) [![Coverage Status](https://coveralls.io/repos/github/bloqhouse/node-idin/badge.svg?branch=master)](https://coveralls.io/github/bloqhouse/node-idin?branch=master)

Node.js Library for [iDIN](https://www.idin.nl/)

## Prerequisites

1. You have to provide via environment the following variables:
- ROUTING\_ENDPOINT - _routing service url_
- MERCHANT\_ID - _assigned merchant ID_
- MERCHANT\_SUBID - _can be 0_
- MERCHANT\_RETURN\_URL - _callback url_
- PRIVATE\_KEY - _private key string without whitespaces_
- PUBLIC\_KEY\_FINGERPRINT - _sha1 hex encoded of the uploaded public key_
- EXPIRATION\_PERIOD - _e.g. PT5M_
- REQUESTED\_SERVICE - _e.g. 21968_
- DEFAULT\_LANGUAGE - _e.g. en_
- LOA - _can be loa2 or loa3_
- ID\_PREFIX - _e.g. ABC_
