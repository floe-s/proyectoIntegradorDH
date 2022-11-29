function asociadoData(sequelize, Datatypes){

  let alias = 'asociados';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    Usuario_db_id: {type: Datatypes.INTEGER},
    Academia_id: {type: Datatypes.INTEGER},
  }
  
  let config = {camelCase: false, timestamps: false};

  const asociados = sequelize.define(alias,cols,config);
  asociados.associate = function (modelos){
    asociados.belongsTo(modelos.academias, {
      as: "academias",
      foreignKey: "Academia_id"
    });
  }

  asociados.associate = function (modelos){
    asociados.belongsTo(modelos.Usuario_dbs, {
      as: "usuario_dbs",
      foreignKey: "Usuario_db_id"
    });
  }
  return asociados;
}

  module.exports = asociadoData;