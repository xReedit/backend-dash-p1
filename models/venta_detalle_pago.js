/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venta_detalle_pago', {
    idventa_detalle_pago: {
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
    idtipo_pago: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tipo_pago',
        key: 'idtipo_pago'
      }
    },
    importe: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    fecha_pago: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'venta_detalle_pago'
  });
};
