const express = require("./config/express.js"),
    mongoose = require("mongoose");

const app = express.init();
const server = require("http").createServer(app);

server.listen(3000, () => {
    console.log('Server started on port 3000');
});

/** Connect MongoDB from Node.js application */
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://flagtick:YvwSHeSJL0rVYpJN@cluster0.rlpe6rz.mongodb.net/chatbox?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const connection = mongoose.connection;

connection.once("open", () => {

    const messageCollectionStream = connection.collection("messages").watch();
    messageCollectionStream.on("change", (change) => {
        switch (change.operationType) {
          case "insert":
            console.log(change.operationType);
            break;
          case "delete":
            break;
        }
    });

});

