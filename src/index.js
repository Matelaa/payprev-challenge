const server = require('./server');

server.listen(process.env.PORT || 3333, () => {
    console.log(`Listening on ${process.env.PORT}`)
});