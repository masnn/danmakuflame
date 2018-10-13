var net = require('net')
var server = net.createServer()
var ws = require('nodejs-websocket')
var pv
var trans={
    "1606090937":"780448976",
}
var SOCKS_PORT = 25566
var HTML_PORT = 6666
function inArray(search, array) {
    for (var i in array)
        if (array[i] == search) 
            return true;
    return false;
}
var socket_server = ws.createServer(function (socket) {
    pv=socket
    console.log('Connected')
    socket.on("text", function (dat) {
        console.log("Received" + dat)
    })
    socket.on("close", function (code, reason) {
        console.log("connection closed")
        pv=null
    })
    socket.on("error", function (err) {
        console.log("handle err")
        console.log(err)
        pv=null
    })
}).listen(SOCKS_PORT)
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/*', function (req, res) {
    var tmp=req.body;
    if (typeof tmp.group_id!=undefined)
        if (typeof trans[tmp.group_id]!=undefined)
            tmp.group_id=trans[tmp.group_id]
    pv.send(JSON.stringify(tmp))
    console.log(req.body);
    res.send("recv")
})
var html_server = app.listen(HTML_PORT, function () {
    console.log("Server started at: http://localhost:%s", HTML_PORT)
})