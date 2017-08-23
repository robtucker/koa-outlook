const app = require('./dist/app').default

const port = process.env.PORT || 5555;

if (!module.parent) {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}