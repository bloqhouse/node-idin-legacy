import { formatTransactionProtocolXML } from './transaction-protocol'

describe('format status protocol', () => {
  it('it works correctly', () => {
    expect(formatTransactionProtocolXML('XXX', 'XXX')).toMatchSnapshot()
  })
})
