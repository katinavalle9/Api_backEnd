const db = require("../config");

const create=(bodyProducts)=>{
   return db 
   .insert(bodyProducts)
   .into('products')
   .returning(["product_id", "name", "description", "sku", "active","price"]);
}

const findAll =()=>{
    return db
    .select("*")
    .from("products")
    .where({active : true});
}

const findOne =(idProduct)=>{
    return db
    .select("*")
      .from("products")
      .where({ product_id: idProduct, active : true});
}

const update = (idProduct,bodyProducts)=>{
    return db
    .update(bodyToUpdate)
      .from("products")
      .where({ product_id: idProduct })
      .returning(["product_id", "name", "description", "sku","price", "active"]);
}

const logicDelete=(idProduct)=>{
    update({ active: false })
      .from("products")
      .where({ product_id: idProduct,active : true });
}

module.exports={
    create,
    findAll,
    findOne,
    update,
    logicDelete
}