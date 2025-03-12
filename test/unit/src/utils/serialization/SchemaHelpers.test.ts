import Ajv from 'ajv'
import { AJVSchemaEnum } from '../../../../../src/types/enum/AJVSchemaEnum'
import {
  getVerifyFunction,
  addSchema,
  initializeSerialization,
} from '../../../../../src/utils/serialization/SchemaHelpers'

describe('SchemaHelpers', () => {
  beforeEach(() => {})
  describe('initializeSerialization', () => {
    it('should initialize serialization by adding schemas to AJV', () => {
      const ajvSpy = jest.spyOn(Ajv.prototype, 'addSchema')

      addSchema(AJVSchemaEnum.InjectTxReq, {
        type: 'object',
        properties: { timestamp: { type: 'number' } },
        required: ['timestamp'],
      })
      addSchema(AJVSchemaEnum.PenaltyTx, {
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
      })

      initializeSerialization()
      expect(ajvSpy).toHaveBeenCalledTimes(2)
    })
  })
  describe('addSchema and getVerifyFunction', () => {
    const testSchema = {
      type: 'object',
      properties: { testProp: { type: 'string' } },
      required: ['testProp'],
    }
    const testSchemaName1 = 'TestSchema1'
    const testSchemaName2 = 'TestSchema2'
    const testSchemaName3 = 'TestSchema3'

    // FIX ME: wont work until we expose schemaMap
    // it('should add a schema to the schema map', () => {
    //   addSchema(testSchemaName1, testSchema)
    //   // eslint-disable-next-line security/detect-object-injection
    //   expect((addSchema as any).schemaMap.get(testSchemaName1)).toBe(testSchema)
    // })

    it('should throw an error if trying to add a schema with a duplicate name', () => {
      addSchema(testSchemaName2, testSchema)
      expect(() => addSchema(testSchemaName2, testSchema)).toThrowError(
        `error already registered ${testSchemaName2}`
      )
    })

    it('should return a validator function for a schema added', () => {
      addSchema(testSchemaName3, testSchema)
      const validator = getVerifyFunction(testSchemaName3)
      expect(typeof validator).toBe('function')
    })

    it('should throw an error if trying to get a validator function for a non-existent schema', () => {
      expect(() => getVerifyFunction('NonExistentSchema')).toThrowError(
        'error missing schema NonExistentSchema'
      )
    })
  })
})
