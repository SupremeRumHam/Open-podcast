const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');

const cors = require('cors');
app.use(cors());

const {
  db
} = require('./util/admin');

const {
  getAllUpdates,
  postOneUpdate,
  getUpdate,
  commentOnUpdate,
  unlikeUpdate,
  likeUpdate,
  deleteUpdate
} = require('./handlers/updates');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
} = require('./handlers/users');

app.get('/Updates', getAllUpdates);
app.post('/Update', FBAuth, postOneUpdate);
app.get('/update/:updatesId', getUpdate);

app.delete('/update/:updatesId', FBAuth, deleteUpdate);
app.get('/update/:updatesId/like', FBAuth, likeUpdate);
app.get('/update/:updatesId/unlike', FBAuth, unlikeUpdate);
app.post('/update/:updatesId/comments', FBAuth, commentOnUpdate);

app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions
  .firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/Updates/${snapshot.data().updatesId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            updatesId: doc.id
          });
        }
      })
      .catch((err) => console.error(err));
  });

exports.deleteNotificationOnUnLike = functions
  .firestore.document('likes/{id}')
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });
exports.createNotificationOnComment = functions
  .firestore.document('comments/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/Updates/${snapshot.data().updatesId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            updatesId: doc.id
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
exports.onUserImageChange = functions
  .firestore.document('/users/{userId}')
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has changed');
      let batch = db.batch();
      return db
        .collection('Updates')
        .where('userHandle', '==', change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const update = db.doc(`/Updates/${doc.id}`);
            batch.update(update, {
              userImage: change.after.data().imageUrl
            });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onUpdateDelete = functions
  .firestore.document('/Updates/{updatesId}')
  .onDelete((snapshot, context) => {
    const updatesId = context.params.updatesId;
    const batch = db.batch();
    return db
      .collection('comments')
      .where('updatesId', '==', updatesId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        })
        return db
          .collection('likes')
          .where('updatesId', '==', updatesId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection('notifications')
          .where('updatesId', '==', updatesId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });