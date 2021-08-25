import express from 'express';
import { fork } from 'child_process';
import { isMainThread, Worker } from 'worker_threads';
import cluster from 'cluster';
import {
  doWork,
  doWorkPromise,
  fetchExternalApi,
  hash,
  hashPromise,
  hashPromiseAsync,
} from './tools';

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const app = express();

  app.get('/intensiveTask', (req: express.Request, res: express.Response) => {
    const start = Date.now();
    doWork(10000, start);
    doWork(10000, start);
    res.status(200).json({ status: 'ok' });
  });

  app.get('/intensiveTaskAsync', (req: express.Request, res: express.Response) => {
    const start = Date.now();
    doWorkPromise(10000, start);
    doWorkPromise(10000, start);
    res.status(200).json({ status: 'ok' });
  });

  app.get('/workerThread', (req: express.Request, res: express.Response) => {
    const start = Date.now();
    console.log(`is MainThread: ${isMainThread}`);
    console.log(`processId: ${process.pid}`);

    const worker = new Worker(__dirname + '/worker.js', {
      workerData: { start, path: './worker.ts' },
    });
    worker.on('exit', () => {
      res.status(200).json({ status: 'ok' });
    });
  });

  app.get('/forkProcess', (req: express.Request, res: express.Response) => {
    const start = Date.now();
    console.log(`is MainThread: ${isMainThread}`);
    console.log(`processId: ${process.pid}`);
    fork(__dirname + '/worker.ts', [start.toString()]).on('exit', () => {
      res.status(200).json({ status: 'ok' });
    });
  });

  app.get('/multipleFetch', async (req: express.Request, res: express.Response) => {
    try {
      const start = Date.now();
      console.log(1);
      const a = await fetchExternalApi(start);
      console.log(a);
      console.log(2);

      const b = await fetchExternalApi(start);
      console.log(b);
      console.log(3);

      const c = await fetchExternalApi(start);
      console.log(c);
      console.log(4);

      const d = await fetchExternalApi(start);
      console.log(d);
      console.log(5);

      const e = await fetchExternalApi(start);
      console.log(e);
      console.log(6);

      const f = await fetchExternalApi(start);
      console.log(f);
      console.log(7);

      const g = await fetchExternalApi(start);
      console.log(g);
      console.log(8);

      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ status: 'error' });
    }
  });

  app.get('/hash', async (req: express.Request, res: express.Response) => {
    const start = Date.now();
    hash(start);
    hash(start);
    hash(start);
    res.status(200).json({ status: 'ok' });
  });

  app.get('/hashPromise', async (req: express.Request, res: express.Response) => {
    const start = Date.now();
    await hashPromise(start);
    await hashPromise(start);
    await hashPromise(start);
    res.status(200).json({ status: 'ok' });
  });

  app.get(
    '/hashPromiseStackAsync',
    async (req: express.Request, res: express.Response) => {
      const start = Date.now();
      await hashPromiseAsync(start);
      await hashPromiseAsync(start);
      await hashPromiseAsync(start);
      res.status(200).json({ status: 'ok' });
    }
  );

  app.get('/testResponsive', async (req: express.Request, res: express.Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.listen(3000, () => {
    console.log('server is running');
  });
}
