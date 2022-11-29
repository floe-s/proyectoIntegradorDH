function cursoData(sequelize, Datatypes){

    let alias = 'curso_db';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
      descripcion: {type: Datatypes.TEXT(500)},
      imagen: {type: Datatypes.STRING(45)},
      cantidad_horas: {type: Datatypes.INTEGER},
      precio: { type: Datatypes.FLOAT},
      fecha_creacion: { type: Datatypes.DATE},
      fecha_modificacion: {type: Datatypes.DATE},
      fecha_eliminacion: {type: Datatypes.DATE},
      Administrador_id: {type: Datatypes.INTEGER},
      Profesor_id: {type: Datatypes.INTEGER},
      Tematica_id: {type: Datatypes.INTEGER},
      Nivel_curso_id: {type: Datatypes.INTEGER},
      Tipo_curso_id: {type: Datatypes.INTEGER}
    }
    
    let config = {camelCase: false, timestamps: false};

    const courses = sequelize.define(alias,cols,config);
   /*  courses.associate = function (modelos){
      courses.belongsTo(modelos.usuario_db, {
        as: "usuario_db",
        foreignKey: "Administrador_id"
      });
    }

    courses.associate = function (modelos){
      courses.belongsTo(modelos.usuario_db, {
        as: "usuario_db",
        foreignKey: "Profesor_id"
      });
    } */

    return courses;
  }

    module.exports = cursoData;
    