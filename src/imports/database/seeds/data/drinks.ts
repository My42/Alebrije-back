import Drink from '../../entity/Drink';

const drinks = [
  new Drink({ id: 1, isSoft: true, label: 'coke', price: 2, volume: 33 }),
  new Drink({ id: 2, isSoft: false, label: 'balentines', price: 2, volume: 75 }),
  new Drink({ id: 3, isSoft: false, label: 'sirEdward', price: 2, volume: 75 }),
];

export default drinks;

