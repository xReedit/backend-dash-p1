/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prueba', {
    idprueba: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idtest: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'test',
        key: 'idtest'
      }
    }
  }, {
    tableName: 'prueba'
  });
};
