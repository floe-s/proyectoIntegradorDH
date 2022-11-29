function tematicaData(sequelize, Datatypes){

  let alias = 'tematicas';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const tematicas = sequelize.define(alias,cols,config);
  tematicas.associate = function (modelos){
    tematicas.hasMany(modelos.Usuario_dbs, {
      as: "usuario_dbs",
      foreignKey: "Tematica_id"
    });
  }

  tematicas.associate = function (modelos){
    tematicas.hasMany(modelos.curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Tematica_id"
    });
  }

  return tematicas;
}

  module.exports = tematicaData;