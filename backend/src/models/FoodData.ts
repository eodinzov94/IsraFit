import { DataTypes, Model } from 'sequelize'
import { db } from '../db.js'
import { IFoodData } from '../types/FoodDataTypes.js'


class FoodData extends Model<IFoodData, IFoodData> implements IFoodData {
    public code!: number
    public hebrew_name!: string
    public english_name!: string
    public food_energy!: number
    public protein!: number
    public total_fat!: number
    public carbohydrates!: number
    public total_dietary_fiber!: number
    public saturated_fat!: number
    public total_sugars!: number
}

FoodData.init({
    code: { type: DataTypes.INTEGER, primaryKey: true },
    hebrew_name: { type: DataTypes.STRING, allowNull: false },
    english_name: { type: DataTypes.STRING, allowNull: false },
    food_energy: { type: DataTypes.FLOAT, allowNull: false },
    protein: { type: DataTypes.FLOAT, allowNull: false },
    total_fat: { type: DataTypes.FLOAT, allowNull: false },
    carbohydrates: { type: DataTypes.FLOAT, allowNull: false },
    total_dietary_fiber: { type: DataTypes.FLOAT, allowNull: false },
    saturated_fat: { type: DataTypes.FLOAT, allowNull: false },
    total_sugars: { type: DataTypes.FLOAT, allowNull: false }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'food_data'
})

export default FoodData