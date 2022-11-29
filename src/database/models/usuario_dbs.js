function usuarioData(sequelize, Datatypes){

    let alias = 'Usuario_dbs';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
      apellido: {type: Datatypes.STRING(500)},
      email: {type: Datatypes.STRING(45)},
      clave: {type: Datatypes.STRING(255)},
      telefono: { type: Datatypes.INTEGER},
      imagen:{type: Datatypes.STRING(100)},
      fecha_creacion: { type: Datatypes.DATE},
      fecha_eliminacion: {type: Datatypes.DATE},
      Rol_id: {type: Datatypes.STRING(50)},
      Tematica_id: {type: Datatypes.STRING(50)},
      Administrador_id: {type: Datatypes.INTEGER}
    }
    
    let config = {camelCase: false, timestamps: false};

    const users = sequelize.define(alias,cols,config);
    users.associate = function (modelos){
      users.belongsTo(modelos.Usuario_dbs, {
        as: "usuario_dbs",
        foreignKey: "Administrador_id"
      });
    }

    users.associate = function (modelos){
      users.hasMany(modelos.Usuario_dbs, {
        as: "usuario_dbs",
        foreignKey: "Administrador_id"
      });
    }

      users.associate = function (modelos){
        users.hasMany(modelos.curso_dbs, {
          as: "curso_dbs",
          foreignKey: "Administrador_id"
        });
      }

        users.associate = function (modelos){
          users.hasMany(modelos.curso_dbs, {
            as: "curso_dbs",
            foreignKey: "Profesor_id"
          });
      }

      users.associate = function (modelos){
        users.hasMany(modelos.asociados, {
          as: "asociados",
          foreignKey: "Usuario_db_id"
        });
    }

    users.associate = function (modelos){
      users.belongsTo(modelos.rols, {
        as: "rols",
        foreignKey: "Rol_id"
      });
    }

    users.associate = function (modelos){
      users.belongsTo(modelos.tematicas, {
        as: "tematicas",
        foreignKey: "Tematica_id"
      });
    }

    users.associate = function (modelos){
      users.hasMany(modelos.cursars, {
        as: "cursars",
        foreignKey: "Alumno_id"
      });
  }
      
    return users;
}

module.exports = usuarioData;