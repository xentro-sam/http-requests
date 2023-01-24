const http = require('http')
const PORT = 3000

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    let url = req.url

    console.log('Hello world')

    if(url === '/') {
        res.write('Hello world')
    }
    res.end()
})
.listen(PORT, () => {
    console.log("Listening at PORT", PORT)
})