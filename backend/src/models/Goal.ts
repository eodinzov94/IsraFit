import { DataTypes, Model } from 'sequelize'
import { db } from '../db.js'
import { IGoal } from '../types/GoalTypes.js'


class Goal extends Model<IGoal, IGoal> implements IGoal {
    public userId!: number
    public endDate!: Date
    public goalWeight!: number
    public recommendedCalories!: number
    public startDate!: Date
    public duration!: number
    public targetBmi!: number
}

Goal.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true ,references: { model: 'Users', key: 'id' } },
    endDate: { type: DataTypes.DATEONLY, allowNull: false },
    goalWeight: { type: DataTypes.FLOAT, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    recommendedCalories: { type: DataTypes.FLOAT, allowNull: false },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    targetBmi: { type: DataTypes.FLOAT, allowNull: false },
}, {
    timestamps: false,
    sequelize: db,
})

export default Goal