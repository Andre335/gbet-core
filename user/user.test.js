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
        "role": "viewer",
        "banned": false
    }

    let calendar = {
        "_id": "5baedf4a16ca765081d6f67f",
        "owner": "5baedf4a16ca765081d6f17f",
        "favourites": []
    }

    let user2 = {
        "_id": "5baedf4a16ca765081d6f47f",
        "firstName": "johnny",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "streammer",
        "banned": false
    }

    let bet1 = {
        "_id": "5baedf4a16ca765081d6f37f",
        "live": "5baedf4a16ca765081d6f27f",
        "owner": "5baedf4a16ca765081d6f17f",
        "value": 5
    }

    let complaint = {
        "_id": "5baedf4a16ca765081d6f57f",
        "author": "5baedf4a16ca765081d6f17f",
        "accused": "5baedf4a16ca765081d6f47f",
        "title": "tit",
        "description": "desc"
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

    let modifications = {
        "lastName": "Modified"
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

    it('Test create valid accused', (done) => {
        request(app)
            .post('/user/')
            .send(user2)
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

    it('Test update user', (done) => {
        request(app)
            .put('/user/5baedf4a16ca765081d6f17f')
            .send(modifications)
            .expect(202)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body.lastName).equals('Modified');
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

    it('Test get calendar by owner without calendar', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/calendar')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get complaints by author without complaints', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/complaints/author')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get complaints by accused without complaints', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f47f/complaints/accused')
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get bets by owner without bets', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/bets')
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

    it('Test register calendar', (done) => {
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

    it('Test register bet', (done) => {
        request(app)
            .post('/bet')
            .send(bet1)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('owner');
                expect(res.body.owner).equals('5baedf4a16ca765081d6f17f');
                expect(res.body).to.have.property('live');
                expect(res.body).to.have.property('value');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test register complaint', (done) => {
        request(app)
            .post('/complaint')
            .send(complaint)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.have.property('author');
                expect(res.body.author).equals('5baedf4a16ca765081d6f17f');
                expect(res.body).to.have.property('accused');
                expect(res.body.accused).equals('5baedf4a16ca765081d6f47f');
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

    it('Test get calendar by owner with calendar', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/calendar')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0].owner).equals('5baedf4a16ca765081d6f17f');
                expect(res.body[0]).to.have.property('favourites');
                expect(res.body[0].favourites).to.be.an('array');
                expect(res.body[0].favourites).to.have.lengthOf(0);
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get bets by owner with bets', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/bets')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('owner');
                expect(res.body[0].owner).equals('5baedf4a16ca765081d6f17f');
                expect(res.body[0]).to.have.property('live');
                expect(res.body[0]).to.have.property('value');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get complaints by author with complaints', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f17f/complaints/author')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('author');
                expect(res.body[0].author).equals('5baedf4a16ca765081d6f17f');
                expect(res.body[0]).to.have.property('accused');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test get complaints by accused with complaints', (done) => {
        request(app)
            .get('/user/5baedf4a16ca765081d6f47f/complaints/accused')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('author');
                expect(res.body[0].author).equals('5baedf4a16ca765081d6f17f');
                expect(res.body[0]).to.have.property('accused');
                expect(res.body[0].accused).equals('5baedf4a16ca765081d6f47f');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test DeleteById with existing id', (done) => {
        request(app)
            .delete('/user/5baedf4a16ca765081d6f47f')
            .expect(202)
            .then((res) => {
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

    it('Test bet DeleteById with existing id', (done) => {
        request(app)
            .delete('/bet/5baedf4a16ca765081d6f37f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);

    it('Test complaint DeleteById with existing id', (done) => {
        request(app)
            .delete('/complaint/5baedf4a16ca765081d6f57f')
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

    it('Test calendar DeleteById with existing id', (done) => {
        request(app)
            .delete('/calendar/5baedf4a16ca765081d6f67f')
            .expect(202)
            .then((res) => {
                done();
            })
            .catch(done);
    }).timeout(0);
});