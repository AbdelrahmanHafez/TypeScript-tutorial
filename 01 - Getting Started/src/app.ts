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


function PropertyLogger (target: any, propertyName: string|Symbol) {
  console.log('PropertyLogger:');
  console.log(target);
  console.log(propertyName);
  console.log('\n');
}

function AccessorLogger (target: any, propertyName: string|Symbol, description: PropertyDescriptor) {
  console.log('AccessorLogger:');
  console.log(target);
  console.log(propertyName);
  console.log(description);
  console.log('\n');
}

function MethodLogger (target: any, name: string|Symbol, description: PropertyDescriptor) {
  console.log('MethodLogger:');
  console.log(target);
  console.log(name);
  console.log(description);
  console.log('\n');
}

function ParameterLogger (target: any, name: string|Symbol, position: number) {
  console.log('ParameterLogger:');
  console.log(target);
  console.log(name);
  console.log(position);
  console.log('\n');
}

class Product {
  @PropertyLogger
  public title: string;

  constructor (title: string, private _price: number) {
    this.title = title;
  }

  get price () {
    return this._price + 5;
  }

  @AccessorLogger
  set price (price: number) {
    if (price < 0) return;

    this._price = price;
  }

  @MethodLogger
  getPriceWithTax (@ParameterLogger tax: number) {
    return this._price * (1 + tax);
  }
}

const product = new Product('Computer', 2000);
console.log(product.getPriceWithTax(0.12));