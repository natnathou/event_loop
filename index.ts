import express from 'express';
import { fork } from 'child_process';
import { Worker, isMainThread } from 'worker_threads';

import {
  doWork,
  doWorkPromise,
  fetchGoogle,
  hash,
  hashPromise,
  hashPromiseAsync,
} from './tools';

const app = express();

app.get('/intensiveTask', (req: express.Request, res: express.Response) => {
  const start = Date.now();
  doWork(10000, start);
  doWork(10000, start);
  res.status(200).json({ status: 'ok' });
});

app.get(
  '/intensiveTaskAsync',
  (req: express.Request, res: express.Response) => {
    const start = Date.now();
    doWorkPromise(10000, start);
    doWorkPromise(10000, start);
    res.status(200).json({ status: 'ok' });
  }
);

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

app.get(
  '/multipleFetch',
  async (req: express.Request, res: express.Response) => {
    try {
      const start = Date.now();
      console.log(1);
      const a = await fetchGoogle(start);
      console.log(a);
      console.log(2);

      const b = await fetchGoogle(start);
      console.log(b);
      console.log(3);

      const c = await fetchGoogle(start);
      console.log(c);
      console.log(4);

      const d = await fetchGoogle(start);
      console.log(d);
      console.log(5);

      const e = await fetchGoogle(start);
      console.log(e);
      console.log(6);

      const f = await fetchGoogle(start);
      console.log(f);
      console.log(7);

      const g = await fetchGoogle(start);
      console.log(g);
      console.log(8);

      res.status(200);
    } catch (error) {
      res.status(500).json({ status: 'error' });
    }
  }
);

app.get('/hash', async (req: express.Request, res: express.Response) => {
  const start = Date.now();
  hash(start);
  hash(start);
  hash(start);
  hash(start);
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

app.get('/fast', async (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('server is running');
});
