/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('distribuicion', {
    iddistribuicion: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idorg: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idsede: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fecha: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idalmacen_d: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idalmacen_a: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idusuario: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'distribuicion'
  });
};
