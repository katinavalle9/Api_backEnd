/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("product").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("product", (table) => {
        table.increments("product_id").primary();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.integer("sku").notNullable();
        table.boolean("active").notNullable().defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
