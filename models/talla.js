/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('talla', {
		idtalla: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		descripcion: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'talla'
	});
};
