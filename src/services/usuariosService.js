const db = require('../database/models');

let users = {
  getAllUsers: async (req, res) => {
    try {
      let usuarios = await db.Usuario_dbs.findAll();

      let data = {
        "total": usuarios.length, 
        "data": usuarios,
        "status": 200,
      }


      return res.json(data);
    } 
    catch (error) {
      console.log(error);
    }
  },

  lastCreated: async (req, res) => {
    try {
      let usuarios = await db.Usuario_dbs.findAll({
        order: [
          ["fecha_creacion", "DESC"],
        ],
        limit: 3
      })

      let data = {
        "total": usuarios.length, 
        "data": usuarios,
        "status": 200,
      }

      return res.json(data);
    }
    catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = users;