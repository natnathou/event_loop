import { pbkdf2 } from 'crypto';
import fetch from 'node-fetch';

export const hash = (start: number) => {
  console.log('in hash');
  pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
    console.log(`hash: ${Date.now() - start}`);
  });
};

export const hashPromise = (start: number) => {
  console.log('in hash');
  return new Promise((resolve, reject) => {
    pbkdf2('a', 'b', 1000000, 512, 'sha512', (err, key) => {
      console.log(`hash: ${Date.now() - start}`);
      resolve(key);
    });
  });
};

export const hashPromiseAsync = (start: number) => {
  console.log('in hash');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      pbkdf2('a', 'b', 1000000, 512, 'sha512', (err, key) => {
        console.log(`hash: ${Date.now() - start}`);
        resolve(key);
      });
    });
  });
};

export const doWork = (duration: number, starter: number) => {
  const start = Date.now();
  console.log('dowork');
  while (Date.now() - start < duration) {}
  console.log(`dowork: ${Date.now() - starter}`);
};

export const doWorkPromise = (duration: number, starter: number) => {
  return new Promise((resolve) => {
    setImmediate(() => {
      const start = Date.now();
      console.log('dowork');
      while (Date.now() - start < duration) {}
      console.log(`dowork: ${Date.now() - starter}`);
      resolve(true);
    });
  });
};

export const fetchGoogle = (starter: number) =>
  fetch('https://jsonplaceholder.typicode.com/todos/1');
