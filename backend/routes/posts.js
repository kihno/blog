const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');

/* GET users listing. */
router.get('/', post_controller.post_list);

router.get('/:postId', post_controller.post_detail);

router.post('/:postId', post_controller.post_post);

router.put('/:postId', post_controller.post_put);

router.delete('/:postId', post_controller.post_delete);

module.exports = router;