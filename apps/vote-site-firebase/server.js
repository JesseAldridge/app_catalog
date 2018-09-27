var admin = require("firebase-admin");

var serviceAccount = require("./secrets/vote-site-fc0ad-firebase-adminsdk-8ij3z-b93b0f328c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vote-site-fc0ad.firebaseio.com"
});

admin.database().ref('/').set({
    username: "test",
    email: "test@mail.com"
});
