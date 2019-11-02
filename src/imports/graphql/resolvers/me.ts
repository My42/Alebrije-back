export default async function (_, args, ctx) {
  return ctx.getUser(ctx.jwtToken, ctx.db);
}
