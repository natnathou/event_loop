- to start the server in regular mode:
  npm run start-ts-regular
- to start the server in cluster mode:
  npm run start-ts-cluster-mode
- to start the server with pm2:
  npm run start-pm2
- to stop pm2
  npm run delete-pm2

to test your server:

install apache benchmarking tool (ab) on windows
download apache binaries from an apache recommended download site (i.e. :apache lounge)

https://www.apachelounge.com/download/VS16/binaries/httpd-2.4.48-win64-VS16.zip

extract the content using zip tool
copy the /bin/ab.exe to a folder of your choice (i.e.: c:\temp)
start a command prompt and run i

ab -n 100 -c 50 http://localhost:3000/{your route}

UV_THREADPOOL_SIZE:
to change the number of threads of the thread pool (used by libuv), you have to set it manually, in the script start-js-regular:run , and you have to run:
npm run start-js

You have also the file event_loop.postman_collection.json to upload in postman
