const config = require('dotenv').config

config()

const app = require('./dist/app').default

const port = process.env.PORT || 5555;

app.listen(port, () => console.log(`Listening on port ${port}`));
