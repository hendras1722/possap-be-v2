const connection = require('../configs/mysql')

module.exports = {
    AllCategory: (limit, activePage, searchName, sortBy, orderBy) => {
        return new Promise(async (resolve, reject) => {
            const totalData = connection.query('SELECT count (*) FROM category')
            const totalPages = Math.ceil(totalData / limit)
            const firstData = ((limit * activePage) - limit)
            const ki = connection.query('SELECT * FROM category')

            await connection.query(`SELECT category.* FROM category WHERE name_category LIKE '%${searchName}%'
      ORDER BY ${sortBy} ${orderBy}
      LIMIT ${firstData},${limit}`,
                (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
        })
    },
    DetailCategory: (posId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category WHERE id = ?', posId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    InsertCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO category SET ?', data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    UpdateCategory: (data) => {
        const posId = data.id
        return new Promise((resolve, reject) => {
            connection.query('UPDATE category SET ? WHERE id = ?', [data, posId], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    DeleteCategory: (posId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM category WHERE id = ?', posId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    searchData: (name) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM category WHERE name LIKE '%${name}%'`, (error, result) => {
                if (error) reject(new Error(error))
                console.log(name)
                resolve(result)
            })
        })
    },
    sortData: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM category ORDER BY ${data}`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    limPages: (limited) => {
        return new Promise((resolve, reject) => {
            const AllData = connection.query('SELECT count (*) FROM products')
            const AllPages = Math.ceil(AllData / limited)
            connection.query(`SELECT * FROM category LIMIT ${limited}`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}