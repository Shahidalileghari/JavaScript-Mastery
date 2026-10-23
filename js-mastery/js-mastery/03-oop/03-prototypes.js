/**
 * 03 - Prototypes (what classes are built on)
 * Every object has a hidden link to another object: its prototype.
 */

// Constructor function + prototype methods (pre-ES6 style)
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name); // "super" constructor call
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function () {
  return `${this.name} barks`;
};

const d = new Dog('Rex');
console.log(d.speak(), d instanceof Animal);

// Prototype chain lookup: d -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
console.log(Object.getPrototypeOf(d) === Dog.prototype);
console.log(Object.getPrototypeOf(Object.prototype));

// Object.create: set prototype directly
const protoObj = { hello() { return 'hello from proto'; } };
const child = Object.create(protoObj, { own: { value: 1, enumerable: true } });
console.log(child.hello(), Object.hasOwn(child, 'hello'));

// Classes are syntactic sugar over this mechanism
class Cat { meow() { return 'meow'; } }
console.log(typeof Cat, Cat.prototype.meow === new Cat().meow);
