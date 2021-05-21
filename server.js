const io = require("socket.io")();

const PORT = process.env.PORT || 3000;

const users = {};

io.on("connection", (socket) => {
	console.log("New Connection: " + socket.id);
    socket.on('new user', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("message", `${name} joined the chat.`)
    });

    socket.on('message', (text) => {
        socket.broadcast.emit("message", `${users[socket.id]}> ${text}`);
    });
});

io.listen(PORT);
