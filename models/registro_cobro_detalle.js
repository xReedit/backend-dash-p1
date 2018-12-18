/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registro_cobro_detalle', {
    idregistro_cobro_detalle: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idregistro_cobro: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'registro_cobro',
        key: 'idregistro_cobro'
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
      type: DataTypes.STRING(45),
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'registro_cobro_detalle'
  });
};
