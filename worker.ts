import worker from 'worker_threads';
import { doWork } from './tools';

console.log(`isMainThread ${worker.isMainThread}`);
console.log(`processId: ${process.pid}`);

if (worker.isMainThread) doWork(10000, parseInt(process.argv[2]));
else doWork(10000, worker.workerData.start);
