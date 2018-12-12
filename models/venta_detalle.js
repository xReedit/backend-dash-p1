/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venta_detalle', {
    idventa_detalle: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idventa: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'venta',
        key: 'idventa'
      }
    },
    idproducto_stock: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'producto_stock',
        key: 'idproducto_stock'
      }
    },
    idproducto_detalle: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'producto_detalle',
        key: 'idproducto_detalle'
      }
    },
    tipo_precio: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    punitario: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    total: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'venta_detalle'
  });
};
