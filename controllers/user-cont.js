const { user } = require("../models");

const userController = {
    //get all users
  getallusers(req, res) {
    user.find({})
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get user by ID
  getUserbyId({ params }, res) {
    user.findOne({ _id: params.userId })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "There are no users with this id." });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  //create new user
  createUser({ body }, res) {
    user.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  
//update user by Id
  updateuser({ params, body }, res) {
    user.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
    .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'There are no users with this id.' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },
  // remove user
  deleteUser({ params }, res) {
      user.findByIdAndDelete({ _id: params.userId })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'There are no users with this id.' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  newfriend({ params}, res) {
      user.findOneAndUpdate(
        { _id: params.userId },
        {$addToSet: {friends: params.friendId}},
        {new: true, runValidators: true}
        )
        .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'There are no users with this id.' });
              return;
            }
            res.json(userData);
          })
          .catch(err => res.json(err));
  },

  deletefriend({ params}, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      {$pull:{friends: params.friendId}},
      {new: true}
      )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = userController;