let io;

exports.socketConnection = (server) => {
    console.log("here");
    const corsOptions = {
        origin: "*",
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    };
    io = require('socket.io')(server , {
        cors:corsOptions
    });
    io.on("connection", (socket) => {
        console.log("socket connected", socket.id);
    });
}

exports.newNotification = (data, type) => {
    io.emit("new_notification", {data, type});
}