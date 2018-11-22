/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('producto', {
		idproducto: {
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
		idcategoria: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'categoria',
				key: 'idcategoria'
			}
		},
		idmarca: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'marca',
				key: 'idmarca'
			}
		},
		descripcion: {
			type: DataTypes.STRING(150),
			allowNull: true
		},
		precio1: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		precio2: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		glosa: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		estado: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		fecha_creacion: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'producto'
	});
};
