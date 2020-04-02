module.exports = (sequelize, dataTypes) => {
	const User = sequelize.define('Users', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
		last_name: dataTypes.STRING,
		adress: dataTypes.STRING,
		email: dataTypes.STRING,
		password: dataTypes.STRING,
		src: dataTypes.STRING,
	});

	User.prototype.getFullName = function () {
		return `${this.first_name} ${this.last_name}`;
	}

	return User;
}