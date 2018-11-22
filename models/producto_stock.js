/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('producto_stock', {
		idproducto_stock: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		idproducto_detalle: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'producto_detalle',
				key: 'idproducto_detalle'
			}
		},
		idalmacen: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'almacen',
				key: 'idalmacen'
			}
		},
		stock: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'producto_stock'
	});
};
