import Drink from '../../entity/Drink';

const drinks = [
  new Drink({ isSoft: true, label: 'coke', price: 2, volume: 33 }),
  new Drink({ isSoft: false, label: 'balentines', price: 2, volume: 75 }),
  new Drink({ isSoft: false, label: 'sirEdward', price: 2, volume: 75 }),
];

export default drinks;

