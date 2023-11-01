const app = require('../app')
const request = require('supertest')
const fs = require('fs');
const path = require('path');

describe('api server', () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log('Test server running on port 5000')
    })
  })

  afterAll((done) => {
    console.log('Gracefully stopping test server')
    api.close(done)
  })


  // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
  // ⚠️ the API Structure tests are not expected to be seen in projects
  // ⚠️ They are just here to make sure that you respect the structure
  // ⚠️ defined in the lecture 

  describe('API Structure', () => {
    test('app.js exists', () => {
      const file = path.join(__dirname, '..', 'app.js');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });

    test('index.js exists', () => {
      const file = path.join(__dirname, '..', 'index.js');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });

    test('sharks.json exists', () => {
      const file = path.join(__dirname, '..', 'sharks.json');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });
  })

  // the API Structure tests are not expected to be seen in projects ⚠️
  // They are just here to make sure that you respect the structure  ⚠️
  // defined in the lecture                                          ⚠️
  //  ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

  describe('/', () => {
    test('responds to GET / with status 200', (done) => {
      request(api)
        .get('/')
        .expect(200, done)
    })

    test('responds to GET / with a message and a description', async () => {
      const response = await request(api).get('/')
      expect(response.body.message).toBe('Are you reddy!')
    })
  })

  describe('GET /sharks -- index', () => {
    test('responds to GET /sharks with status 200', (done) => {
      request(api)
        .get('/sharks')
        .expect(200, done)
    })

    test('GET /sharks display 4 elements in the web browser', async () => {
      const response = await request(api).get('/sharks')
      expect(response.body.length).toBe(4)
    })
  })

  describe('GET /sharks/:id -- show', () => {
    test('responds to GET /sharks/1 with status 200', (done) => {
      request(api)
        .get('/sharks/4')
        .expect(200)
        .expect({ id: 4, name: 'date' }, done)
    })

    test('responds to a unknown goat id with a 404', (done) => {
      request(api)
        .get('/sharks/42')
        .expect(404)
        .expect({ error: 'Shark with id 42 not found' }, done);
    });
  })

  describe('POST /shark', () => {
    test('responds to posts /shark with status 201', (done) => {
      const testData = { name: "The shark from jaws" }
      request(api)
        .post('/shark')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ ...testData, id: 5 }, done)
    });

    test('throws a 422 if update unsuccessful', (done) => {
      const testData = { age: 99 }

      request(api)
        .post('/sharks')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(422)
        .expect({ error: 'you need a name to create a shark' }, done)
    });
  })

  describe('PATCH /sharks/:id -- update', () => {
    test('responds to PATCH /sharks/1 with status 200', (done) => {
      const testData = { name: "meh" }

      request(api)
        .patch('/sharks/2')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(200)
        .expect({ ...testData, id: 2 }, done)
    })

    test('422 - if no name in the body', (done) => {
      const testData = { age: 2 }

      request(api)
        .patch('/sharks/2')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(422)
        .expect({ error: 'You need to specify the name' }, done)
    })

    test('404 - cannot update an unexisting shark', (done) => {
      const testData = { name: "joker" }

      request(api)
        .patch('/sharks/7')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(404)
        .expect({ error: 'cannot update missing shark' }, done)
    })
  })

  describe('DELETE', () => {
    test('responds to delete /sharks/:id with status 204', (done) => {
      request(api).delete('/sharks/1').expect(204, done);
    });

    test('responds to with a status 404, if the shark does not exist', (done) => {
      request(api).delete('/sharks/1').expect(204);
      request(api).delete('/sharks/1').expect(404, done);
    });

    test('handles last id', (done) => {
      request(api).delete('/sharks/5').expect(204);
      request(api).delete('/sharks/1').expect(404, done);

    });
  })
})
