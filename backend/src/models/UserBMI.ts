import { DataTypes, Model } from 'sequelize'
import { db } from '../db.js'
import { IUserBMI } from '../types/UserBMITypes.js'


class UserBMI extends Model<IUserBMI, IUserBMI> implements IUserBMI {
    public userId!: number
    public value!: number
    public date!: Date
}

UserBMI.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true ,references: { model: 'Users', key: 'id' } },
    value: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false,primaryKey: true  },
}, {
    timestamps: false,
    sequelize: db,
})

export default UserBMI 