import def from './randombytes.js'

const { randomBytes } = await import('./randombytes.js')

const MAX_BYTES = 65536
const MAX_UINT32 = 4294967295
const capture = fn => { try { fn() } catch(err) { return err} }

let success = true
function test(ok, msg) {
  if (!ok) success = false
  console.assert(ok, msg)
  console.count('Test executed')
}

test(randomBytes(17 + MAX_BYTES).byteLength === 17 + MAX_BYTES)
test(randomBytes(MAX_BYTES * 100).byteLength === MAX_BYTES * 100)
test(randomBytes === def, 'async import() have a nice destruct name')

// Test default argument
test(randomBytes().byteLength === 20, 'default argument return uint8(20)')
test(randomBytes(undefined).byteLength === 20, 'default argument return uint8(20)')

// Test number casting
test(randomBytes(0).byteLength === 0, '0 returns empty Uint8(0)')
test(randomBytes(300).byteLength === 300, 'works with numbers')
test(randomBytes("300").byteLength === 300, 'works with strings')
test(randomBytes(5n).byteLength === 5, 'works with BigInt')
test(randomBytes(NaN).byteLength === 0, 'Number(NaN) === 0')
test(randomBytes(null).byteLength === 0, 'Number(null) === 0')
test(randomBytes("hello").byteLength === 0, 'Number(str) === 0')

// Any ArrayBufferView (not supported by web crypto) should be working
test(randomBytes(new BigUint64Array(10)).byteLength === 80, 'works with BigUint64Array')
test(randomBytes(new DataView(new ArrayBuffer(10))).byteLength === 10, 'works with DataView')

// To big throws RangeError
test(capture(() => randomBytes(MAX_UINT32 + 100)) instanceof RangeError, 'dd')
// negative size throws RangeError
test(capture(() => randomBytes(-1)) instanceof RangeError, 'ss')

// Test return type
const uint8 = new Uint8Array(500)
const bigUint64 = new BigUint64Array(50)
test(randomBytes(0) instanceof Uint8Array, 'Vanilla flavor')
test(randomBytes(0).constructor.name !== 'Buffer', 'Buffer is not well suited in other env')
test(randomBytes(0) !== randomBytes(0), 'Do not return same instances')
test(randomBytes(bigUint64) === bigUint64, 'Can provide a pre buffered chunk that return itself')
test(randomBytes(uint8) === uint8, 'Can provide a pre buffered chunk that return itself')
test(randomBytes(uint8) === randomBytes(uint8), 'Do return same uint8 instances')
test(randomBytes(new ArrayBuffer(35)) instanceof ArrayBuffer, 'Do return same arraybuffer instances')
test(uint8.includes(1), 'Should have been well randomized')

globalThis.process?.exit(Number(!success))
