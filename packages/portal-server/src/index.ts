/* eslint-disable no-console */
import path from 'node:path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';
import koaBodyParser from 'koa-bodyparser';
import routers from './router';
import { getServerDir } from './util/file';
import { syncFileFromCDN } from './middleware/sync-cdn';

const app = new Koa();

const publicDirPath = path.join(getServerDir(), 'public');
app.use(koaBodyParser());
app.use(koaMount('/public', koaStatic(publicDirPath)));
app.use(syncFileFromCDN);
app.use(routers);

const port = 6001;

app.listen(port, () => {
  console.log('服务启动: http://127.0.0.1:' + port);
});
