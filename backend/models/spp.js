'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spp extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.siswa, {
        foreignKey: "id_spp",
        as: "siswa"
      })

      this.hasMany(models.pembayaran, {
        foreignKey: "id_spp",
        as: "pembayaran"
      })
    }
  };
  spp.init({
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tahun: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'spp',
    tableName: 'spp'
  });
  return spp;
};