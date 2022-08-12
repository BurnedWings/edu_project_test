const Advert = require('../models/advert')
const formidable = require('formidable')
const path = require('path')
const config = require('../config')

exports.showAdvert = (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10)
    const pageSize = 3
    Advert.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, adverts) => {
            if (err) {
                return next(err)
            }
            Advert.count((err, count) => {
                if (err) {
                    return next(err)
                }
                const totalPage = Math.ceil(count/pageSize)
                res.render('advert_list.html', {
                    adverts,
                    totalPage,
                    page
                })
            })
        })

}

exports.showAdvertAdd = (req, res, next) => {
    res.render('advert_add.html')
}

exports.addAdvert = (req, res, next) => {

    const form = formidable({ multiples: true, keepExtensions: true, uploadDir: config.uploadDir });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err)
            return
        }
        const body = fields
        body.image = files.image.newFilename

        let advert = new Advert({
            title: body.title,
            image: body.image,
            link: body.link,
            start_time: body.start_time,
            end_time: body.end_time
        })
        advert.save((err) => {
            if (err) {
                return next(err)
            }
            res.json({
                code: 200,
                msg: 'Success'
            })
        })
    })


}

exports.getAdverts = async (req, res, next) => {
    const advertList = await Advert.find()
    res.json(advertList)
}

exports.getOneAdvert = (req, res, next) => {
    Advert.findById(req.params.advertId, (err, data) => {
        if (err) {
            return next(err)
        }
        res.json({
            code: 200,
            data
        })
    })
}

exports.editAdvert = (req, res, next) => {
    const body = req.body
    Advert.findById(body.id, (err, advert) => {
        if (err) {
            return next(err)
        }
        advert.title = body.title
        advert.image = body.image
        advert.link = body.link
        advert.start_time = body.start_time
        advert.end_time = body.end_time
        advert.last_modified = Date.now()

        advert.save((err, ret) => {
            if (err) {
                return next(err)
            }
            res.json({
                code: 200,
                ret
            })
        })
    })
}

exports.removeAdvert = (req, res, next) => {
    Advert.deleteOne({ _id: req.params.advertId }, (err) => {
        if (err) {
            return next(err)
        }
        res.json({
            code: 200,
            message: '删除成功'
        })
    })
}