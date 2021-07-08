const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought, 
    updateThought,
    removeThought, 
    addReaction, 
    removeReaction
} = require('../../controllers/thought-controller');
router
    .route('/')
    //get all works
    .get(getAllThoughts)

router
    .route('/:id')
    //get by id works
    .get(getThoughtById)

    .put(updateThought)
router
    .route('/:userId')
    //post works
    .post(addThought)

router
    .route('/:userId/:thoughtId')
    //delete works
    .delete(removeThought)
    //add reaction works 
    .put(addReaction)
    
router
    .route('/:userId/:thoughtId/:reactionId')
    //delete reaction works
    .delete(removeReaction)
module.exports = router;