const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTIONS_STRING); // remeber to insert the connection string
        console.log('Database connected....',
            connect.connection.host,
            connect.connection.port,
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

};

module.exports = connectDb;