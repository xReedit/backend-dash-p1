/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cliente', {
		idcliente: {
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
		nombres: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		dni: {
			type: DataTypes.CHAR(11),
			allowNull: true
		},
		direccion: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		direccion_referencia: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ubigeo: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		telefono: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'cliente'
	});
};
