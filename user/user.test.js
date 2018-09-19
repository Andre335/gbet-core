var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
const express = require('express');
const app = express();

describe('GET /user', () => {
    it('Respond with empty json array', (done) => {
        request(app)
            .get('/user')
            .expect(404)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    });
});