const express = require('express')
const bodyParser = require('body-parser')
const handler = require('./message-handler.js')
const config = require('./data/config.json')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', config)
})

app.get('/reallocate', (req, res) => {
    res.render('reallocations', config)
})

app.get('/delete', (req, res) => {
    res.render('delete', config)
})

app.post('/', async (req, res) => {
    res.send(await handler.newJobs(req.body.workType, req.body.tmUsernames, req.body.numberOfJobs, req.body.locality, req.body.world, req.body.serverURL, req.body.instance, req.body.isSecure, req.body.authUsername, req.body.authPassword))
})

app.post('/reallocate', async (req, res) => {
    res.send(await handler.reallocations(req.body.tmJobIds, req.body.allocatedUsername, req.body.serverURL, req.body.instance, req.body.isSecure, req.body.authUsername, req.body.authPassword))
})

app.post('/delete', async (req, res) => {
    res.send(await handler.deletions(req.body.tmJobIds, req.body.serverURL, req.body.instance, req.body.isSecure, req.body.authUsername, req.body.authPassword))
})

app.listen(8080, () => {
    console.log('FWMT Message Sender Started on port 8080')
})