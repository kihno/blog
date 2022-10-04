const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_list);

router.get('/:userId', user_controller.user_detail);

router.post('/:userId', user_controller.user_post);

router.put('/:userId', user_controller.user_put);

router.delete('/:userId', user_controller.user_delete);

module.exports = router;
