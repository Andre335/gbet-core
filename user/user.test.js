var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
const app = require('../app');
const User = require('./user.model');

describe('GET /user', () => {
    const newUser = new User({
        firstName: "John",
        lastName: "Doe",
        role: "streammer",
        email: "john@doe.com",
        banned: false
    });

    it('Respond with empty json array', (done) => {
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
    });

    it('Respond with json user object', (done) => {
        request(app)
            .post('/user').send(newUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('json');
                done();
            })
            .catch(done);
    });

    it('Respond with user json', (done) => {
        request(app)
            .delete('/user/' + newUser._id)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('json');
                expect(res.body).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    });
});