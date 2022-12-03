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


  return modulos;
}

  module.exports = moduloData;