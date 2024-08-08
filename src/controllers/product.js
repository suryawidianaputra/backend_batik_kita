import { PrismaClient } from "@prisma/client";
import { trimmed } from "../utils/validation.js";
const prisma = new PrismaClient();

async function getProduct(req, res) {
  try {
    const getProduct = await prisma.product.findMany();
    const getProductImage = await prisma.product_images.findFirst({
      where: { product_id: getProduct.id },
    });
    if (getProduct && getProductImage)
      return res
        .json({ status: 200, data: getProduct, image: getProductImage })
        .status(200);
  } catch (err) {
    return console.log(err);
  }
}

async function getProductById(req, res) {
  try {
    const getProduct = await prisma.product.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    const getProductImage = await prisma.product_images.findFirst({
      where: { product_id: getProduct.id },
    });
    if (getProduct && getProductImage)
      return res
        .json({ status: 200, data: getProduct, image: getProductImage })
        .status(200);
    else
      return res.json({
        error: { status: 404, message: "product tidak ditemukan" },
      });
  } catch (err) {
    return console.log(err);
  }
}

async function createProduct(req, res) {
  try {
    const { product_name, product_price, product_description } = req.body;
    if (product_name && product_price && product_description) {
      const upProduct = await prisma.product.create({
        data: {
          product_name: product_name,
          product_price: product_price,
          product_description: product_description,
        },
      });
      if (upProduct) return res.json({ status: 201, data: upProduct });
      else
        return res
          .json({
            error: { status: 400, message: "data tidak terupload" },
          })
          .status(400);
    } else
      return res.json({
        error: { status: 400, message: "Data tidak lengkap" },
      });
  } catch (err) {
    return console.log(err);
  }
}

async function updateProduct(req, res) {
  try {
    const { product_name, product_price, product_description } = req.body;
    if (
      trimmed(product_name) &&
      trimmed(product_price) &&
      trimmed(product_description)
    ) {
      const data = await prisma.product.findFirst({
        where: { id: parseInt(req.params.id) },
      });
      const updateProduct = await prisma.product.update({
        where: parseInt(req.params.id),
        data: {
          product_name: product_name || data.product_name,
          product_price: product_price || data.product_price,
          product_description: product_description || data.product_description,
        },
      });
      if (updateProduct) return res.json({ status: 200, data: updateProduct });
      else res.json({ error: { status: 400, message: "Data tidak diupdate" } });
    } else
      return res
        .json({
          error: { status: 400, message: "Data tidak lengkap" },
        })
        .status(400);
  } catch (err) {
    return console.log(err);
  }
}

async function deleteProduct(req, res) {
  try {
    const deleteProduct = await prisma.product.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (deleteProduct) return res.json({ status: 200, data: deleteProduct });
    else
      return res
        .json({
          error: { status: 400, message: "Data tidak terhapus" },
        })
        .status(400);
  } catch (err) {
    return console.log(err);
  }
}

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
