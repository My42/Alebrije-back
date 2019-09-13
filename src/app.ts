import Koa from 'koa';
import Router from 'koa-router';
import './imports/database/index';

const app: Koa = new Koa();
const router: Router = new Router();

router.get('/*', async (ctx) => {
  ctx.body = 'Hello World!dsqdsq';
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
