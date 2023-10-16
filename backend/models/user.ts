'use strict'
import { Model, ModelStatic } from 'sequelize'
module.exports = (sequelize: any, DataTypes: { SMALLINT: any; STRING: any; }) => {
  class User extends Model {

    static associate( Comment: ModelStatic<Model<any, any>> ) {
      User.hasMany(Comment, { as: 'author', foreignKey: 'author_id' })
    }

  }
  User.init({
    userId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true

    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordDigest: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
  })
  return User
}