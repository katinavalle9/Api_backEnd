const express = require("express");
const productosRoutes = require('./routes/productosRoutes');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola servidor");
});


app.use(productosRoutes);

app.listen(3000, () => {
  console.log("Server on");
});
