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

  const comisions = sequelize.define(alias,cols,config)
  return comisions;
}

  module.exports = comisionData;