import './_mocks'
import { formatStatusProtocolXML } from './status-protocol'

describe('format status protocol', () => {
  it('it works correctly', () => {
    expect(formatStatusProtocolXML('XXX')).toMatchSnapshot()
  })
})
