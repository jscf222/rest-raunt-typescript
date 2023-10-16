'use strict'
module.exports = {
  up: async (queryInterface: { createTable: (arg0: string, arg1: { place_id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; name: { type: any; }; city: { type: any; }; state: { type: any; }; cuisines: { type: any; }; pic: { type: any; }; founded: { type: any; }; created_at: { allowNull: boolean; type: any; }; updated_at: { allowNull: boolean; type: any; }; }) => any; }, Sequelize: { INTEGER: any; STRING: any; DATE: any; }) => {
    await queryInterface.createTable('places', {
      place_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      cuisines: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
      },
      founded: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface: { dropTable: (arg0: string) => any; }, Sequelize: any) => {
    await queryInterface.dropTable('places');
  }
}