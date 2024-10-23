import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCartByAccountId(req, res) {
  try {
    if (!parseInt(req.params.account_id))
      return res
        .json({
          error: { status: 400, message: "id berupa parameter url dibuthkan" },
        })
        .status(400);
    const getCartByAccountId = await prisma.cart.findMany({
      where: { account_id: parseInt(req.params.account_id) },
    });
    if (getCartByAccountId)
      return res.json({ data: getCartByAccountId }).status(200);
    else
      return res
        .json({ error: { status: 404, message: "data tidak ditemukan" } })
        .status(404);
  } catch (err) {
    return console.log(err);
  }
}

async function getAllCart(req, res) {
  try {
    const getAll = await prisma.cart.findMany();
    if (req.query.key !== process.env.KEY1)
      return res
        .json({ error: { status: 401, message: "Unauthorized" } })
        .status(401);
    else return res.json({ data: getAll });
  } catch (err) {
    return console.log(err);
  }
}

async function createCart(req, res) {
  try {
    const { product_id, account_id, email } = req.body;
    if (!(product_id, account_id, email))
      return res.json({ error: { message: "data tidak lengkap" } }).status(400);
    const getProductData = await prisma.product.findFirst({
      where: { id: parseInt(product_id) },
    });
    if (!getProductData)
      return res.json({ error: { message: "Data tidak detemukan" } });
    else {
      const upData = await prisma.cart.create({
        data: {
          account_id: parseInt(account_id),
          product_id: parseInt(product_id),
          email: email,
          product_name: getProductData.product_name,
          product_image: getProductData.product_images,
          product_price: getProductData.product_price,
        },
      });
      if (upData) return res.json({ status: 201, data: upData }).status(201);
    }
  } catch (err) {
    return console.log(err);
  }
}

async function deleteCart(req, res) {
  try {
    const deleteCart = await prisma.cart.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (deleteCart) return res.json({ data: deleteCart }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

export { getCartByAccountId, getAllCart, createCart, deleteCart };
