import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
    declare nom: string;
    declare prenom: string;
}

User.init(
    {
        nom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
    },
);

export default User;