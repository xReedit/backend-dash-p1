/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registro_pago', {
    idregistro_pago: {
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
    idcliente: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'idcliente'
      }
    },
    idusuario: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'idusuario'
      }
    },
    idorg: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'org',
        key: 'idorg'
      }
    },
    idsede: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'sede',
        key: 'idsede'
      }
    },
    fecha: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    hora: {
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
    tableName: 'registro_pago'
  });
};
