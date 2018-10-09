var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
var expect = chai.expect;
const app = require('../app');

describe('Tests for /calendar route', () => {
    it('Test findAll with no calendars', (done) => {
        request(app)
            .get('/live')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with no calendars', (done) => {
        request(app)
            .get('/live/' + new ObjectID())
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    let user1 = {
        "_id": "5baedf4a16ca765081d6f17f",
        "firstName": "john",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "streammer",
        "banned": false,
        "password": "1234567"
    }

    let calendar = {
        "_id": "5baedf4a16ca765081d6f27f",
        "owner": "5baedf4a16ca765081d6f17f",
        "favourites": []
    }

    let invalidcal = {
        "owner": "5baedf4a16ca765081d6f17f"
    }

    let modifications = {
        "favourites": ["5baedf4a16ca765081d6f37f"]
    }

    it('Test create valid calendar without owner', (done) => {
        request(app)
            .post('/calendar/')
            .send(calendar)
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test register user', (done) => {
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

    it('Test create invalid calendar', (done) => {
        request(app)
            .post('/calendar/')
            .send(invalidcal)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test create valid calendar with owner', (done) => {
        request(app)
            .post('/calendar/')
            .send(calendar)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('favourites');
                expect(res.body.favourites).to.be.an('array');
                expect(res.body.favourites).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with success', (done) => {
        request(app)
            .get('/calendar/5baedf4a16ca765081d6f27f')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('favourites');
                expect(res.body.favourites).to.be.an('array');
                expect(res.body.favourites).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findAll with calendar', (done) => {
        request(app)
            .get('/calendar')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0]).to.have.property('favourites');
                expect(res.body[0].favourites).to.be.an('array');
                expect(res.body[0].favourites).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test update calendar', (done) => {
        request(app)
            .put('/calendar/5baedf4a16ca765081d6f27f')
            .send(modifications)
            .expect(202)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body).to.have.property('favourites');
                expect(res.body.favourites).to.be.an('array');
                expect(res.body.favourites).to.have.lengthOf(1);
                expect(res.body.favourites[0]).equals("5baedf4a16ca765081d6f37f");
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

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/calendar/5baedf4a16ca765081d6f27f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

});