const connection = require('../configs/mysql')

module.exports = {
  // @ts-ignore
  posAll: (limit, activePage, searchName, sortBy, orderBy, name_category, idCat, posId, urutkan) => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const firstData = ((limit * activePage) - limit)
      if (limit) {
        console.log(`SELECT products.*, category.name_category FROM products LEFT JOIN category ON products.id_category = category.id WHERE products.name LIKE '%${searchName}%' AND products.id_category LIKE '%${idCat}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${limit} OFFSET ${firstData}`)
        connection.query(`SELECT products.*, category.name_category FROM products LEFT JOIN category ON products.id_category = category.id WHERE products.name LIKE '%${searchName}%' AND products.id_category LIKE '%${idCat}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${limit} OFFSET ${firstData}`,
          (error, result) => {
            // @ts-ignore
            if (error) reject(new Error(error))
            resolve(result)
          })
      } else {
        connection.query(`SELECT products.*, category.name_category FROM products LEFT JOIN category ON products.id_category = category.id WHERE products.name LIKE '%${searchName}%' AND products.id_category LIKE '%${idCat}%'
          ORDER BY ${sortBy} ${orderBy}`,
          (error, result) => {
            // @ts-ignore
            if (error) reject(new Error(error))
            resolve(result)
          })
      }
    })
  },
  posDetail: (posId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE id = ?', posId, (error, result) => {
        // @ts-ignore
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE products AUTO_INCREMENT = 1')
      connection.query('INSERT INTO products SET ?', data)
      connection.query(`SELECT products.*, category.name_category FROM products LEFT JOIN category ON products.id_category = category.id`, (error, result) => {
        // @ts-ignore
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  updateData: (data) => {
    const posId = data.id
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('UPDATE products SET ? WHERE id = ?', [data, posId], (error, result) => {
        // @ts-ignore
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  deleteData: (posId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM products WHERE id = ?', posId)
      connection.query('SELECT products.*, category.name_category FROM products LEFT JOIN category ON products.id_category = category.id', (error, result) => {
        // @ts-ignore
        if (error) reject(new Error(error))
        // connectio?n.query('ALTER TABLE products AUTO_INCREMENT = 1')
        connection.query('ALTER TABLE products DROP id')
        connection.query('ALTER TABLE products ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  },
  countData: (searchName, idCat, limit, activePage) => {
    return new Promise((resolve, reject) => {
      const firstData1 = ((limit * activePage) - limit)
      const sql = `SELECT count(products.id) as totalData FROM products  WHERE products.name LIKE '%${searchName}%' LIMIT ${limit} OFFSET ${firstData1}`
      console.log(sql, 'inisql')
      connection.query(`SELECT count(products.id) as totalData FROM products  WHERE products.name LIKE '%${searchName}%' AND products.id_category LIKE '%${idCat}%' LIMIT ${limit}`, (error, result) => {
        // @ts-ignore
        if (error) reject(new Error(error))
        console.log(result[0])
        resolve(result[0].totalData)
      })
    })
  }
}
