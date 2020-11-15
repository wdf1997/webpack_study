import '../css/a.css';
import '../css/b.css';
import { mul } from './test';

function add(...args) {
  return args.reduce((a, b) => a + b, 0);
}
console.log(mul(2, 3));
console.log(add(1, 2, 3, 4));
