const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

router 
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;