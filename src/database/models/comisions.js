function comisionData(sequelize, Datatypes){

  let alias = 'comisions';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    numero_comision: {type: Datatypes.INTEGER},
    cantidad_vacantes: {type: Datatypes.INTEGER},
    fecha_creacion: { type: Datatypes.DATE},
    fecha_modificacion: {type: Datatypes.DATE},
    fecha_eliminacion: {type: Datatypes.DATE},
    fecha_inicio: { type: Datatypes.DATE},
    fecha_finalizacion: {type: Datatypes.DATE},
    Administrador_id: {type: Datatypes.INTEGER},
    Profesor_id: {type: Datatypes.INTEGER},
    Curso_db_id: {type: Datatypes.INTEGER},
    Turno_horario_id: {type: Datatypes.INTEGER},
  
  }
  
  let config = {camelCase: false, timestamps: false};

  const comisions = sequelize.define(alias,cols,config);
  comisions.associate = function (modelos){
    comisions.belongsTo(modelos.turno_horarios, {
      as: "turno_horarios",
      foreignKey: "Turno_horario_id"
    });
  }

  comisions.associate = function (modelos){
    comisions.belongsTo(modelos.Usuario_dbs, {
      as: "usuario_dbs",
      foreignKey: "Administrador_id"
    });
  }

  comisions.associate = function (modelos){
    comisions.belongsTo(modelos.Usuario_dbs, {
      as: "usuario_dbs",
      foreignKey: "Profesor_id"
    });
  }
  comisions.associate = function (modelos){
    comisions.belongsTo(modelos.curso_dbs, {
      as: "curso_dbs",
      foreignKey: "Curso_db_id"
    });
  }

  comisions.associate = function (modelos){
    comisions.hasMany(modelos.cursars, {
      as: "cursars",
      foreignKey: "Comision_id"
    });
  }

  return comisions;
}

  module.exports = comisionData;