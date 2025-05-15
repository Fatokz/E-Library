const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
});
