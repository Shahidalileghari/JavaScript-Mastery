/**
 * 03 - Sorting & Searching Algorithms (with Big-O)
 */

/** Bubble sort - O(n^2). Educational only. */
function bubbleSort(input) {
  const arr = [...input];
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; swapped = true; }
    }
    if (!swapped) break; // already sorted -> early exit
  }
  return arr;
}

/** Merge sort - O(n log n), stable, uses O(n) extra space. */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return out.concat(left.slice(i), right.slice(j));
}

/** Quick sort - O(n log n) average, O(n^2) worst. */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const [pivot, ...rest] = arr;
  return [...quickSort(rest.filter((x) => x < pivot)), pivot, ...quickSort(rest.filter((x) => x >= pivot))];
}

/** Binary search on a SORTED array - O(log n). Returns index or -1. */
function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] === target) return mid;
    sorted[mid] < target ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

const data = [38, 27, 43, 3, 9, 82, 10];
console.log(bubbleSort(data));
console.log(mergeSort(data));
console.log(quickSort(data));
console.log(binarySearch(mergeSort(data), 43));
