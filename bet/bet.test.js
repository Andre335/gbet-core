var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
var expect = chai.expect;
const betServer = require('./bet.server');
const liveServer = require('../live/live.server');
const app = require('../app');

describe('Tests for /bet route', () => {
    after(async () => {
        await betServer.drop();
    });

    it('Test findAll with no Bets', (done) => {
        request(app)
            .get('/bet')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test findOne with no Bets', (done) => {
        request(app)
            .get('/bet/' + new ObjectID())
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    bet1 = {
        "_id": "5baedf4a16ca765081d6f37f",
        "owner": "5baedf4a16ca765081d6f17f",
        "live": "5baedf4a16ca765081d6f27f",
        "value": 7
    }

    let betinv = {
        "owner": "5baedf4a16ca765081d6f17f",
        "live": "5baedf4a16ca765081d6f27f"
    }

    let modifications = {
        "value": 10
    }

    it('Test create valid bet with owner and live', (done) => {
        request(app)
            .post('/bet/')
            .send(bet1)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('value');
                expect(res.body).to.have.property('live');
                done();
            })
            .catch(done);
    });

    it('Test create invalid bet', (done) => {
        request(app)
            .post('/bet/')
            .send(betinv)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test findOne with success', (done) => {
        request(app)
            .get('/bet/5baedf4a16ca765081d6f37f')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('live');
                expect(res.body).to.have.property('value');
                done();
            })
            .catch(done);
    });

    it('Test findAll with live and owner', (done) => {
        request(app)
            .get('/bet')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0]).to.have.property('live');
                expect(res.body[0]).to.have.property('value');
                done();
            })
            .catch(done);
    });

    it('Test update bet', (done) => {
        request(app)
            .put('/bet/5baedf4a16ca765081d6f37f')
            .send(modifications)
            .expect(202)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('live');
                expect(res.body).to.have.property('value');
                expect(res.body.value).equals(10);
                done();
            })
            .catch(done);
    });

    it('Test DeleteById with not existing id', (done) => {
        request(app)
            .delete('/bet/1')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/bet/5baedf4a16ca765081d6f37f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    });
});