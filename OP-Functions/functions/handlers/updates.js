const {
  db
} = require('../util/admin');

exports.getAllUpdates = (req, res) => {
  db.collection('Updates')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let Updates = [];
      data.forEach((doc) => {
        Updates.push({
          updatesId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage
        });
      });
      return res.json(Updates);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.code
      });
    });
};

exports.postOneUpdate = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({
      body: 'Body must not be empty'
    });
  }

  const newUpdate = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };

  db.collection('Updates')
    .add(newUpdate)
    .then((doc) => {
      const resUpdate = newUpdate;
      resUpdate.updatesId = doc.id;
      res.json(
        resUpdate
      );
    })
    .catch((err) => {
      res.status(500).json({
        error: 'something went wrong'
      });
      console.error(err);
    });
};


exports.getUpdate = (req, res) => {
  let updateData = {};
  db.doc(`/Updates/${req.params.updatesId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: 'Update not found'
        });
      }
      updateData = doc.data();
      updateData.updatesId = doc.id;
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('updatesId', '==', req.params.updatesId)
        .get();
    })
    .then((data) => {
      updateData.comments = [];
      data.forEach((doc) => {
        updateData.comments.push(doc.data());
      });
      return res.json(updateData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.code
      });
    });
};

exports.commentOnUpdate = (req, res) => {
  if (req.body.body.trim() === '') return res.status(404).json({
    comment: 'Must not be empty'
  });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    updatesId: req.params.updatesId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  };

  db.doc(`/Updates/${req.params.updatesId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: 'Update not found'
        });
      }
      return doc.ref.update({
        commentCount: doc.data().commentCount + 1
      });
    })
    .then(() => {
      return db.collection('comments').add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Something is wrong'
      });
    });
};

exports.likeUpdate = (req, res) => {
  const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
    .where('updatesId', '==', req.params.updatesId).limit(1);

  const updateDocument = db.doc(`/Updates/${req.params.updatesId}`);

  let updateData;

  updateDocument.get()
    .then((doc) => {
      if (doc.exists) {
        updateData = doc.data();
        updateData.updatesId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({
          error: 'Thing not found'
        });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db.collection('likes').add({
            updatesId: req.params.updatesId,
            userHandle: req.user.handle
          })
          .then(() => {
            updateData.likeCount++;
            return updateData.update({
              likeCount: updateData.likeCount
            });
          })
          .then(() => {
            return res.json(updateData);
          });
      } else {
        return res.status(400).json({
          error: 'Update already liked'
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.code
      });
    });
};

exports.unlikeUpdate = (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('updatesId', '==', req.params.updatesId)
    .limit(1);

  const updateDocument = db.doc(`/Updates/${req.params.updatesId}`);

  let updateData;

  updateDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        updateData = doc.data();
        updateData.updatesId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({
          error: '1234 not found'
        });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({
          error: '1234r5Scream not liked'
        });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            updateData.likeCount--;
            return updateDocument.update({
              likeCount: updateData.likeCount
            });
          })
          .then(() => {
            res.json(updateData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.code
      });
    });
};

exports.deleteUpdate = (req, res) => {
  const document = db.doc(`/Updates/${req.params.updatesId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: 'Update not found'
        });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({
          error: 'Unauthorized'
        });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({
        message: 'Scream deleted successfully'
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code
      });
    });
};