import * as mocha from 'mocha'
import { expect } from 'chai';
import app from '../src/app';
import * as colors from 'colors';

Object.keys(colors);

const port: number = process.env.PORT || 5555
let server: any

describe('Outlook Auth Module', function() {

    before(function(done: (err?: any) => any) {
        console.log('Starting the server for test suite'.green)
        server = app.listen(port, () => {
            console.log(`Listening on port ${port}`),
            done()
        })
    });

    // require('./welcome.spec');
    require('./outlook.spec');

    after(function(done: (err?: any) => any) {
        server.close()
        console.log('Graceful shutdown of app after testing'.green)
        done()
    });
});