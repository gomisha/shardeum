import { zeroAddressStr, emptyCodeHash, zeroAddressAccount } from '../../../../src/utils/constants'
import { Account } from '@ethereumjs/util'

/**
 * Test suite for Ethereum-related constants used throughout the application
 * These constants are fundamental building blocks for Ethereum operations
 */
describe('Constants', () => {
  /**
   * Tests for zeroAddressStr constant
   * The zero address is a special Ethereum address (all zeros) often used to represent:
   * - Burning tokens (sending to nobody)
   * - Contract creation transactions (from address)
   * - Default/null values in smart contracts
   */
  describe('zeroAddressStr', () => {
    it('should be the correct Ethereum zero address', () => {
      expect(zeroAddressStr).toBe('0x0000000000000000000000000000000000000000')
    })
  })

  /**
   * Tests for emptyCodeHash constant
   * This hash represents the Keccak-256 hash of empty code
   * Used to determine if an address is a contract or EOA (Externally Owned Account)
   * EOAs and uninitialized contracts will have this code hash
   */
  describe('emptyCodeHash', () => {
    it('should be the correct keccak256 hash for empty code', () => {
      expect(emptyCodeHash).toBe('0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470')
    })
  })

  /**
   * Tests for zeroAddressAccount constant
   * This is an Account object representation of the zero address
   * Used for operations that require an Account instance rather than just the address string
   * Important for state transitions and account manipulations
   */
  describe('zeroAddressAccount', () => {
    it('should be an Account instance', () => {
      expect(zeroAddressAccount).toBeInstanceOf(Account)
    })

    it('should have zero nonce', () => {
      // Nonce should be 0 as the zero address hasn't performed any transactions
      expect(zeroAddressAccount.nonce).toBe(BigInt(0))
    })

    it('should have zero balance', () => {
      // Balance should be 0 as the zero address shouldn't hold any funds
      // (any funds sent to this address are effectively burned)
      expect(zeroAddressAccount.balance).toBe(BigInt(0))
    })
  })
})
