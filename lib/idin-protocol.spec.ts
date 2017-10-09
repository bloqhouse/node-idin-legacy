import './_mocks'
import { signXML } from './idin-protocol'

const xml = '<?xml version="1.0" encoding="UTF-8"?><x></x>'

describe('format idin protocol', () => {
  it('it works correctly', () => {
    expect(signXML(xml)).toMatchSnapshot()
    expect(signXML(xml, true)).toMatchSnapshot()
  })
})
