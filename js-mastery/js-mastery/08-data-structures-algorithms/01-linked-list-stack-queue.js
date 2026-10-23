/**
 * 01 - Linked List, Stack & Queue
 */

class Node {
  constructor(value, next = null) { this.value = value; this.next = next; }
}

/** Singly linked list. */
class LinkedList {
  #head = null;
  #size = 0;

  /** O(1) insert at head. */
  prepend(value) { this.#head = new Node(value, this.#head); this.#size++; return this; }

  /** O(n) insert at tail. */
  append(value) {
    const node = new Node(value);
    if (!this.#head) this.#head = node;
    else {
      let cur = this.#head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
    this.#size++;
    return this;
  }

  /** Reverses the list in place. O(n) time, O(1) space. */
  reverse() {
    let prev = null, cur = this.#head;
    while (cur) [cur.next, prev, cur] = [prev, cur, cur.next];
    this.#head = prev;
    return this;
  }

  get size() { return this.#size; }
  *[Symbol.iterator]() { for (let c = this.#head; c; c = c.next) yield c.value; }
}

const list = new LinkedList().append(1).append(2).append(3).prepend(0);
console.log([...list], list.size, [...list.reverse()]);

/** Stack (LIFO) - e.g. undo history, call stack. */
class Stack {
  #items = [];
  push(x) { this.#items.push(x); }
  pop() { return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  get size() { return this.#items.length; }
}

/** Queue (FIFO) using a head pointer to keep dequeue O(1). */
class Queue {
  #items = {}; #head = 0; #tail = 0;
  enqueue(x) { this.#items[this.#tail++] = x; }
  dequeue() {
    if (this.#head === this.#tail) return undefined;
    const v = this.#items[this.#head];
    delete this.#items[this.#head++];
    return v;
  }
  get size() { return this.#tail - this.#head; }
}

/** Classic stack problem: balanced brackets. */
function isBalanced(str) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = new Stack();
  for (const ch of str) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (ch in pairs && stack.pop() !== pairs[ch]) return false;
  }
  return stack.size === 0;
}
console.log(isBalanced('{[()]}'), isBalanced('{[(])}'));

const q = new Queue();
q.enqueue('a'); q.enqueue('b');
console.log(q.dequeue(), q.size);
