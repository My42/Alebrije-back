import Drink, { DrinkRows } from 'imports/database/entity/Drink';

const createDrink = (args: DrinkRows) => new Drink({ ...args });

export default createDrink;
