const { Router } = require('express');
const listsController = require('../controllers/lists.controller');
const { authListsApi } = require('../middleware/auth');

const router = Router({ mergeParams: true });

router.get('/users', listsController.listsUsers);
router.post('/auth', listsController.auth);
router.get('/verify-token', authListsApi, (req, res) => {
  res.send({
    success: true,
  });
});

module.exports = router;
