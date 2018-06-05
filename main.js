const express = require('express')
const bodyParser = require('body-parser')
const handler = require('./message-handler.js')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/reallocate', (req, res) => {
    res.render('reallocations')
})

app.get('/delete', (req, res) => {
    res.render('delete')
})

app.post('/', async (req, res) => {
    let ids = await handler.newJobs(req.body.workType, req.body.tmUsernames, req.body.numberOfJobs, req.body.locality, req.body.world, req.body.serverURL, req.body.instance, req.body.isSecure, req.body.authUsername, req.body.authPassword)
    res.send(ids)
})

app.post('/reallocate', async (req, res) => {
    let ids = await handler.reallocations(req.body.tmJobIds, req.body.allocatedUsername, req.body.serverURL, req.body.instance, req.body.isSecure, req.body.authUsername, req.body.authPassword)
    res.send(ids)
})

app.post('/delete', async (req, res) => {
    let ids = await handler.deletions(req.body.tmJobIds, req.body.serverURL, req.body.instance, req.body.isSecure, req.body.authUsername, req.body.authPassword)
    res.send(ids)
})

app.listen(3000, () => {
    console.log('FWMT Message Sender Started on port 3000')
})