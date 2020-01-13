module.exports = {
  apiKey: "AIzaSyByZIR_CHY_AYSfRnE0WSXrWidSstNSB7I",
  authDomain: "open-podcast-297f3.firebaseapp.com",
  databaseURL: "https://open-podcast-297f3.firebaseio.com",
  projectId: "open-podcast-297f3",
  storageBucket: "open-podcast-297f3.appspot.com",
  messagingSenderId: "554969049558",
  appId: "1:554969049558:web:ff5698504b85c8a2a0dc77"
};
/*
firebase.initializeApp(config);
export const auth = firebase.auth();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();

const FBAuth = require('./util/FBAuth');

const {
  getAllUpdates,
  postOneUpdate
} = require('./handlers/updates');
const {
  signup,
  login,
  uploadImage,
  addUserDetails
} = require('./handlers/users');

app.get('/Updates', getAllUpdates);
app.post('/Updates', FBAuth, postOneUpdate);

app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);

exports.api = functions.https.onRequest(app);
*/