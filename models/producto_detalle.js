/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('producto_detalle', {
		idproducto_detalle: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		idproducto: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'producto',
				key: 'idproducto'
			}
		},
		codigobarra: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		color: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		idtalla: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'talla',
				key: 'idtalla'
			}
		},
		stock_inicial: {
			type: DataTypes.INTEGER(5),
			allowNull: true
		},
		idalmacen_inicial: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'producto_detalle'
	});
};
