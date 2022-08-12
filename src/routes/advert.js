const express = require('express')
const router = express.Router()
const advertControllers = require('../controllers/advert')


router.get('/advert', advertControllers.showAdvert)

router.get('/advert/add', advertControllers.showAdvertAdd)

router.post('/advert/add', advertControllers.addAdvert)

router.get('/advert/list', advertControllers.getAdverts)

router.get('/advert/one/:advertId', advertControllers.getOneAdvert)

router.post('/advert/edit', advertControllers.editAdvert)

router.get('/advert/remove/:advertId', advertControllers.removeAdvert)


module.exports = router