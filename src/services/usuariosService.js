const db = require('../database/models');

let users = {
  getAllUsers: async (req, res) => {
    try {
      let usuarios = await db.usuario_dbs.findAll();


      let data = {
        "total": usuarios.length, 
        "data": usuarios,
        "status": 200,
      }


      return res.json(data);
    } 
    catch (error) {
      res.render(error);
      console.log(error);
    }
  }
}

module.exports = users;