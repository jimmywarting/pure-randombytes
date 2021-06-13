/*! pure-randombytes. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES = 65536

const crypto = globalThis.crypto || await import('node:crypto').then(mod => mod.webcrypto)
const getRandomValues = crypto.getRandomValues.bind(crypto)

/** @param {*} [b=20] */
export default function randomBytes (b = 20) {
  const same = ArrayBuffer.isView(b) || b instanceof ArrayBuffer
  const bytes = ArrayBuffer.isView(b)
    ? new Uint8Array(b.buffer, b.byteOffset, b.byteLength)
    : new Uint8Array(same ? b : Number(b))

  for (let i = 0; i < bytes.byteLength; i += MAX_BYTES) {
    getRandomValues(bytes.subarray(i, i + MAX_BYTES))
  }

  return same ? b : bytes
}

// Sugar for async import()
export { randomBytes }
