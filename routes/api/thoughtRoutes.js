const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  postThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

router 
  .route('/')
  .get(getThoughts)
  .post(postThought);

router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(postReaction)
  .delete(deleteReaction);

module.exports = router;