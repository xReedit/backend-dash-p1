/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registro_cobro_bitacora', {
    idregistro_cobro_bitacora: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idcliente: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idusuario: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fecha: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    hora: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    glosa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'registro_cobro_bitacora'
  });
};
