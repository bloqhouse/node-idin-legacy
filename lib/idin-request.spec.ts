import to from 'await-to-ts'
import {
  fetchDirectoryResponse,
  fetchResponse,
  fetchStatusResponse,
  fetchTransactionResponse,
} from './idin-request'

// tslint:disable:max-line-length
const mockedBody = `MOCKED_BODY`

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
