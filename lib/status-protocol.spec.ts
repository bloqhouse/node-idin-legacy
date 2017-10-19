import { formatStatusProtocolXML } from './status-protocol'

describe('status protocol', () => {
  it('it works correctly', () => {
    expect(formatStatusProtocolXML('0000000000000000')).toMatchSnapshot()
  })
})
