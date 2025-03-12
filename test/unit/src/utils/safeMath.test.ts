import { MAX_INTEGER } from '@ethereumjs/util'
import { ShardeumFlags } from '../../../../src/shardeum/shardeumFlags'
import { SafeBalance } from '../../../../src/utils/safeMath'

describe('SafeBalance', () => {
    beforeEach(() => {
        ShardeumFlags.unifiedAccountBalanceEnabled = false
    })

    afterEach(() => {
        // Reset flag after each test to avoid test interference
        ShardeumFlags.unifiedAccountBalanceEnabled = false
    })

    describe('addBigintBalance', () => {
        it('should add balances correctly when unifiedAccountBalanceEnabled is false', () => {
            const result = SafeBalance.addBigintBalance(BigInt(10), BigInt(5))
            expect(result).toBe(BigInt(15))
        })

        it('should add large balances correctly when unifiedAccountBalanceEnabled is false', () => {
            const result = SafeBalance.addBigintBalance(BigInt(Number.MAX_SAFE_INTEGER), BigInt(Number.MAX_SAFE_INTEGER))
            expect(result).toBe(BigInt(Number.MAX_SAFE_INTEGER) * BigInt(2))
        })

        it('should add balances correctly when unifiedAccountBalanceEnabled is true and no overflow occurs', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const result = SafeBalance.addBigintBalance(BigInt(10), BigInt(5))
            expect(result).toBe(BigInt(15))
        })

        it('should throw an error for value overflow when result is greater than MAX_INTEGER', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            expect(() => {
                SafeBalance.addBigintBalance(MAX_INTEGER, BigInt(1))
            }).toThrow('value overflow')
        })

        it('should throw an error for value overflow when result is less than either operand due to bigint overflow', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const largeValue = MAX_INTEGER - BigInt(1000)

            expect(() => {
                SafeBalance.addBigintBalance(largeValue, largeValue)
            }).toThrow('value overflow')
        })

        it('should handle zero values correctly', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const result = SafeBalance.addBigintBalance(BigInt(0), BigInt(0))
            expect(result).toBe(BigInt(0))
        })
    })

    describe('subtractBigintBalance', () => {
        it('should subtract balances correctly when unifiedAccountBalanceEnabled is false', () => {
            const result = SafeBalance.subtractBigintBalance(BigInt(10), BigInt(5))
            expect(result).toBe(BigInt(5))
        })

        it('should allow underflow when unifiedAccountBalanceEnabled is false', () => {
            const result = SafeBalance.subtractBigintBalance(BigInt(5), BigInt(10))
            expect(result).toBe(BigInt(-5))
        })

        it('should subtract balances correctly when unifiedAccountBalanceEnabled is true and no underflow occurs', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const result = SafeBalance.subtractBigintBalance(BigInt(10), BigInt(5))
            expect(result).toBe(BigInt(5))
        })

        it('should throw an error for value underflow when unifiedAccountBalanceEnabled is true', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            expect(() => {
                SafeBalance.subtractBigintBalance(BigInt(5), BigInt(10))
            }).toThrow('value underflow')
        })

        it('should handle equal values correctly', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const result = SafeBalance.subtractBigintBalance(BigInt(5), BigInt(5))
            expect(result).toBe(BigInt(0))
        })

        it('should handle zero subtraction correctly', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const result = SafeBalance.subtractBigintBalance(BigInt(5), BigInt(0))
            expect(result).toBe(BigInt(5))
        })

        it('should handle large number subtraction correctly', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const largeValue = MAX_INTEGER - BigInt(1000)
            const result = SafeBalance.subtractBigintBalance(largeValue, BigInt(1000))
            expect(result).toBe(largeValue - BigInt(1000))
        })
    })

    describe('edge cases', () => {
        it('should handle MAX_INTEGER correctly when unifiedAccountBalanceEnabled is true', () => {
            ShardeumFlags.unifiedAccountBalanceEnabled = true
            const result = SafeBalance.addBigintBalance(MAX_INTEGER - BigInt(1), BigInt(1))
            expect(result).toBe(MAX_INTEGER)
        })

        it('should handle negative values in subtraction when unifiedAccountBalanceEnabled is false', () => {
            const result = SafeBalance.subtractBigintBalance(BigInt(-10), BigInt(5))
            expect(result).toBe(BigInt(-15))
        })
    })
})
