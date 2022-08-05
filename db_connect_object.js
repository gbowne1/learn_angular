var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
var client = new MongoClient(new Server('localhost', 27017), {
    socketOptions: { connectTimeoutMS: 500, },
    poolsize: 5,
    auto_reconnect: true
}, {
    numberOfRetries: 3,
    retryMilliseconds: 500
});
client.open(function (err, client) {
    if (err) {
        console.log("Connection Failed Via Client Object.");
    } else {
        var db = client.db("testDB");
        if (db) {
            console.log("Connected Via Client Object . . .");
            db.authenticate("dbadmin", "test", function (err, results) {
                if (err) {
                    console.log("Authentication Failed . . .");
                    client.close();
                    console.log("Connection closed . . .");
                } else {
                    console.log("Authenticated Via Client Object . . . ");
                    db.logout(function (err, result) {
                        if (!err) {
                            console.log("Logged out Via Client Object . . .");
                        }
                        client.close();
                        console.log("Connection closed . . .");
                    });
                }
            });
        }
    }
});