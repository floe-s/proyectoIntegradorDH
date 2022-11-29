function nivelCursoData(sequelize, Datatypes){

  let alias = 'nivel_cursos';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const niveles = sequelize.define(alias,cols,config);
  niveles.associate = function (modelos){
    niveles.hasMany(modelos.curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Nivel_curso_id"
    });
  }
  return niveles;
}

  module.exports = nivelCursoData;
  