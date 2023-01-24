const db = require('../database/models');

let products = {
  getAllProducts: async (req, res) => {
    try {
      let productos = await db.Curso_dbs.findAll({include: [{association: 'usuario_Profe'}]});

      let data = {
        "total": productos.length, 
        "data": productos,
        "status": 200,
      }


      return res.json(data);
    } 
    catch (error) {
      console.log(error);
    }
  },

  lastAdded: async (req, res) => {
    try {
      let productos = await db.Curso_dbs.findAll({
        order: [
          ["fecha_creacion", "DESC"],
        ],
        limit: 5
      })

      let data = {
        "total": productos.length, 
        "data": productos,
        "status": 200,
      }

      return res.json(data);
    }
    catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = products;