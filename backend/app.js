import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const formatPrice = (price) => `S/ ${Number(price).toFixed(2)}`;

const mapProduct = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: formatPrice(product.price),
  rawPrice: product.price,
  tag: product.tag,
  imageKey: product.imageKey,
  stock: product.stock,
  category: product.category.name,
  categoryId: product.categoryId,
  storeId: product.storeId,
  storeName: product.store.name,
});

app.get("/", (req, res) => {
  return res.status(200).json({ mensaje: "Backend Velmora funcionando" });
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudieron obtener las categorias" });
  }
});

app.get("/api/categories/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "El id debe ser numerico" });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { active: true },
          include: { category: true, store: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Categoria no encontrada" });
    }

    return res.status(200).json({
      ...category,
      products: category.products.map(mapProduct),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudo obtener la categoria" });
  }
});

app.get("/api/products", async (req, res) => {
  const categoryIdParam = req.query.categoryId;
  const trendingParam = req.query.trending;
  const where = { active: true };

  if (categoryIdParam !== undefined) {
    const categoryId = Number(categoryIdParam);

    if (!Number.isInteger(categoryId)) {
      return res.status(400).json({ error: "categoryId debe ser numerico" });
    }

    where.categoryId = categoryId;
  }

  if (trendingParam !== undefined) {
    if (trendingParam !== "true" && trendingParam !== "false") {
      return res.status(400).json({ error: "trending debe ser true o false" });
    }

    where.trending = trendingParam === "true";
  }

  try {
    const products = await prisma.product.findMany({
      where,
      include: { category: true, store: true },
      orderBy: { id: "asc" },
    });

    return res.status(200).json(products.map(mapProduct));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudieron obtener los productos" });
  }
});

app.get("/api/products/trending", async (req, res) => {
  const categoryIdParam = req.query.categoryId;
  const where = { active: true, trending: true };

  if (categoryIdParam !== undefined) {
    const categoryId = Number(categoryIdParam);

    if (!Number.isInteger(categoryId)) {
      return res.status(400).json({ error: "categoryId debe ser numerico" });
    }

    where.categoryId = categoryId;
  }

  try {
    const products = await prisma.product.findMany({
      where,
      include: { category: true, store: true },
      orderBy: { id: "asc" },
    });

    return res.status(200).json(products.map(mapProduct));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudieron obtener las tendencias" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Velmora funcionando en http://localhost:${port}`);
});
