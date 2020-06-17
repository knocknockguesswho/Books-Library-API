const express = require('express');
const router = express.Router();
const bookRouter = require('./book');
const authorization = require('./auth');
const member_use = require('./member');
const non_member = require('./non-member');

router.use('/admin', bookRouter);
router.use('/member', member_use);
router.use('/user', non_member);
router.use('/auth', authorization);


module.exports = router;