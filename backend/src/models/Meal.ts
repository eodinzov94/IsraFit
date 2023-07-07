import { DataTypes, Model } from 'sequelize'
import { db } from '../db.js'
import { IMeal } from '../types/MealTypes.js'


class Meal extends Model<IMeal, IMeal> implements IMeal {
    public userId!: number
    public quantity!: number
    public date!: Date
    public code!: number
}

Meal.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true ,references: { model: 'Users', key: 'id' } },
    quantity: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false,primaryKey: true  },
    code: { type: DataTypes.INTEGER, allowNull: false,primaryKey: true ,references: { model: 'food_data', key: 'code' } },
}, {
    timestamps: false,
    sequelize: db,
})

export default Meal