const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const port = process.env.PORT;


const messages = [
    {
        text: 'hi there',
        user: 'Amondo',
        added: new Date(),
        messageID: 1
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date(),
        messageID: 2
    }
    ]

let messageID = 3;

app.use(express.urlencoded({ extended: true }));

//generating views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//routing
app.get('/', (req, res) => {
    res.render('index', {title: 'Mini Message Board', messages: messages})
})
app.get('/new', (req, res) => {
    res.render('form')
})
app.get('/:user/:messageID', (req, res) => {
    const messageID = parseInt(req.params.messageID);
    let foundMessage = messages.find((message) => {
        return message.messageID === messageID
    })
    res.render('userMessage', {message: foundMessage})
})

//post requests
app.post('/new', (req,res) => {
    const author = req.body.author_name;
    const message = req.body.author_message;
    const date = new Date();
    
    const messageObj = {text: message, user: author, added: date, messageID: messageID}
    messages.push(messageObj);
    messageID++;
    console.log(messageID);
    res.redirect('/')
})
app.get('*', (req, res) => {
    res.send('404 Error')
})


//listening
app.listen(4002, (err) => {
    if (err) throw err;
    console.log(`Listening on port 4002`)
})