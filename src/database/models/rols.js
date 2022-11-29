function rolData(sequelize, Datatypes){

  let alias = 'rols';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const rols = sequelize.define(alias,cols,config)
  return rols;
}

  module.exports = rolData;