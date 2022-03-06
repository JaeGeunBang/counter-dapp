import {
    Model, DataTypes,
} from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';


class User extends Model {
    public readonly id!: number;
    public userId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public lastLogin!: Date;
}

User.init({
    userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {
};

export default User;