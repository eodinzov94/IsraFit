import { DataTypes, Model } from 'sequelize'
import { db } from '../db.js'
import { IGoal } from '../types/GoalTypes.js'


class Goal extends Model<IGoal, IGoal> implements IGoal {
    public userId!: number
    public duration!: number
    public goalWeight!: number
    public avgCalory!: number
}

Goal.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true ,references: { model: 'Users', key: 'id' } },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    goalWeight: { type: DataTypes.FLOAT, allowNull: false },
    avgCalory: { type: DataTypes.FLOAT, allowNull: false }

}, {
    timestamps: false,
    sequelize: db,
})

export default Goal