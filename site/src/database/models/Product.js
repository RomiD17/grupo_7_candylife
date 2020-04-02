module.exports = (sequelize, dataTypes) => {
	const Product = sequelize.define('Products', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		prodNombre: dataTypes.STRING,
		marca: dataTypes.INTEGER,
		categoria: dataTypes.INTEGER,
		gramaje: dataTypes.STRING,
		mainPrecio: dataTypes.STRING,
		discountPrecio: dataTypes.STRING,
		detalle: dataTypes.STRING,
		nutricional: dataTypes.STRING,
		src: dataTypes.STRING

	});

	return Product;
}