var admin = require("firebase-admin");

var serviceAccount = require(
  "./secrets/hello-firebase-server-firebase-adminsdk-rd6a5-bd4e2c40c0.json"
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hello-firebase-server.firebaseio.com"
});

admin.database().ref('/').set({
    username: "test",
    email: "test@mail.com"
});
