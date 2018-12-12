/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venta', {
    idventa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    idusuario: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'idusuario'
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
    fecha: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    hora: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dsct: {
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
    tableName: 'venta'
  });
};
