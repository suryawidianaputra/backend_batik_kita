import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getProductById(req, res) {
  try {
    // const { product_id } = req.body;
    if (!parseInt(req.params.product_id))
      return res.json({
        error: {
          status: 404,
          message: "product_id sebagai parameter dibuthkan",
        },
      });
    const getProductImage = await prisma.product_images.findFirst({
      where: { product_id: parseInt(req.params.product_id) },
    });
  } catch (err) {
    return console.log(err);
  }
}

async function createProduct(req, res) {
  try {
    const { product_id } = req.body;
    const get = await prisma.product.findFirst({
      where: { id: parseInt(product_id) },
    });
    if (!product_id)
      return res
        .json({ error: { status: 400, message: "product_id dibutuhkah" } })
        .status(400);
    if (get) {
      const createImage = await prisma.product_images.create({
        data: {
          product_id: parseInt(product_id),
          product_images: req.file.filename,
        },
      });
      if (createImage)
        return res.json({ status: 201, data: createImage }).status(400);
      else
        return res
          .json({
            error: { status: 400, message: "error saat upload file" },
          })
          .status(400);
    } else
      return res
        .json({ error: { status: 404, message: "Product tidak ditemukan" } })
        .status(404);
  } catch (err) {
    return console.log(err);
  }
}

export { getProductById, createProduct };
