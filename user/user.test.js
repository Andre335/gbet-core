var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
var expect = chai.expect;
const app = require('../app');

describe('Tests for /user route', () => {
    it('Test finAll with no Users', (done) => {
        request(app)
            .get('/user')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with no users', (done) => {
        request(app)
            .get('/user/' + new ObjectID())
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
        "banned": false
    }

    let live1 = {
        "_id": "5baedf4a16ca765081d6f27f",
        "owner": "5baedf4a16ca765081d6f17f",
        "title": "live title",
        "description": "live descriptions"
    }

    let invaliduser = {
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "streammer",
        "banned": false
    }

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

    it('Test get lives by owner without lives', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/lives')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test register live', (done) => {
        request(app)
            .post('/live')
            .send(live1)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body.owner).equals('5baedf4a16ca765081d6f17f');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get lives by owner with lives', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/lives')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0].owner).equals('5baedf4a16ca765081d6f17f');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with user', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f')
            .expect(200)
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

    it('Test create invalid user', (done) => {
        request(app)
            .post('/user/')
            .send(invaliduser)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findAll with user', (done) => {
        request(app)
            .get('/user')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('firstName');
                expect(res.body[0]).to.have.property('lastName');
                expect(res.body[0]).to.have.property('email');
                expect(res.body[0]).to.have.property('role');
                expect(res.body[0]).to.have.property('banned');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with not existing id', (done) => {
        request(app)
            .delete('/user/1')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test Live DeleteById with existing id', (done) => {
        request(app)
            .delete('/live/5baedf4a16ca765081d6f27f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/user/5baedf4a16ca765081d6f17f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);
});