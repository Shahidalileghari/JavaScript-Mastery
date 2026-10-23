/**
 * 04 - Dependency Injection & Repository Pattern
 * Classes receive their dependencies instead of creating them -> easy testing.
 */

/** Data access abstraction. */
class InMemoryUserRepository {
  #users = new Map();
  save(user) { this.#users.set(user.id, user); return user; }
  findById(id) { return this.#users.get(id) ?? null; }
}

/** Service depends on an abstraction (repo + logger), not a concrete DB. */
class UserService {
  constructor({ repository, logger }) {
    this.repository = repository;
    this.logger = logger;
  }
  register(id, name) {
    if (this.repository.findById(id)) throw new Error('User already exists');
    this.logger(`registering ${name}`);
    return this.repository.save({ id, name });
  }
}

// Production wiring
const service = new UserService({ repository: new InMemoryUserRepository(), logger: console.log });
console.log(service.register(1, 'Shahid'));

// Test wiring: inject fakes
const logs = [];
const testService = new UserService({
  repository: { findById: () => null, save: (u) => u },
  logger: (m) => logs.push(m),
});
testService.register(9, 'Test');
console.log('captured logs:', logs);
