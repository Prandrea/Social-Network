const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought

} = require('../../controllers/thought-cont');



router.route('/').get(getAllThoughts);
router.route("/:userId").post(createThought);


// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;