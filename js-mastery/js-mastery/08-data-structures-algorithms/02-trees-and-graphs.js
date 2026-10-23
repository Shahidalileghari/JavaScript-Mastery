/**
 * 02 - Binary Search Tree & Graph Traversal
 */

/** Binary Search Tree: left < node < right. Average O(log n) operations. */
class BST {
  #root = null;

  insert(value) {
    const node = { value, left: null, right: null };
    if (!this.#root) { this.#root = node; return this; }
    let cur = this.#root;
    while (true) {
      const side = value < cur.value ? 'left' : 'right';
      if (!cur[side]) { cur[side] = node; return this; }
      cur = cur[side];
    }
  }

  has(value) {
    let cur = this.#root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  /** In-order traversal yields sorted values. */
  *inOrder(node = this.#root) {
    if (!node) return;
    yield* this.inOrder(node.left);
    yield node.value;
    yield* this.inOrder(node.right);
  }

  height(node = this.#root) {
    return node ? 1 + Math.max(this.height(node.left), this.height(node.right)) : 0;
  }
}

const tree = new BST();
[50, 30, 70, 20, 40, 60, 80].forEach((v) => tree.insert(v));
console.log([...tree.inOrder()], tree.has(60), tree.has(65), 'height', tree.height());

// ---- Graphs (adjacency list) ----
const graph = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['D', 'E'],
  D: ['F'],
  E: ['F'],
  F: [],
};

/** Breadth-first search: also finds the shortest path (unweighted). */
function bfsShortestPath(graph, start, goal) {
  const queue = [[start]];
  const visited = new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const node = path.at(-1);
    if (node === goal) return path;
    for (const next of graph[node]) {
      if (!visited.has(next)) { visited.add(next); queue.push([...path, next]); }
    }
  }
  return null;
}

/** Depth-first search (recursive). */
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  graph[node].forEach((n) => !visited.has(n) && dfs(graph, n, visited));
  return [...visited];
}

console.log('BFS path', bfsShortestPath(graph, 'A', 'F'));
console.log('DFS order', dfs(graph, 'A'));
