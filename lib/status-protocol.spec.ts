import { formatStatusProtocolXML } from './status-protocol'

describe('status protocol', () => {
  it('it works correctly', () => {
    expect(formatStatusProtocolXML('XXX')).toMatchSnapshot()
  })
})
