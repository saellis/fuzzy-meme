//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


let sample = require('../model/pg');

chai.use(chaiHttp);

describe('Server', () => {
  it('should do something', (done) => {
    sample.run();
    done();
  });
});
