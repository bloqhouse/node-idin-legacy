declare module 'web3'
declare module 'ethereum-blocks'
declare module 'promisify-es6'
declare module 'xml-crypto'
declare module 'pretty-data'
declare module 'jest-fetch-mock'
declare module 'xml-encryption'
declare module 'idx' {
 export function idx<T1, T2>(prop: T1, accessor: (prop: T1) => T2): T2 | null | undefined;
 export default idx
}

declare module 'base64-to-uint8array' {
  function toUint8Array(base64EncodedString: string): Uint8Array
  export = toUint8Array
}
