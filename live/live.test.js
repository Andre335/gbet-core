var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
var expect = chai.expect;
const betServer = require('../bet/bet.server');
const liveServer = require('./live.server');
const app = require('../app');

describe('Tests for /live route', () => {
    after(async () => {
        await liveServer.drop();
        await betServer.drop();
    });

    it('Test findAll with no Lives', (done) => {
        request(app)
            .get('/live')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test findOne with no Lives', (done) => {
        request(app)
            .get('/live/' + new ObjectID())
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    let live1 = {
        "_id": "5baedf4a16ca765081d6f27f",
        "owner": "5baedf4a16ca765081d6f17f",
        "title": "live title",
        "description": "live descriptions"
    }

    let liveinv = {
        "owner": "5baedf4a16ca765081d6f17f",
    }

    let modifications = {
        "title": "Modified",
        "description": "Modified"
    }

    let bet1 = {
        "_id": "5baedf4a16ca765081d6f37f",
        "live": "5baedf4a16ca765081d6f27f",
        "owner": "5baedf4a16ca765081d6f17f",
        "value": 5
    }
    
    it('Test create invalid live', (done) => {
        request(app)
            .post('/live/')
            .send(liveinv)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('Test create valid live with owner', (done) => {
        request(app)
            .post('/live/')
            .send(live1)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get bets by live without bets', (done) => {
        request(app)
            .get('/live/5baedf4a16ca765081d6f27f/bets')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test register bet', (done) => {
        request(app)
            .post('/bet')
            .send(bet1)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('live');
                expect(res.body.live).equals('5baedf4a16ca765081d6f27f');
                expect(res.body).to.have.property('value');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get bets by live with bets', (done) => {
        request(app)
            .get('/live/5baedf4a16ca765081d6f27f/bets')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0]).to.have.property('live');
                expect(res.body[0].live).equals('5baedf4a16ca765081d6f27f');
                expect(res.body[0]).to.have.property('value');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with success', (done) => {
        request(app)
            .get('/live/5baedf4a16ca765081d6f27f')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findAll with live', (done) => {
        request(app)
            .get('/live')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test update live', (done) => {
        request(app)
            .put('/live/5baedf4a16ca765081d6f27f')
            .send(modifications)
            .expect(202)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('title');
                expect(res.body.title).equals('Modified');
                expect(res.body).to.have.property('description');
                expect(res.body.description).equals('Modified');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with not existing id', (done) => {
        request(app)
            .delete('/live/1')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/live/5baedf4a16ca765081d6f27f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

});