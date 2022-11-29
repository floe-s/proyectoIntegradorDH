function turnoHorarioData(sequelize, Datatypes){

  let alias = 'turno_horarios';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const horarios = sequelize.define(alias,cols,config)
  return horarios;
}

  module.exports = turnoHorarioData;