/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sede', {
		idsede: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		idorg: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		descripcion: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'sede'
	});
};
