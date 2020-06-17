const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const authorization = require('./auth');
const member_use = require('./member');
const non_member = require('./non-member');

router.use('/admin', adminRouter);
router.use('/member', member_use);
router.use('/user', non_member);
router.use('/auth', authorization);


module.exports = router;