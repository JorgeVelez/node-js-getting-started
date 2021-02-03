const app = require('express')();
const http = require('http').Server(app),
url = require('url'),
fs   = require('fs'),
filePath = 'audio.mp3',
stat = fs.statSync(filePath);

app.get('/', (request, response) => {
    var queryData = url.parse(request.url, true).query;
    const skip = typeof (queryData.skip) == 'undefined' ? 0 : queryData.skip;
    console.log("stat "+stat.size);
    const startByte = Math.floor(stat.size * skip);

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size - startByte
    });

    // We replaced all the event handlers with a simple call to util.pump()
    fs.createReadStream(filePath, { start: startByte }).pipe(response);
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});

