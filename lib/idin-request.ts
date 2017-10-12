import 'isomorphic-fetch'
import { ROUTING_ENDPOINT } from './constants'
import { formatDirectoryProtocolXML } from './directory-protocol'
import { formatStatusProtocolXML } from './status-protocol'
import { formatTransactionProtocolXML } from './transaction-protocol'

const DEFAULT_FETCH_CONFIG = {
  method: 'POST',
}

export function fetchResponse(payload?: string, routingService = ROUTING_ENDPOINT) {
  if (!routingService) {
    return Promise.reject(new Error('ROUNTING_ENDPOINT is not defined.'))
  }

  const config = Object.assign({}, DEFAULT_FETCH_CONFIG, { body: payload })

  return fetch(routingService, config)
    .then((res) => res.text())
}

export function fetchDirectoryResponse() {
  const payload = formatDirectoryProtocolXML()
  return fetchResponse(payload)
}

export function fetchTransactionResponse(issuerID: string, transactionID: string, requestedService?: string) {
  const payload = formatTransactionProtocolXML(issuerID, transactionID, requestedService)
  return fetchResponse(payload)
}

export function fetchStatusResponse(transactionID: string) {
  const payload = formatStatusProtocolXML(transactionID)
  return fetchResponse(payload)
}
