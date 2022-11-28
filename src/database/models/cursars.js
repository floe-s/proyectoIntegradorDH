function cursarData(sequelize, Datatypes){

  let alias = 'cursars';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    valoracion: {type: Datatypes.INTEGER},
    Alumno_id: {type: Datatypes.INTEGER},
    Curso_db_id: {type: Datatypes.INTEGER},
    Comision_id: {type: Datatypes.INTEGER},
  
  }
  
  let config = {camelCase: false, timestamps: false};

  const cursars = sequelize.define(alias,cols,config)
  return cursars;
}

  module.exports = cursarData;