function tematicaData(sequelize, Datatypes){

  let alias = 'Tematicas';
  
  let cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(45)}
  }
  
  let config = {camelCase: false, timestamps: false};

  const tematicas = sequelize.define(alias,cols,config);

  tematicas.associate = function(modelos){
    tematicas.hasMany(modelos.Usuario_dbs,{
      as:'usurios_temas',
      foreignKey: 'Tematica_id'
    })
  }
  return tematicas;
}

  module.exports = tematicaData;