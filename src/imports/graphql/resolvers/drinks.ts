import Drink from '../../database/entity/Drink';

export default async function (_, args, ctx) {
  await ctx.getUser(ctx.jwtToken, ctx.db);
  const drinks = ctx.db.find(Drink, {});
  return drinks || [];
}
