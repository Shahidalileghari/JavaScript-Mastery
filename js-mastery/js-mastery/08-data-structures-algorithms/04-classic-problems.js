/**
 * 04 - Classic Interview Problems
 * Each solution notes time/space complexity.
 */

/** Two Sum - O(n) using a hash map. */
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}

/** Palindrome check ignoring punctuation/case - O(n). */
const isPalindrome = (s) => {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === [...clean].reverse().join('');
};

/** Anagram grouping - O(n * k log k). */
function groupAnagrams(words) {
  const map = new Map();
  for (const w of words) {
    const key = [...w].sort().join('');
    map.set(key, [...(map.get(key) ?? []), w]);
  }
  return [...map.values()];
}

/** Maximum subarray sum (Kadane) - O(n) time, O(1) space. */
function maxSubarray(nums) {
  let best = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

/** Longest substring without repeating characters - sliding window O(n). */
function longestUniqueSubstring(s) {
  const lastSeen = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    if (lastSeen.has(s[i]) && lastSeen.get(s[i]) >= start) start = lastSeen.get(s[i]) + 1;
    lastSeen.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}

/** Dynamic programming: minimum coins to make amount - O(amount * coins). */
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

/** Deep equality of two values. */
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  return ka.length === kb.length && ka.every((k) => deepEqual(a[k], b[k]));
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(isPalindrome('A man, a plan, a canal: Panama'));
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat']));
console.log(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(longestUniqueSubstring('abcabcbb'));
console.log(coinChange([1, 5, 10, 25], 63));
console.log(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
