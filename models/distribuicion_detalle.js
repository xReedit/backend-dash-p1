/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('distribuicion_detalle', {
    iddistribuicion_detalle: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    iddistribuicion: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'distribuicion',
        key: 'iddistribuicion'
      }
    },
    idproducto_detalle: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idproducto_stock: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    }
  }, {
    tableName: 'distribuicion_detalle'
  });
};
