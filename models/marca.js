/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('marca', {
		idmarca: {
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
		descripcion: {
			type: DataTypes.STRING(80),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'marca'
	});
};
