const posStyle = require('../models/product')
const myConnection = require('../helpers/status')
const schema = require('../schema/schema')
const { v4 } = require('uuid')
const headerAPI = require('../helpers/apimsa')
const path = require('path')
const fs = require('fs')

module.exports = {
    posAll: async (request, response) => {
        try {
            const limit = request.query.limit
            const urutkan = request.query.urutkan
            const activePage = request.query.page || 1
            const searchName = request.query.searchName || ''
            const sortBy = request.query.sortBy || 'id'
            const orderBy = request.query.orderBy || 'ASC'
            const name_category = request.query.name_category || ''
            const idCat = request.query.idCat || ''
            const posId = request.params.posId
            const result = await posStyle.posAll(limit, activePage, searchName, sortBy, orderBy, name_category, idCat, posId, urutkan)
            if (limit) {
                let totalData = await posStyle.countData(searchName, idCat, limit, activePage)
                const totalPages = Math.ceil((totalData / limit))
                const firstData1 = ((limit * activePage))
                console.log(totalPages, limit, activePage, firstData1, 'intotalpages')
                const pager = {
                    totalPages
                }
                myConnection.customResponse(response, 200, result, totalData, pager)
            } else {
                myConnection.response(response, 200, result)
            }
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at posAll')
        }
    },
    posDetail: async (request, response) => {
        try {
            const posId = request.params.posId
            const result = await posStyle.posDetail(posId)
            myConnection.response(response, 200, result)
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at posDetail')
        }
    },
    insertData: async (request, response) => {
        const validation = schema.productSchema.validate(request.body)
        if (validation.error) {
            myConnection.responseValidation(response, 200, validation.error.details)
        } else {
            const {
                name,
                description,
                price,
                image,
                stock,
                id_category
            } = request.body

            const data = {
                name,
                description,
                image,
                price,
                stock,
                id_category,
                id: v4()
            }

            const result = await posStyle.insertData(data)

            myConnection.response(response, 200, result, 'Success Uploaded')
        }
        try {

        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at insertData or File not recruitment')
        }
    },
    updateData: async (request, response) => {
        try {
            const id = request.params.posId
            const data = {
                id,
                name: request.body.name,
                description: request.body.description,
                image: request.body.image,
                price: request.body.price,
                stock: request.body.stock,
                id_category: request.body.id_category,
                updated_at: new Date()
            }

            const result = await posStyle.updateData(data)
            myConnection.response(response, 200, result)

        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at updateData')
        }
    },
    deleteData: async (request, response) => {
        const posId = request.params.posId
        const checkData = await posStyle.posDetail(posId)
        try {
            checkImage = checkData.image.split("/")
            if (checkData) {
                const result = await posStyle.deleteData(posId)
                const pathNya = path.join(__dirname + "/../uploads/" + checkImage[4])
                console.log(path.join(__dirname + "/../uploads/" + checkImage[4]))
                fs.unlink(pathNya, (err) => {
                    if (err) return console.log(err, 'inierror')
                    console.log('File deleted!');
                });
                response.status(200).json({
                    status: 200,
                    message: "Data Berhasil Dihapus"
                })
            } else {
                response.status(400).json({
                    message: "Data Tidak Ada atau Data sudah terhapus",
                    status: 400
                })
            }
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at updateData')
        }
    }
}
