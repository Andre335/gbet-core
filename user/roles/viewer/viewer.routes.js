const express = require('express')
var Viewer = require('./viewer.controller')
var router = express.Router()

router.get('/', Viewer.findAll)

router.get('/:id', Viewer.findOne)

router.post('/', Viewer.create)

router.delete('/:id', Viewer.deleteById)

router.put('/:id', Viewer.update)

module.exports = router