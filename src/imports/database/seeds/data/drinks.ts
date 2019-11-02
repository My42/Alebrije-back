import Drink from '../../entity/Drink';

const drinks = [
  new Drink({
    id: 1, isSoft: true, label: 'drink.coke', price: 2, volume: 33,
  }),
  new Drink({
    id: 2, isSoft: true, label: 'drink.iceTea', price: 2, volume: 33,
  }),
  new Drink({
    id: 3, isSoft: true, label: 'drink.pepsi', price: 2, volume: 33,
  }),
  new Drink({
    id: 4, isSoft: true, label: 'drink.water', price: 5, volume: 33,
  }),
  new Drink({
    id: 5, isSoft: false, label: 'drink.balentines', price: 30, volume: 75,
  }),
  new Drink({
    id: 6, isSoft: false, label: 'drink.sirEdward', price: 30, volume: 75,
  }),
  new Drink({
    id: 7, isSoft: false, label: 'drink.captainMorgan', price: 30, volume: 75,
  }),
  new Drink({
    id: 8, isSoft: false, label: 'drink.balentines', price: 55, volume: 100,
  }),
  new Drink({
    id: 9, isSoft: false, label: 'drink.sirEdward', price: 55, volume: 100,
  }),
  new Drink({
    id: 10, isSoft: false, label: 'drink.captainMorgan', price: 55, volume: 100,
  }),
  new Drink({
    id: 11, isSoft: false, label: 'drink.absolut', price: 30, volume: 75,
  }),
  new Drink({
    id: 12, isSoft: false, label: 'drink.absolut', price: 55, volume: 100,
  }),
];

export default drinks;
