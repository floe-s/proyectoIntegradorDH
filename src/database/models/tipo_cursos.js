function tipoCursoData(sequelize, Datatypes){

  let alias = 'tipo_cursos';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const tipos = sequelize.define(alias,cols,config)
  return tipos;
}

  module.exports = tipoCursoData;