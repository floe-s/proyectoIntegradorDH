function cursoData(sequelize, Datatypes){

    let alias = 'curso_dbs';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(50)},
      descripcion: {type: Datatypes.TEXT(500)},
      estudiantes: {type: Datatypes.INTEGER},
      lecciones: {type: Datatypes.INTEGER},
      puntuacion: {type: Datatypes.INTEGER},
      imagen: {type: Datatypes.STRING(255)},
      img_nivel: {type: Datatypes.STRING(255)},
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
    courses.associate = function (modelos){
      courses.belongsTo(modelos.Usuario_dbs, {
        as: "usuario_dbs",
        foreignKey: "Administrador_id"
      });
    }

    courses.associate = function (modelos){
      courses.belongsTo(modelos.Usuario_dbs, {
        as: "usuario_dbs",
        foreignKey: "Profesor_id"
      });
    }

    courses.associate = function (modelos){
      courses.belongsTo(modelos.nivel_cursos, {
        as: "nivel_cursos",
        foreignKey: "Nivel_curso_id"
      });
    }

    courses.associate = function (modelos){
      courses.belongsTo(modelos.tipo_cursos, {
        as: "tipo_cursos",
        foreignKey: "Tipo_curso_id"
      });
    }

    courses.associate = function (modelos){
      courses.belongsTo(modelos.tematicas, {
        as: "tematicas",
        foreignKey: "Tematica_id"
      });
    }

    courses.associate = function (modelos){
      courses.hasMany(modelos.modulos, {
        as: "modulos",
        foreignKey: "Curso_db_id"
      });
    }

    courses.associate = function (modelos){
      courses.hasMany(modelos.cursars, {
        as: "cursars",
        foreignKey: "Curso_db_id"
      });
    }

    return courses;
  }

    module.exports = cursoData;
    