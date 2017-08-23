import { expect } from 'chai';
import * as request from 'supertest';

const host = 'http://localhost:5555';

const expected = 'Welcome to the Outlook Auth API'

const validateWelcomeMessage = (res: any) => {
    // console.log('VALIDATE WELCOME MESSAGE', res.text)
    expect(res.text.indexOf(expected) !== -1).to.equal(true)
}

describe('/welcome', function() {
    it('returns a welcome message', function(done: (err?: any) => any) {
        request(host)
            .get('/')
            .expect(200)
            .expect(validateWelcomeMessage)
            .end(done)
    });
});