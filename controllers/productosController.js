const products_model = require("../models/productos");

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const createProduct = await products_model.create(product);
    res.status(201).json(createProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Tuvimos un error, intente más tarde" });
  }
};

const findAllProducts = async (req, res) => {
  try {
    const allProduct = await products_model.findAll();
    res.status(200).json(allProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Tuvimos un error, intente más tarde" });
  }
};

const findOneProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const oneProduct = await products_model.findOne(idProduct);
    if (oneProduct.length === 0) {
      res.status(404).json({ error: "Producto no encontrada" });
    } else {
      res.status(200).json(oneProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Tuvimos un error, intente más tarde" });
  }
};

const updateProd = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const bodyToUpdate = req.body;
    const updateProducto = await products_model.update(idProduct, bodyToUpdate);
    res.status(200).json(updateProducto);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Tuvimos un error, intente más tarde" });
  }
};

const deleteProd = async (req, res) => {
  try {
    const idProduct = req.params.id;
    await products_model.logicDelete(idProduct);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Tuvimos un error, intente más tarde" });
  }
};

module.exports = {
  createProduct,
  findAllProducts,
  findOneProduct,
  updateProd,
  deleteProd,
};
