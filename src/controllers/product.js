import { PrismaClient } from "@prisma/client";
import { trimmed } from "../utils/validation.js";
const prisma = new PrismaClient();

async function getProduct(req, res) {
  try {
    const getProduct = await prisma.product.findMany();
    return res.json({ status: 200, data: getProduct }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

async function getProductById(req, res) {
  try {
    const getProduct = await prisma.product.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    // const getProductImage = await prisma.product_images.findFirst({
    //   where: { product_id: getProduct.id },
    // });
    if (getProduct)
      return res.json({ status: 200, data: getProduct }).status(200);
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
    const {
      product_name,
      product_price,
      product_description,
      quantity,
      soldout,
    } = req.body;
    if (product_name && product_price && product_description) {
      const upProduct = await prisma.product.create({
        data: {
          product_name: product_name,
          product_price: parseInt(product_price),
          product_description: product_description,
          product_images: req.file.filename,
          quantity: parseInt(quantity),
          soldout: parseInt(soldout),
        },
      });
      if (upProduct)
        return res.json({ status: 201, data: upProduct }).status(200);
      else return res.json({ error: { message: "Product tidak terupload" } });
    } else
      return res.json({ error: { message: "Data tidak lengkap" } }).status(400);
  } catch (err) {
    return console.log(err);
  }
}

async function updateProduct(req, res) {
  try {
    const { product_name, product_price, product_description, quantity } =
      req.body;
    if (product_name && product_price && product_description) {
      const data = await prisma.product.findFirst({
        where: { id: parseInt(req.params.id) },
      });
      const updateProduct = await prisma.product.update({
        where: { id: parseInt(req.params.id) },
        data: {
          product_name: product_name || data.product_name,
          product_price: product_price || data.product_price,
          product_description: product_description || data.product_description,
          quantity: parseInt(quantity),
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

async function upQuantityProudct(req, res) {
  const { soldout } = req.body;
  try {
    const getData = prisma.product.findFirst({
      where: { id: parseInt(req.params.product_id) },
    });
    const data = prisma.product.update({
      where: { id: parseInt(req.params.product_id) },
      data: {
        soldout: parseInt(soldout),
        quantity: getData.quantity - parseInt(soldout),
      },
    });
    if (data) return res.json({ status: 200, data });
    else
      return res.json({
        error: { status: 400, message: "data tidak diperbarahui" },
      });
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
  upQuantityProudct,
};
