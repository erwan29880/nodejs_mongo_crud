const express = require('express');
const controller = require('../controller/ctrl');
const router = express.Router();

router.get('/', controller.mongo);
router.get('/mongoGet', controller.mongoGet);
router.post('/mongoPost', controller.mongoPost);
router.put('/mongoPut', controller.mongoPut);
router.delete('/mongoDel', controller.mongoDel);


module.exports = router