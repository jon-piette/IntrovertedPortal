const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('../client/src/utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('../client/src/utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('./config/mongoose.config');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chatter Bot';

require('./routes/blogs.routes')(app);
require('./routes/author.routes')(app);

io.on('connection', socket => {
    socket.on('joinRoom', ({ firstName, room }) => {
        const user = userJoin(socket.id, firstName, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to the Introverted Chatter'));

        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.firstName} has joined the chat!!`)
            );

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.firstName, msg));
    });

    socket.on('disconnect', () =>{
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.firstName} has left the chat`)
            );

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));