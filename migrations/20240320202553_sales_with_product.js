/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("product_Sales", (table) => {
      table.increments("id").primary();
      table.integer("sale_id").unsigned().references("sale.sale_id");
      table.integer("product_id").unsigned().references("products.product_id");
      table.integer("amount").notNullable();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
