function moduloData(sequelize, Datatypes){

  let alias = 'Modulos';
  
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
    modulos.belongsTo(modelos.Curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Curso_db_id"
    });
  }

  modulos.associate = function (modelos){
    modulos.hasMany(modelos.Temas, {
      as: "temas",
      foreignKey: "Modulo_id"
    });
  }

  return modulos;
}

  module.exports = moduloData;