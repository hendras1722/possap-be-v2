const posStyle = require('../models/product')
const myConnection = require('../helpers/status')
const schema = require('../schema/schema')
const { v4 } = require('uuid')
const headerAPI = require('../helpers/apimsa')

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
        try {
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
                    id: v4(),
                    name,
                    description,
                    image,
                    price,
                    stock,
                    id_category
                }

                const result = await posStyle.insertData(data)

                myConnection.response(response, 200, result, 'Success Uploaded')
            }
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
        try {
            const posId = request.params.posId
            const result = await posStyle.deleteData(posId)
            console.log(posId)
            const deleteData = {
                id: parseInt(posId)
            }
            myConnection.response(response, 200, deleteData)
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at updateData')
        }
    }
}
