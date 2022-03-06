import User, { associate as associateUser } from './user';
import Todo from "./todo";

export * from './sequelize';
const db = {
    User, Todo
};
export type dbType = typeof db;

associateUser(db);