const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const concOne = new Concert({ _id: '607ddf627df9361ba267897d', performer: 'Queen', genre: 'Rock', price: '30', day: '1', image: 'imageQueen'});
    await concOne.save();

    const concTwo = new Concert({ _id: '607ddfd17df9361ba267897e', performer: 'Elvis Presley', genre: 'Rock&Roll', price: '45', day: '2', image: 'imageElvis'});
    await concTwo.save();

    const concThree = new Concert({ _id: '607de01c7df9361ba267897f', performer: 'Eagles', genre: 'Rock', price: '25', day: '2', image: 'imageEagles'});
    await concThree.save();

    const concFour = new Concert({ _id: '607de0617df9361ba2678980', performer: 'Sting', genre: 'Rock', price: '25', day: '3', image: 'imageSting'});
    await concFour.save();
  });

  it('/return all concerts', async () => {
    const res = await request(server).get('/api/concerts');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(4);
  });

  it('/performer/:performer return concerts filtered by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Queen');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/genre/:genre return concerts filtered by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock&Roll');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/price/:price_min/:price_max return concerts filtered by price from min to max', async () => {
    const res = await request(server).get('/api/concerts/price/25/45');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

  it('/price/day/:day return concerts filtered by day', async () => {
    const res = await request(server).get('/api/concerts/day/2');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

  after(async () => {
    await Concert.deleteMany();
  });

});