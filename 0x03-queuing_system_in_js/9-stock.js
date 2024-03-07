const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const client = redis.createClient(); // Default connection settings
const getAsync = promisify(client.get).bind(client);

const listProducts = [
  { id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { id: 4, name: "Suitcase 1050", price: 550, stock: 5 },
];

function getItemById(id) {
  return listProducts.find((product) => product.id === id);
}

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock) : null;
}

app.get("/list_products", (req, res) => {
  res.json(
    listProducts.map((product) => ({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
    }))
  );
});

app.get("/list_products/:itemId", async (req, res) => {
  const item = getItemById(parseInt(req.params.itemId));
  if (!item) {
    return res.status(404).json({ status: "Product not found" });
  }

  const currentStock =
    (await getCurrentReservedStockById(item.id)) || item.stock;
  res.json({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
    currentQuantity: currentStock,
  });
});

app.get("/reserve_product/:itemId", async (req, res) => {
  const item = getItemById(parseInt(req.params.itemId));
  if (!item) {
    return res.status(404).json({ status: "Product not found" });
  }

  const currentStock =
    (await getCurrentReservedStockById(item.id)) || item.stock;
  if (currentStock <= 0) {
    return res
      .status(400)
      .json({ status: "Not enough stock available", itemId: item.id });
  }

  reserveStockById(item.id, currentStock - 1);
  res.json({ status: "Reservation confirmed", itemId: item.id });
});

app.listen(1245, () => {
  console.log("Server is listening on port 1245");
});
