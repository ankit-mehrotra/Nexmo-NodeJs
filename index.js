const express = require('express');
const Nexmo = require('nexmo');
const ejs = require('ejs');
const socketio = require('socket.io');

const PORT = 3000;
const app = express();
app.set('view engine', "ejs");
app.engine('html', ejs.renderFile);
app.use(express.json());

app.use(express.static(__dirname+ '/public'));

const nexmo = new Nexmo({
    apiKey: '280d2429',
    apiSecret: 'SwrXUMA1uzQjpgzk',
},{debug: true})

app.get('/', (req,res) => {
    res.render('index1');
})

app.post('/', (req,res) => {
    const {number,text} = req.body;
    console.log(number,text);
    nexmo.message.sendSms('919900559548',number, text, {type: 'unicode'}, (err,responseData) => {
        if(err) {
            console.log(err)
        } else {
            console.dir("Send",responseData);
            const data = {
                id: responseData.messages[0]['message-id'],
                number: responseData.messages[0]['to']
            }
            io.emit('smsdata', data);
        } 
    })
})
const server = app.listen(PORT, () => {
    console.log('Server started');
});

const io = socketio(server);

io.on('connection', () => {
    console.log('connected');
    io.on('disconnect', () => {
        console.log('disconnected');
    })
})