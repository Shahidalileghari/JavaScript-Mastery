/**
 * 01 - Classes
 * Topics: constructor, methods, getters/setters, static, private fields
 */

class BankAccount {
  // Private field: only accessible inside the class body
  #balance = 0;

  // Static field shared by the class itself
  static bankName = 'JS Bank';

  /**
   * @param {string} owner   Account holder
   * @param {number} initial Opening balance
   */
  constructor(owner, initial = 0) {
    this.owner = owner;
    this.#balance = initial;
  }

  /** Public getter: exposes balance read-only. */
  get balance() {
    return this.#balance;
  }

  /** Adds money. Validates input to keep the object consistent. */
  deposit(amount) {
    if (amount <= 0) throw new RangeError('Deposit must be positive');
    this.#balance += amount;
    return this; // returning `this` enables chaining
  }

  /** Removes money if funds are available. */
  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
    return this;
  }

  /** Private method. */
  #audit() { return `${this.owner}:${this.#balance}`; }
  report() { return this.#audit(); }

  /** Static factory method. */
  static openSavings(owner) {
    return new BankAccount(owner, 100);
  }

  toString() { return `${this.owner} has ${this.#balance}`; }
}

const acc = new BankAccount('Shahid', 50);
acc.deposit(100).withdraw(30);
console.log(acc.balance, acc.report(), `${acc}`);
console.log(BankAccount.bankName, BankAccount.openSavings('Ali').balance);

try { acc.withdraw(10_000); } catch (e) { console.log(e.message); }
