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
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test findOne with no users', (done) => {
        request(app)
            .get('/user/' + new ObjectID())
            .expect(404)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    }).timeout(0);

    let user1 = {
        "firstName": "john",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "streammer",
        "banned": false
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
            .then((res) => {
                expect(res.body).to.have.property('_id');
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
});