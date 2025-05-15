const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true }); // allow all origins, you can customize origin here

admin.initializeApp();
const rtdb = admin.database();

exports.registerUser = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send("Method Not Allowed");
        }

        const { username, email, password, confirmPassword, matricNumber } = req.body;

        if (!username || !email || !password || !confirmPassword || !matricNumber) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: username,
            });

            await rtdb.ref(`users/${userRecord.uid}`).set({
                username,
                email,
                matricNumber,
                createdAt: Date.now(),
            });

            return res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
});
