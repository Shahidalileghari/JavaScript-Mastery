/**
 * 03 - Control Flow
 * Topics: if/else, switch, for, while, for...of, for...in, break/continue, labels
 */

// if / else if / else
function grade(score) {
  if (score >= 90) return 'A';
  else if (score >= 80) return 'B';
  else if (score >= 70) return 'C';
  return 'F';
}
console.log(grade(95), grade(82), grade(40));

// switch (use break, or return, to avoid fall-through)
function dayType(day) {
  switch (day) {
    case 'Sat':
    case 'Sun':
      return 'weekend';
    default:
      return 'weekday';
  }
}
console.log(dayType('Sun'), dayType('Mon'));

// Classic for loop
for (let i = 0; i < 3; i++) console.log('for', i);

// while / do...while
let w = 0;
while (w < 2) console.log('while', w++);
do { console.log('do-while runs at least once'); } while (false);

// for...of -> iterate VALUES of iterables (arrays, strings, Map, Set)
for (const ch of 'JS') console.log('char', ch);

// for...in -> iterate enumerable KEYS of an object
for (const key in { x: 1, y: 2 }) console.log('key', key);

// break / continue
for (let i = 0; i < 6; i++) {
  if (i === 1) continue; // skip this iteration
  if (i === 4) break;    // exit the loop
  console.log('loop', i);
}

// Labeled break to exit nested loops
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i * j === 2) break outer;
    console.log('nested', i, j);
  }
}
