const initializeApp = require("firebase/app");
const credential = requiere('./credentials.json')

const app = initializeApp(credential);
const firestoreRef = getFirestore(app);

