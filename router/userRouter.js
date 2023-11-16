const express = require('express')
const {createUser,login , logout} = require('../controller/userController')
const router = express.Router()


router.route('/admin/create')
.post(createUser)

router.route('/admin/login')
.post(login)

router.route('/admin/logout')
.get(logout)

module.exports = router