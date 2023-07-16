import { DataTypes, Model } from 'sequelize'
import { db } from '../db.js'
import { IMealDaily } from '../types/MealTypes.js'


class Meal extends Model<IMealDaily, IMealDaily> implements IMealDaily {
    public userId!: number
    public totalCalories!: number
    public date!: Date
}

Meal.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true ,references: { model: 'Users', key: 'id' } },
    totalCalories: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false,primaryKey: true  },
}, {
    timestamps: false,
    sequelize: db,
})

export default Meal