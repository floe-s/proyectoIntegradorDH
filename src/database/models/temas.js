function temaData(sequelize, Datatypes){

  let alias = 'temas';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    numero_tema: {type: Datatypes.INTEGER},
    nombre: {type: Datatypes.STRING(45)},
    Modulo_id: {type: Datatypes.INTEGER}
  }
  
  let config = {camelCase: false, timestamps: false};

  const temas = sequelize.define(alias,cols,config)
  return temas;
}

  module.exports = temaData;