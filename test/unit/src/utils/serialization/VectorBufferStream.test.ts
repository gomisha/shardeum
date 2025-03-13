import { VectorBufferStream } from '@shardeum-foundation/core'

describe('VectorBufferStream', () => {
  it('should create a new VectorBufferStream with the specified initial size', () => {
    const stream = new VectorBufferStream(10)
    expect(stream.getBufferLength()).toBe(10)
  })

  it('should create a new VectorBufferStream from a Buffer', () => {
    const buffer = Buffer.from('hello')
    const stream = VectorBufferStream.fromBuffer(buffer)
    expect(stream.getAsHexString()).toBe('68656c6c6f')
  })

  it('should ensure capacity when writing a value', () => {
    const stream = new VectorBufferStream(10)
    stream.write('hello')
    expect(stream.getBufferLength()).toBe(10)
  })

  it('should write and read a string', () => {
    const stream = new VectorBufferStream(10)
    const str = 'test string'
    stream.writeString(str)
    stream.position = 0
    const readStr = stream.readString()
    expect(readStr).toBe(str)
  })

  it('should write and read a buffer', () => {
    const stream = new VectorBufferStream(10)
    const buffer = Buffer.from('test buffer')
    stream.writeBuffer(buffer)
    stream.position = 0
    const readBuffer = stream.readBuffer()
    expect(readBuffer.toString()).toBe(buffer.toString())
  })

  it('should write and read a fixed buffer', () => {
    const stream = new VectorBufferStream(10)
    const buffer = Buffer.from('fixed')
    stream.writeFixedBuffer(buffer)
    stream.position = 0
    const readBuffer = stream.readFixedBuffer(5)
    expect(readBuffer.toString()).toBe(buffer.toString())
  })

  it('should read fixed buffer', () => {
    const stream = new VectorBufferStream(10)
    const buffer = Buffer.from('fixed')
    stream.writeFixedBuffer(buffer)
    stream.position = 0

    const readBuffer = stream.readFixedBuffer(buffer.byteLength)

    expect(readBuffer).toEqual(buffer)
  })

  it('should write and read an uint8', () => {
    const stream = new VectorBufferStream(10)
    stream.writeUInt8(10)
    stream.position = 0
    const value = stream.readUInt8()
    expect(value).toBe(10)
  })

  it('should write and read an int16', () => {
    const stream = new VectorBufferStream(10)
    stream.writeInt16(10)
    stream.position = 0
    const value = stream.readInt16()
    expect(value).toBe(10)
  })

  it('should write and read an uint16', () => {
    const stream = new VectorBufferStream(10)
    stream.writeUInt16(10)
    stream.position = 0
    const value = stream.readUInt16()
    expect(value).toBe(10)
  })

  it('should write and read an int32', () => {
    const stream = new VectorBufferStream(10)
    stream.writeInt32(10)
    stream.position = 0
    const value = stream.readInt32()
    expect(value).toBe(10)
  })

  it('should write and read an uint32', () => {
    const stream = new VectorBufferStream(10)
    stream.writeUInt32(10)
    stream.position = 0
    const value = stream.readUInt32()
    expect(value).toBe(10)
  })

  it('should write and read an bigint64', () => {
    const stream = new VectorBufferStream(10)
    stream.writeBigInt64(BigInt(10))
    stream.position = 0
    const value = stream.readBigInt64()
    expect(value).toBe(BigInt(10))
  })

  it('should write and read an ubigint64', () => {
    const stream = new VectorBufferStream(10)
    stream.writeBigUInt64(BigInt(10))
    stream.position = 0
    const value = stream.readBigUInt64()
    expect(value).toBe(BigInt(10))
  })

  it('should write and read an float', () => {
    const stream = new VectorBufferStream(10)
    stream.writeFloat(10.123)
    stream.position = 0
    const value = stream.readFloat()
    expect(value).toBeCloseTo(10.123)
  })

  it('should write and read an double', () => {
    const stream = new VectorBufferStream(10)
    stream.writeDouble(10.123456)
    stream.position = 0
    const value = stream.readDouble()
    expect(value).toBeCloseTo(10.123456)
  })
})
