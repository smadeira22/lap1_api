# Shark API

## 1. fork, clone, don't forget to commit and push

## 2. implement the code to make the tests pass
- update the `.gitignore`
- `GET /`
- create a [middleware](https://expressjs.com/en/guide/using-middleware.html#using-middleware) logger
- index `GET /sharks`
- show `GET /sharks/:id`
- create `POST /sharks`
- update `PATCH /sharks/:id`
- destroy `DELETE /sharks/:id`

## 3. update this read me
- `cd` into server
-`npm install --save -dev jest`
-`npm run test`
- open localhost:5000/ in the browser?
-available endpoints:
  -./localhost:5000/shark
  -./localhost:5000/sharks/:id 
- bugs?
- link to deployed version
- if you think that something is wrong with the tests, please create an issue
