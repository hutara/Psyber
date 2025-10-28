const WebSocket         = require( 'ws' ),
      fs                = require( 'fs' ),
      cors              = require( 'cors' ),
      https             = require( 'https' ),
      utils             = require( 'y-websocket/bin/utils.js' ),
      express           = require( 'express' ),
      app               = express(),
      setupWSConnection = utils.setupWSConnection,
      host              = process.env.HOST || '127.0.0.1'
      production        = process.env.PRODUCTION  != null,
      port              = process.env.SERVER_PORT || 1234

require( 'dotenv' ).config()

app.use( cors() )

const options = {
  key: fs.readFileSync('/etc/nginx/ssl-certificates/<your-domain>.key'),
  cert: fs.readFileSync('/etc/nginx/ssl-certificates/<your-domain>.crt')
};

const server = https.createServer(options, app => {
  response.writeHead(200, {'Access-Control-Allow-Origin': '<your-domain>',})
})

app.use( express.static( './', {
  setHeaders: function(res, path) {
    res.set("Access-Control-Allow-Origin", "<your-domain>")
    res.set("Cross-Origin-Embedder-Policy", "require-corp")
    res.set("Cross-Origin-Opener-Policy", "same-origin")
    res.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
    res.set("Content-Security-Policy", "default-src 'self'")
  }
}) )

app.use( function(req,res,next) {
  fs.readdir( __dirname + req.url, function(err,files) {
    res.json( files )
    next()
  })
})

const wss = new WebSocket.Server({ server:app })

wss.on('error', (conn, req) => {
 console.log('error in conn')
})

wss.on('close',(con, req) => {
 console.log('closed conn')
})

wss.on('connection', (conn, req) => {
 if (req.headers.origin != '<your-domain>'){
        console.log('not allowed')
        return
 }
 setupWSConnection(conn, req, { gc: true })
 console.log( 'new connection' )
})

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, /** @param {any} ws */ ws => {
    wss.emit('connection', ws, request)
  })
})

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`)
})