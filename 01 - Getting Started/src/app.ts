function getLoggerDecorator (logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}


@getLoggerDecorator('Logging Person class')
class Person {
  name = 'Hafez';

  constructor () {
    console.log('Creating person object...');
  }
}


const person = new Person();
console.log(person);

function Log (target: Product, propertyName: string|Symbol) {
  console.log('Decorator');
  console.log(target);
  console.log(propertyName);
}

class Product {
  @Log
  public title: string;

  constructor (title: string, private _price: number) {
    this.title = title;
  }

  get price () {
    return this._price + 5;
  }

  set price (price: number) {
    if (price < 0) return;

    this._price = price;
  }

  getPriceWithTax (tax: number) {
    return this._price * (1 + tax);
  }
}

const product = new Product('Computer', 2000);
console.log(product.getPriceWithTax(0.12));