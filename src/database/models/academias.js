function academiaData(sequelize, Datatypes){

  let alias = 'academias';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)},
  
  }
  
  let config = {camelCase: false, timestamps: false};

  const academias = sequelize.define(alias,cols,config);
  academias.associate = function (modelos){
    academias.hasMany(modelos.asociados, {
      as: "asociados",
      foreignKey: "Academia_id"
    });
  }

  return academias;
}

  module.exports = academiaData;
  