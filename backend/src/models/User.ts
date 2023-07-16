import { db } from '../db.js'
import { DataTypes, Model } from 'sequelize'
import { IUserRegister, UserAttributes } from '../types/UserTypes.js'
import { calculateBMI } from '../controllers/UserBmiController.js'

class User extends Model<UserAttributes, IUserRegister> implements UserAttributes {
  public id!: number
  public email!: string
  public firstName!: string
  public lastName!: string
  public gender!: string
  public birthYear!: number
  public role!: string
  public lastSeen!: Date
  public password!: string
  public weight!: number
  public height!: number
  public physicalActivity!: number
  public bmi !: number
  public TDEE!: number
  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2000,
      validate: { min: new Date().getFullYear() - 120, max: new Date().getFullYear() - 18 },
    },
    role: { type: DataTypes.STRING, defaultValue: 'User' },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    bmi: {
      type: DataTypes.FLOAT, allowNull: false
    },
    physicalActivity: { type: DataTypes.FLOAT, allowNull: false },
    TDEE: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    timestamps: true,
    sequelize: db,
  },
)
User.beforeSave((user) => {
  if (user.changed('weight') || user.changed('height')) {
    user.bmi = calculateBMI(user.weight, user.height)
  }
});
export default User
