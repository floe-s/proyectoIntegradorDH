function turnoHorarioData(sequelize, Datatypes){

  let alias = 'Turno_horarios';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const horarios = sequelize.define(alias,cols,config);
  horarios.associate = function (modelos){
    horarios.hasMany(modelos.Comisions, {
      as: "comisions",
      foreignKey: "Turno_horario_id"
    });
  }
  return horarios;
}

  module.exports = turnoHorarioData;