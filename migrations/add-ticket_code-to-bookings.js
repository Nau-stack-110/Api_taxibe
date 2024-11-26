module.exports={
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Bookings', 'ticketCode', {
          type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn('Bookings', 'is_booked', {
          type: Sequelize.BOOLEAN,
            defaultValue: false,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Bookings', 'ticketCode');
        await queryInterface.removeColumn('Bookings', 'is_booked');
    }
}