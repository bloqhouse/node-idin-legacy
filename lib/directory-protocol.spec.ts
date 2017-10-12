import { formatDirectoryProtocolXML } from './directory-protocol'

describe('format directory protocol', () => {
  it('it works correctly', () => {
    expect(formatDirectoryProtocolXML()).toMatchSnapshot()
  })
})
