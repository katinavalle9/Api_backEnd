/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("customer").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("customer", (table) => {
        table.increments("customer_id").primary();
        table.string("name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").notNullable();
        table.string("phone_number").notNullable();
        table.string("address").notNullable();
        table.string("colony").notNullable();
        table.string("city").notNullable();
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
