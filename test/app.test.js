const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const chai = require('chai');

chai.use(require("chai-sorted"));

describe('GET /apps endpoint', () => {
  it('should return a 400 if sort is incorrect', () => {
    return request(app)
      .get('/apps')
      .query({sort:'Wrong'})
      .expect(400)
  })

  it('should return a 400 if genre is incorrect', () => {
    return request(app)
      .get('/apps')
      .query({genre:'Wrong'})
      .expect(400)
  })

  it('should sort by Rating', () => {
    return request(app)
      .get('/apps')
      .query({sort:'Rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0].Rating).to.be.at.least(res.body[1].Rating);
      })
  })

  it('should sort by App', () => {
    return request(app)
      .get('/apps')
      .query({sort:'App'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.sortedBy("App", {descending: true})
      })
  })

  it('should filter by Genre', () => {
    const genreArr = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    const genre = genreArr[Math.floor(Math.random()*genreArr.length)]
    return request(app)
      .get('/apps')
      .query({genre: genre})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0].Genres).to.equal(genre)
      })
  })
})