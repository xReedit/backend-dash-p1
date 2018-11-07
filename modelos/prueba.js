module.exports = (sequelize, DataTypes) => {
        return sequelize.define(
                "prueba", {
                        idprueba: {
                                type: DataTypes.INTEGER(11),
                                allowNull: false,
                                primaryKey: true,
                                autoIncrement: true
                        },
                        descripcion: {
                                type: DataTypes.STRING(100),
                        },
                        idtest: {
                                type: DataTypes.INTEGER(11),
                                allowNull: false,
                                references: {
                                        model: "test",
                                        key: "idtest"
                                }
                        }
                }, {
                        tableName: "prueba"
                }
        );
};