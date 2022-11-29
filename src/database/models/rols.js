function rolData(sequelize, Datatypes){

  let alias = 'rols';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const rols = sequelize.define(alias,cols,config);
  rols.associate = function (modelos){
    rols.hasMany(modelos.Usuario_dbs, {
      as: "usuario_dbs",
      foreignKey: "Rol_id"
    });
  }
  return rols;
}

  module.exports = rolData;