/**
 * Project 1 - Todo Manager (OOP + immutability + JSON persistence)
 * Combines: classes, private fields, Map, array methods, JSON, error handling
 */
import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

class Todo {
  static #nextId = 1;
  constructor(title, priority = 'medium') {
    this.id = Todo.#nextId++;
    this.title = title;
    this.priority = priority;
    this.done = false;
  }
}

class TodoManager {
  #todos = new Map();

  /** Adds a new todo and returns it. */
  add(title, priority) {
    if (!title?.trim()) throw new Error('Title is required');
    const todo = new Todo(title.trim(), priority);
    this.#todos.set(todo.id, todo);
    return todo;
  }

  /** Marks a todo as complete. */
  complete(id) {
    const todo = this.#todos.get(id);
    if (!todo) throw new Error(`Todo ${id} not found`);
    todo.done = true;
    return todo;
  }

  remove(id) { return this.#todos.delete(id); }

  /** Filtering + sorting by priority. */
  list({ done } = {}) {
    const order = { high: 0, medium: 1, low: 2 };
    return [...this.#todos.values()]
      .filter((t) => done === undefined || t.done === done)
      .sort((a, b) => order[a.priority] - order[b.priority]);
  }

  /** Summary statistics. */
  stats() {
    const all = this.list();
    const done = all.filter((t) => t.done).length;
    return { total: all.length, done, pending: all.length - done };
  }

  save(path) { writeFileSync(path, JSON.stringify(this.list(), null, 2)); }
  static load(path) {
    const mgr = new TodoManager();
    if (existsSync(path)) {
      for (const t of JSON.parse(readFileSync(path, 'utf8'))) mgr.add(t.title, t.priority).done = t.done;
    }
    return mgr;
  }
}

const mgr = new TodoManager();
mgr.add('Learn closures', 'high');
mgr.add('Build portfolio', 'high');
mgr.add('Read about proxies', 'low');
mgr.complete(1);

console.log('Pending:', mgr.list({ done: false }).map((t) => t.title));
console.log('Stats:', mgr.stats());

const file = join(tmpdir(), 'todos-demo.json');
mgr.save(file);
console.log('Reloaded:', TodoManager.load(file).stats());
unlinkSync(file);
