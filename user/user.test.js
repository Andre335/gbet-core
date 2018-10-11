var request = require('supertest');
var chai = require('chai');
ObjectID = require('mongodb').ObjectID;
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const userServer = require('./user.server');
const betServer = require('../bet/bet.server');
const complaintServer = require('../complaint/complaint.server');
const liveServer = require('../live/live.server');
const calendarServer = require('../calendar/calendar.server');
const app = require('../app');

describe('Tests for /user route', () => {
    let userauth = {
        "_id": "5baedf4a16ca765081d6f17d",
        "firstName": "john",
        "lastName": "doe",
        "email": "john@doe1.com",
        "role": "admin",
        "banned": false,
        "password": "haha12346"
    }

    chai.use(chaiHttp);

    const authUser = chai.request.agent(app);

    before(async () => {
        userAuth = await userServer.create(userauth);
        const authRes = await authUser.post('/auth/login').send({ email: 'john@doe1.com', password: 'haha12346' });
        expect(authRes).to.have.cookie('access_token');
        authRes.should.have.status(200);
    });

    after(async () => {
        await userServer.drop();
        await liveServer.drop();
        await betServer.drop();
        await complaintServer.drop();
        await calendarServer.drop(); 
        await authUser.close();
    });

    it('Test findOne with no users', (done) => {
        authUser.get('/user/' + new ObjectID())
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    let user1 = {
        "_id": "5baedf4a16ca765081d6f17f",
        "firstName": "john",
        "lastName": "doe",
        "email": "john@doe.com",
        "role": "viewer",
        "banned": false,
        "password": "1234567"
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
        "banned": false,
        "password": "1234568"
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
        authUser.post('/user/')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('email');
                res.body.should.have.property('role');
                res.body.should.have.property('banned');
                done();
            });
    });

    it('Test create valid accused', (done) => {
        authUser.post('/user/')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('email');
                res.body.should.have.property('role');
                res.body.should.have.property('banned');
                done();
            });
    });

    it('Test update user', (done) => {
        authUser.put('/user/5baedf4a16ca765081d6f17f')
            .send(modifications)
            .end((err, res) => {
                res.should.have.status(202);
                res.should.be.json;
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('email');
                res.body.should.have.property('role');
                res.body.should.have.property('banned');
                done();
            });
    });

    it('Test get lives by owner without lives', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/lives')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('Test get calendar by owner without calendar', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/calendar')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('Test get complaints by author without complaints', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/complaints/author')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('Test get complaints by accused without complaints', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f47f/complaints/accused')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

    it('Test get bets by owner without bets', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/bets')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });

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
        authUser.get('/user/5baedf4a16ca765081d6f17f/lives')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.have.property('owner');
                res.body[0].owner.should.equal('5baedf4a16ca765081d6f17f');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('description');
                done();
            });
    });

    it('Test get calendar by owner with calendar', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/calendar')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body[0].should.have.property('owner');
                res.body[0].owner.should.equal('5baedf4a16ca765081d6f17f');
                res.body[0].should.have.property('favourites');
                done();
            });
    });

    it('Test get bets by owner with bets', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/bets')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body[0].should.have.property('owner');
                res.body[0].owner.should.equal('5baedf4a16ca765081d6f17f');
                res.body[0].should.have.property('live');
                res.body[0].should.have.property('value');
                done();
            });
    });

    it('Test get complaints by author with complaints', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f/complaints/author')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body[0].should.have.property('author');
                res.body[0].author.should.equal('5baedf4a16ca765081d6f17f');
                res.body[0].should.have.property('accused');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('description');
                done();
            });
    });

    it('Test get complaints by accused with complaints', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f47f/complaints/accused')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body[0].should.have.property('author');
                res.body[0].author.should.equal('5baedf4a16ca765081d6f17f');
                res.body[0].should.have.property('accused');
                res.body[0].accused.should.equal('5baedf4a16ca765081d6f47f');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('description');
                done();
            });
    });

    it('Test DeleteById with existing id', (done) => {
        authUser.delete('/user/5baedf4a16ca765081d6f47f')
            .end((err, res) => {
                res.should.have.status(202);
                done();
            });
    });

    it('Test findOne with user', (done) => {
        authUser.get('/user/5baedf4a16ca765081d6f17f')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('email');
                res.body.should.have.property('role');
                res.body.should.have.property('banned');
                done();
            });
    });

    it('Test create invalid user', (done) => {
        authUser.post('/user/')
            .send(invaliduser)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    it('Test findAll with user', (done) => {
        authUser.get('/user')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('firstName');
                res.body[0].should.have.property('lastName');
                res.body[0].should.have.property('email');
                res.body[0].should.have.property('role');
                res.body[0].should.have.property('banned');
                done();
            });
    });

    it('Test DeleteById with not existing id', (done) => {
        authUser.delete('/user/1')
        .end((err, res) => {
            res.should.have.status(500);
            done();
        });
    });

    it('Test DeleteById with existing id', (done) => {
        authUser.delete('/user/5baedf4a16ca765081d6f17f')
        .end((err, res) => {
            res.should.have.status(202);
            done();
        });
    });
});