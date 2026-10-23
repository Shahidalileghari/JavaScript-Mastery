/**
 * 02 - Inheritance & Polymorphism
 * Topics: extends, super, method overriding, abstract-like classes, instanceof
 */

/** Abstract-style base class: cannot be instantiated directly. */
class Shape {
  constructor(name) {
    if (new.target === Shape) throw new Error('Shape is abstract');
    this.name = name;
  }
  /** Subclasses MUST implement this. */
  area() { throw new Error('area() not implemented'); }
  describe() { return `${this.name} with area ${this.area().toFixed(2)}`; }
}

class Circle extends Shape {
  constructor(radius) {
    super('Circle'); // must call super() before using `this`
    this.radius = radius;
  }
  area() { return Math.PI * this.radius ** 2; } // overrides Shape.area
}

class Rectangle extends Shape {
  constructor(w, h) {
    super('Rectangle');
    this.w = w;
    this.h = h;
  }
  area() { return this.w * this.h; }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
    this.name = 'Square';
  }
  describe() {
    return `[square] ${super.describe()}`; // extend parent behaviour
  }
}

// Polymorphism: same call, different behaviour per subclass
const shapes = [new Circle(2), new Rectangle(3, 4), new Square(5)];
shapes.forEach((s) => console.log(s.describe()));

console.log(shapes[2] instanceof Square, shapes[2] instanceof Rectangle, shapes[2] instanceof Circle);
try { new Shape('x'); } catch (e) { console.log(e.message); }
