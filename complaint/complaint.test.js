var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
var expect = chai.expect;
const app = require('../app');

describe('Tests for /complaint route', () => {
    it('Test findAll with no complaints', (done) => {
        request(app)
            .get('/complaint')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with no complaints', (done) => {
        request(app)
            .get('/complaint/' + new ObjectID())
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    let author = {
        "_id": "5baedf4a16ca765081d6f17f",
        "firstName": "john",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "viewer",
        "banned": false
    }

    let accused = {
        "_id": "5baedf4a16ca765081d6f27f",
        "firstName": "johnny",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "streammer",
        "banned": false
    }

    let complaint = {
        "_id": "5baedf4a16ca765081d6f37f",
        "author": "5baedf4a16ca765081d6f17f",
        "accused": "5baedf4a16ca765081d6f27f",
        "title": "complaint title",
        "description": "complaint desc"
    }

    let invalidcomp = {
        "_id": "5baedf4a16ca765081d6f37f",
        "author": "5baedf4a16ca765081d6f17f",
        "accused": "5baedf4a16ca765081d6f27f"
    }

    let modifications = {
        "title": "Modified",
        "description": "Modified"
    }

    it('Test create valid complaint without author', (done) => {
        request(app)
            .post('/complaint/')
            .send(complaint)
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test create valid author', (done) => {
        request(app)
            .post('/user/')
            .send(author)
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

    it('Test create valid complaint without accused', (done) => {
        request(app)
            .post('/complaint/')
            .send(complaint)
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test create valid accused', (done) => {
        request(app)
            .post('/user/')
            .send(accused)
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

    it('Test create invalid complaint', (done) => {
        request(app)
            .post('/complaint/')
            .send(invalidcomp)
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test create valid complaint with author and accused', (done) => {
        request(app)
            .post('/complaint/')
            .send(complaint)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('author');
                expect(res.body).to.have.property('accused');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with success', (done) => {
        request(app)
            .get('/complaint/5baedf4a16ca765081d6f37f')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('author');
                expect(res.body).to.have.property('accused');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findAll with live', (done) => {
        request(app)
            .get('/complaint')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('author');
                expect(res.body[0]).to.have.property('accused');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test update live', (done) => {
        request(app)
            .put('/complaint/5baedf4a16ca765081d6f37f')
            .send(modifications)
            .expect(202)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('author');
                expect(res.body).to.have.property('accused');
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
            .delete('/complaint/1')
            .expect(500)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test author DeleteById with existing id', (done) => {
        request(app)
            .delete('/user/5baedf4a16ca765081d6f17f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test accused DeleteById with existing id', (done) => {
        request(app)
            .delete('/user/5baedf4a16ca765081d6f27f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/complaint/5baedf4a16ca765081d6f37f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

});