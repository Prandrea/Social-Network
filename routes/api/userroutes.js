const router = require('express').Router();

const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   newFriend,
   deleteFriend,

} = require('../../controllers/user-cont');



// api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);


// api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(newFriend)
    .delete(deleteFriend);

module.exports = router;