function asociadoData(sequelize, Datatypes){

  let alias = 'Asociados';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    Usuario_db_id: {type: Datatypes.INTEGER},
    Academia_id: {type: Datatypes.INTEGER},
  }
  
  let config = {camelCase: false, timestamps: false};

  const asociados = sequelize.define(alias,cols,config);

  return asociados;
}

  module.exports = asociadoData;