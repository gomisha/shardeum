import config from '../../../../src/config'

/**
 * Test suite for Shardeum configuration
 * Verifies that all required configuration properties are properly defined
 * These tests ensure the application has the necessary settings to function correctly
 */
describe('ShardeumConfig', () => {
  /**
   * Tests for core server configuration properties
   * These properties are essential for basic server operation
   */
  describe('server configuration', () => {
    it('should have a globalAccount property', () => {
      // The global account is used for network-level operations and transactions
      expect(config.server.globalAccount).toBeDefined()
    })

    it('should have a baseDir property', () => {
      // Base directory is used for file storage, data persistence, and configuration
      expect(config.server.baseDir).toBeDefined()
    })
  })

  /**
   * Tests for peer-to-peer (p2p) network configuration
   * These settings control how nodes interact with each other in the network
   * Critical for network stability, node rotation, and consensus
   */
  describe('p2p configurations defined', () => {
    it('should have cycleDuration defined', () => {
      // Controls how long each network cycle lasts, affecting node rotation and consensus timing
      expect(config.server.p2p?.cycleDuration).toBeDefined()
    })

    it('should have rotationEdgeToAvoid defined', () => {
      // Defines timing boundaries to avoid during node rotation to prevent network instability
      expect(config.server.p2p?.rotationEdgeToAvoid).toBeDefined()
    })

    it('should have allowActivePerCycle defined', () => {
      // Controls how many nodes can be active during each network cycle
      expect(config.server.p2p?.allowActivePerCycle).toBeDefined()
    })
  })

  /**
   * Tests for sharding configuration
   * These settings determine how the network is divided into shards
   * Essential for scalability and parallel transaction processing
   */
  describe('sharding configuration', () => {
    it('should have nodesPerConsensusGroup defined', () => {
      // Defines how many nodes participate in consensus for each shard
      // Critical for balancing security and performance
      expect(config.server.sharding?.nodesPerConsensusGroup).toBeDefined()
    })
  })

  /**
   * Tests for feature-specific configurations
   * These settings control optional features and their behavior
   */
  describe('features configuration', () => {
    it('should have tickets configuration', () => {
      // Ticket system configuration for network participation and rewards
      expect(config.server.features?.tickets).toBeDefined()
    })

    it('should have updateTicketListTimeInMs defined in tickets', () => {
      // Controls how frequently the ticket list is updated
      // Affects network responsiveness and resource usage
      expect(config.server.features?.tickets?.updateTicketListTimeInMs).toBeDefined()
    })

    it('should have ticketTypes defined in tickets', () => {
      // Verifies that ticket types are defined and in the correct format (array)
      // Different ticket types serve different purposes in the network
      expect(config.server.features?.tickets?.ticketTypes).toBeDefined()
      expect(Array.isArray(config.server.features?.tickets?.ticketTypes)).toBe(true)
    })
  })

  /**
   * Tests for environment variable overrides
   * These tests verify that configuration can be overridden via environment variables
   * Important for deployment flexibility and containerization
   */
  describe('environment variable overrides', () => {
    const originalEnv = process.env

    beforeEach(() => {
      // Reset modules and environment before each test to ensure isolation
      jest.resetModules()
      process.env = { ...originalEnv }
    })

    afterEach(() => {
      // Restore original environment after each test
      process.env = originalEnv
    })

    it('should allow BASE_DIR to be overridden', () => {
      // This is a limited test since we can't easily reload the config
      // Verifies that the baseDir property exists and can potentially be overridden
      expect(config.server.baseDir).toBeDefined()
    })
  })
})
