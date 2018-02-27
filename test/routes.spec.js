process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
      })
      .catch(error => {
        throw error;
      });
  });

  it("should return a 404 if the page is not found", () => {
    return chai
      .request(server)
      .get("/sad")
      .then(response => {
        response.should.have.status(404);
      });
  });
});

describe('API Routes', () => {

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      });
  });

  describe('GET api/v1/projects', () => {
    it('should return all the projects', () => {
      return chai.request(server)
        .get('/api/v1/projects')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(30);
          response.res.should.be.a('object');
          response.body[0].should.have.property('title');
          response.body[0].title.should.equal('Black Project');
          response.body[0].should.have.property('description');
          response.body[0].description.should.equal("Really really black, like so black it kills you");
          response.body[0].should.have.property('goal_amount');
          response.body[0].goal_amount.should.equal(50000.0);
          response.body[0].should.have.property('fund_amount');
          response.body[0].fund_amount.should.equal(20000.0);
          
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET api/v1/projects/:id', () => {
    it('should return a single project', () => {
      return chai.request(server)
        .get('/api/v1/projects/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property("title");
          response.body.title.should.equal("Black Project");
          response.body.should.have.property("description");
          response.body.description.should.equal("Really really black, like so black it kills you");
          response.body.should.have.property("goal_amount");
          response.body.goal_amount.should.equal(50000.0);
          response.body.should.have.property("fund_amount");
          response.body.fund_amount.should.equal(20000.0);
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return 404 if a single project is not found', () => {
      return chai.request(server)
        .get('/api/v1/projects/720')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Not Found');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe("GET api/v1/projects/:id/contributors", () => {
    it("should return a single project", () => {
      return chai
        .request(server)
        .get("/api/v1/projects/1")
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a("object");
          response.body.should.have.property("title");
          response.body.title.should.equal("Black Project");
          response.body.should.have.property("description");
          response.body.description.should.equal("Really really black, like so black it kills you");
          response.body.should.have.property("goal_amount");
          response.body.goal_amount.should.equal(50000.0);
          response.body.should.have.property("fund_amount");
          response.body.fund_amount.should.equal(20000.0);
        })
        .catch(error => {
          throw error;
        });
    });

    it("should return 404 if a single project is not found", () => {
      return chai
        .request(server)
        .get("/api/v1/projects/720")
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a("object");
          response.body.error.should.equal("Not Found");
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe("POST api/v1/contributors/projects", () => {
    it("should post a n project", () => {
      return chai
        .request(server)
        .post("/api/v1/contributors/:id/projects")
        .send({ txHash: "54321", amount: "500", to: "1", from: "2" })
        .then(response => {
          response.should.have.status(201);
          response.should.be.a("object");
          response.body.should.have.property("id");
        })
        .catch(error => {
          throw error;
        });
    });

    it("should return a 422 when a required param is missing", () => {
      return chai
        .request(server)
        .post("/api/v1/transactions")
        .send({ txHash: "54321" })
        .then(response => {
          response.should.have.status(422);
        })
        .catch(error => {
          throw error;
        });
    });
  });




});