import { pd } from 'pretty-data'
import { MERCHANT_ID, MERCHANT_SUBID} from './constants'
import { signXML } from './idin-protocol'

export function formatDirectoryProtocolXML() {
  const xml = pd.xmlmin(`
    <?xml version="1.0" encoding="UTF-8"?>
    <DirectoryReq version="1.0.0" productID="NL:BVN:BankID:1.0" xmlns="
    http://www.betaalvereniging.nl/iDx/messages/Merchant-Acquirer/1.0.0"
    xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <createDateTimestamp>${new Date().toISOString()}</createDateTimestamp>
      <Merchant>
        <merchantID>${MERCHANT_ID}</merchantID>
        <subID>${MERCHANT_SUBID}</subID>
      </Merchant>
    </DirectoryReq>
  `)

  return signXML(xml)
}
