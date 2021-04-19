


const tblCommonBaseDataModel = require('../Models/tblCommonBaseDataModel')





var express = require('express')
var bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

module.exports.getTblCommonBaseDataController = function (request, response) {
    let findRequest = { ...request.body }
    tblCommonBaseDataModel.getTblCommonBaseData(findRequest).then(result => {


        if (result == null) {
            response.json({ error: "هیچ رکوردی موجود نیست" })
        } else {
            response.json(result)
        }




    })

}


module.exports.insertTblCommonBaseDataController = function (request, response) {

    let findRequest = { ...request.body }
    console.log(findRequest)

    tblCommonBaseDataModel.insertTblCommonBaseData(findRequest).then(result =>

        response.json(result[0][0].CommonBaseDataId)
    ).catch(error =>

        response.json({ error: "رکورد مورد نظر ثبت نمیشود" })
    )
}

module.exports.updateTblCommonBaseDataController = function (request, response) {
    let findRequest = { ...request.body }
    console.log(findRequest)

    tblCommonBaseDataModel.updateTblCommonBaseData(findRequest).then(result => {

        if (result == null) {
            response.json({ error: "عملیات ویرایش با موفقیت انجام نشد" })
        } else {

            response.json(result[0])
        }

    })
}

module.exports.deleteTblCommonBaseDataController = function (request, response) {
    let findRequest = { ...request.body }
    console.log(findRequest)

    tblCommonBaseDataModel.deleteTblCommonBaseData(findRequest).then(result => {

        if (result == 1) {
            response.json({ message: "عملیات حذف با موفقیت انجام شد" })
        } else {
            response.json({ error: "عملیات حذف با موفقیت انجام نشد" })
        }

    })


}

