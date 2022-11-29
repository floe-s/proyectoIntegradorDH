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

  const cursars = sequelize.define(alias,cols,config);
  cursars.associate = function (modelos){
    cursars.belongsTo(modelos.Usuario_dbs, {
      as: "usuario_dbs",
      foreignKey: "Alumno_id"
    });
  }

  cursars.associate = function (modelos){
    cursars.belongsTo(modelos.curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Curso_db_id"
    });
  }

  cursars.associate = function (modelos){
    cursars.belongsTo(modelos.comisions, {
      as: "comisions",
      foreignKey: "Comision_id"
    });
  }


  return cursars;
}

  module.exports = cursarData;