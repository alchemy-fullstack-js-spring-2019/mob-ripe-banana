const { getMovie } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
const Reviewer = require('../../lib/models/Reviewer');
const Review = require('../../lib/models/Review');

describe('reviews route tests', () => {
  const createReviewer = () => {
    return Reviewer.create({
      
    })
  }  


});


