var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
var expect = chai.expect;
const app = require('../app');

describe('Tests for /bet route', () => {
    it('Test findAll with no Bets', (done) => {
        request(app)
            .get('/bet')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with no Bets', (done) => {
        request(app)
            .get('/bet/' + new ObjectID())
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    let live1 = {
        "_id": "5baedf4a16ca765081d6f27f",
        "owner": "5baedf4a16ca765081d6f17f",
        "title": "live title",
        "description": "live descriptions"
    }

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

    let user1 = {
        "_id": "5baedf4a16ca765081d6f17f",
        "firstName": "john",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "streammer",
        "banned": false,
        "password": "1234567"
    }

    let modifications = {
        "value": 10
    }

    it('Test create valid bet without owner and live', (done) => {
        request(app)
            .post('/bet/')
            .send(bet1)
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test create valid user', (done) => {
        request(app)
            .post('/user/')
            .send(user1)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('role');
                expect(res.body).to.have.property('banned');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test create valid bet without live', (done) => {
        request(app)
            .post('/bet/')
            .send(bet1)
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

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
    }).timeout(0);

    it('Test create invalid bet', (done) => {
        request(app)
            .post('/bet/')
            .send(betinv)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

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
    }).timeout(0);

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
    }).timeout(0);

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
    }).timeout(0);

    it('Test DeleteById with not existing id', (done) => {
        request(app)
            .delete('/bet/1')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/bet/5baedf4a16ca765081d6f37f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test user DeleteById with existing id', (done) => {
        request(app)
            .delete('/user/5baedf4a16ca765081d6f17f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test live DeleteById with existing id', (done) => {
        request(app)
            .delete('/live/5baedf4a16ca765081d6f27f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);
});