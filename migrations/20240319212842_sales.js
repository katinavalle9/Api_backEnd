/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    // Verificar si existe la tabla 'customer'.
    return knex.schema.hasTable("customer").then((existsCustomer) => {
      if (existsCustomer) {
        // Si existe 'customer', procede a verificar si existe la tabla 'sale'.
        return knex.schema.hasTable("sale").then((existsSale) => {
          if (!existsSale) {
            // Si 'sale' no existe, crea la tabla 'sale' con la clave foránea 'customer_id'.
            return knex.schema.createTable("sale", (table) => {
              table.increments("sale_id").primary();
              // Añadir 'customer_id' como clave foránea.
              table
                .integer("customer_id")
                .unsigned()
                .references("customer.customer_id");
              table.boolean("active").notNullable().defaultTo(true);
              table.timestamp("created_at").defaultTo(knex.fn.now());
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
