function moduloData(sequelize, Datatypes){

  let alias = 'modulos';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    numero_modulo: {type: Datatypes.INTEGER},
    nombre: {type: Datatypes.STRING(45)},
    descripcion: {type: Datatypes.TEXT(500)},
    Curso_db_id: {type: Datatypes.INTEGER}
  }
  
  let config = {camelCase: false, timestamps: false};

  const modulos = sequelize.define(alias,cols,config);
  modulos.associate = function (modelos){
    modulos.belongsTo(modelos.curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Curso_db_id"
    });
  }

  modulos.associate = function (modelos){
    modulos.hasMany(modelos.temas, {
      as: "temas",
      foreignKey: "Modulo_id"
    });
  }

  return modulos;
}

  module.exports = moduloData;