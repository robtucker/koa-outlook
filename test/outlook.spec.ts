import { expect } from 'chai';
import * as request from 'supertest';

const host = 'http://localhost:5555';

const expected = 'Welcome to the Outlook Auth API'

const validateAuthorizationUrl = (res: any) => {
    console.log('VALIDATE OUTLOOK AUTH', res.body.url)
    expect(res.body.url).to.be.a('string')
}

describe('/authorize', function() {
    it('returns an authorization url', function(done: (err?: any) => any) {
        request(host)
            .get('/authorize')
            .expect(200)
            .expect(validateAuthorizationUrl)
            .end((err, res) => done(err))
    });
});

    // describe('/code', function() {
    //     it('returns an authorization url', function(done: (err?: any) => any) {
    //         request(host)
    //             .get('/authorize')
    //             .expect(200)
    //             .expect(validateWelcomeMessage)
    //             .end(done)
    //     });
    // });
