function nivelCursoData(sequelize, Datatypes){

  let alias = 'nivel_cursos';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const niveles = sequelize.define(alias,cols,config)
  return niveles;
}

  module.exports = nivelCursoData;
  