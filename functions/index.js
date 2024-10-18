/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.truncatePlayerLockDown = onRequest(async (req, res) => {
    try {
        const collectionRef = admin.firestore().collection('player-lock-down');
        const snapshot = await collectionRef.get();

        // Check if there are documents to delete
        if (snapshot.empty) {
            return res.status(200).send('No documents to delete.');
        }

        // Create a batch to delete documents
        const batch = admin.firestore().batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        return res.status(200).send('All documents deleted successfully.');
    } catch (error) {
        console.error('Error deleting documents:', error);
        return res.status(500).send('Error deleting documents.');
    }
});

exports.truncatePlayerCorrectAnswer = onRequest(async (req, res) => {
    try {
        const collectionRef = admin.firestore().collection('player-correct-answer');
        const snapshot = await collectionRef.get();

        // Check if there are documents to delete
        if (snapshot.empty) {
            return res.status(200).send('No documents to delete.');
        }

        // Create a batch to delete documents
        const batch = admin.firestore().batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        return res.status(200).send('All documents deleted successfully.');
    } catch (error) {
        console.error('Error deleting documents:', error);
        return res.status(500).send('Error deleting documents.');
    }
});
