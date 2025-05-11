const questionController = require('../controllers/question.controller')
const isAdminMiddleware = require('../middlewares/isAdmin')

const router = require('express').Router()

router.post('/create',isAdminMiddleware,  questionController.create)
router.get('/get', questionController.get)
router.post('/check-answer/:id', questionController.check)

module.exports = router
