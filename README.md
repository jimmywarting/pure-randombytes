# randombytes

Get secure cryptographic random bytes from of any TypedArray, ArrayBuffer or size without importing `node:crypto` or `node:buffer` to browsers.

```js
import randomBytes from 'pure-randombytes'
import randomBytes from 'https://cdn.jsdelivr.net/gh/jimmywarting/pure-randombytes@latest/randombytes.js'

randomBytes() // return Uint8(20) - default to 20 (same as sha1 length)
randomBytes(16) // return Uint8(16)
randomBytes("10") // return Uint8(16) - Anything that isn't TypedArray is casted to Number(x)
```

Still want to get a randomized `node:buffer` back or have something pre allocated? Stuff it in as the first argument, and get the same instance back

```js
randomBytes(uint8) === uint8 // works with pre allocated buffer
randomBytes(bigInt64_or_dataView) // ...and any kind of ArrayBufferView
randomBytes(new ArrayBuffer(33)) instanceof ArrayBuffer // ...ArrayBuffer
randomBytes(Buffer.allocUnsafe(20)) instanceof Buffer // ...and yes, Buffer as well
```
