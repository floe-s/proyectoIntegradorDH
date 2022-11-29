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
        users.hasMany(modelos.curso_db, {
          as: "curso_dbs",
          foreignKey: "Administrador_id"
        });
      }

        users.associate = function (modelos){
          users.hasMany(modelos.curso_db, {
            as: "curso_dbs",
            foreignKey: "Profesor_id"
          });
      }
      
    return users;
}

module.exports = usuarioData;