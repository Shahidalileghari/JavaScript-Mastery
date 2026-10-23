/**
 * 01 - Callbacks & Callback Hell
 * A callback is a function passed to be called later (here: error-first style).
 */

/** Simulates an async lookup. Node convention: callback(error, result). */
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id <= 0) return callback(new Error('Invalid id'));
    callback(null, { id, name: `User${id}` });
  }, 10);
}

function fetchPosts(userId, callback) {
  setTimeout(() => callback(null, [`post-1 by ${userId}`, `post-2 by ${userId}`]), 10);
}

// "Pyramid of doom": nested callbacks quickly become hard to read
fetchUser(1, (err, user) => {
  if (err) return console.log('error:', err.message);
  fetchPosts(user.id, (err2, posts) => {
    if (err2) return console.log('error:', err2.message);
    console.log(user.name, posts);
  });
});

fetchUser(-1, (err) => console.log('handled:', err.message));
// Promises (next file) solve this nesting problem.
