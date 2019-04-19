require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');

describe('movie route tests', () => {
  //create studio and send to mongodb?
  //create actor and send to mongodb?
  
  it('creates a movie', () => {
    return request(app)
      .post('/movies')
      .send({
        title: 'An Affair To Forget',
        studio: 
      })
  })
})
