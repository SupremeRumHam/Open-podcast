let db = {
  users: [{
    userId: 'BtYExYY0sDamxCvYP2gtOlHxtUi2',
    email: 'aedmonds018@gmail.com',
    handle: 'alex123',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK'
  }],
  updates: [{
    userHandle: 'alex123',
    body: 'This is a sample scream',
    createdAt: '2019-03-15T10:59:52.798Z',
    likeCount: 5,
    commentCount: 3
  }],
  comments: [{
    userHandle: 'alex123',
    updatesId: '6QlpLF8ZmSuRbhxAsA8a',
    body: 'nice one mate!',
    createdAt: '2019-03-15T10:59:52.798Z'
  }],
  notifications: [{
    recipient: 'alex123',
    sender: '321alex',
    read: 'true | false',
    updatesId: 'kdjsfgdksuufhgkdsufky',
    type: 'like | comment',
    createdAt: '2019-03-15T10:59:52.798Z'
  }]
};
const userDetails = {
  // Redux data
  credentials: {
    userId: 'BtYExYY0sDamxCvYP2gtOlHxtUi2',
    email: 'aedmonds018@gmail.com',
    handle: 'alex123',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK'
  },
  likes: [{
      userHandle: 'alex123',
      updatesId: '6QlpLF8ZmSuRbhxAsA8a'
    },
    {
      userHandle: 'alex123',
      updatesId: '6QlpLF8ZmSuRbhxAsA8a'
    }
  ]
}