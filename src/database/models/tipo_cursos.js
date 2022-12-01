function tipoCursoData(sequelize, Datatypes){

  let alias = 'Tipo_cursos';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const tipos = sequelize.define(alias,cols,config);
  tipos.associate = function (modelos){
    tipos.hasMany(modelos.Curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Tipo_curso_id"
    });
  }
  return tipos;
}

  module.exports = tipoCursoData;