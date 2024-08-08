import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCartByAccountId(req, res) {
  try {
    if (!parseInt(req.params.id))
      return res
        .json({
          error: { status: 400, message: "id berupa parameter url dibuthkan" },
        })
        .status(400);
    const getCartByAccountId = await prisma.cart.findFirst({
      where: { id: parseInt(req.params.id) },
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
    //
  } catch (err) {
    return console.log(err);
  }
}

async function createCart(req, res) {
  try {
    //
  } catch (err) {
    return console.log(err);
  }
}

async function deleteCart(req, res) {
  try {
    //
  } catch (err) {
    return console.log(err);
  }
}

export { getCartByAccountId, getAllCart, createCart, deleteCart };
