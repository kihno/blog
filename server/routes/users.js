const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);

router.post('/', user_controller.user_post);

router.get('/:userId', user_controller.user_detail);

router.put('/:userId', user_controller.user_put);

router.delete('/:userId', user_controller.user_delete);

module.exports = router;
