import {
    Model, DataTypes,
} from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';

class Todo extends Model {
    public readonly id!: number;
    public subject!: string;
    public checked!: string;
    public body!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Todo.init({
    subject: {
        type: DataTypes.STRING(20),
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todo',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {
};

export default Todo;