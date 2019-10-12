import DrinkOrder from 'imports/database/entity/DrinkOrder';

const createDrinkOrder = (reservationId: number, drinkId: number) => new DrinkOrder({
  reservationId,
  drinkId,
});

export default createDrinkOrder;
