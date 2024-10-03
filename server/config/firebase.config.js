import * as dotenv from 'dotenv';
dotenv.config();

export default {
    firebaseConfig: {
        apiKey: process.env.API_KEY || "AIzaSyCmRHyzpVgWo0EruwoWsS_YW325AXqx_Uc",
        authDomain: process.env.AUTH_DOMAIN || "elimutec-app.firebaseapp.com",
        projectId: process.env.PROJECT_ID || "elimutec-app",
        databaseURL: process.env.FIRESTORE_DB_URL || "gs://elimutec-app.appspot.com",
        storageBucket: process.env.STORAGE_BUCKET || "elimutec-app.appspot.com",
        messagingSenderId: process.env.MESSAGING_SENDER_ID || "343617839554",
        appId: process.env.APP_ID || "1:343617839554:web:4039e2e5cb8220c94c765b",
        measurementId: process.env.MEASUREMENT_ID || "G-M1K81TFWF6",
    },
};
