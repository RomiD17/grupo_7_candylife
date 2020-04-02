module.exports = (sequelize, dataTypes) => {
	const ProductBrand = sequelize.define('ProductBrands', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
		product_id: dataTypes.INTEGER,
		brand_id: dataTypes.INTEGER,
	},{
		tableName: 'product_brand'
	}
	);
	ProductBrand.associate = (models) => {
		ProductBrand.belongsToMany(models.Products, {
			as: 'products',
			through: 'category_product',
			foreignKey: 'category_id',
			otherKey: 'product_id'
		});
	}

	return ProductBrand;
}