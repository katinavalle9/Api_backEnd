/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Verificar si existen las tablas 'sale' y 'product'.
  return Promise.all([
    knex.schema.hasTable("sale"),
    knex.schema.hasTable("product"),
  ]).then(([existsSale, existsProduct]) => {
    if (existsSale && existsProduct) {
      // Si ambas tablas existen, verifica si existe la tabla 'product_sale'.
      return knex.schema.hasTable("product_sale").then((existsProductSale) => {
        if (!existsProductSale) {
          // Si 'product_sale' no existe, crea la tabla con las claves foráneas y demás atributos.
          return knex.schema.createTable("product_sale", (table) => {
            table.increments("id").primary();
            table.integer("sale_id").unsigned().references("sale.sale_id");
            table
              .integer("product_id")
              .unsigned()
              .references("product.product_id");
            table.integer("cantidad").notNullable();
            // Aquí puedes añadir más atributos a la tabla según sea necesario.
          });
        }
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
