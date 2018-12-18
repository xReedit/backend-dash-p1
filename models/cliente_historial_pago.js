/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente_historial_pago', {
    idcliente_historial_pago: {
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
    idcliente: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idventa: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idventa_detalle_pago: {
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
    importe_cuenta: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    importe_pagado: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'cliente_historial_pago'
  });
};
