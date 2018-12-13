module.exports = (sequelize, Sequelize) => {
    return sequelize.define('pups', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                    len: [2, 25]
                }
            },
            breed: Sequelize.STRING,
            age: {
                type: Sequelize.INTEGER,
                validate: {
                    isInt: true,
                    min: 1
                }
            },
            sex: {
                type: Sequelize.STRING,
                validate: {
                    isIn: {
                        args: [['M', 'F']],
                        msg: "Must be M - for male or F - for female"
                    }
                }
            }
        },
        {underscored: true}
    );
};