import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getFavoriteAccountId(req, res) {
  try {
    // const getFavorite = await prisma.product.findMany({ where: {} });
    const getFavorite = await prisma.favorite.findMany({
      where: { account_id: parseInt(req.params.id) },
    });
    if (getFavorite) return res.json({ data: getFavorite }).status(200);
    else
      return res
        .json({ error: { status: 404, message: "Data tidak ditemukan" } })
        .status(404);
  } catch (err) {
    return console.log(err);
  }
}

async function createFavorite(req, res) {
  try {
    const { product_id, account_id, email } = req.body;
    if (product_id && account_id && email) {
      const uploadFavorite = await prisma.favorite.create({
        data: { product_id, account_id, email },
      });
      if (uploadFavorite) return res.json({ data: uploadFavorite }).status(201);
      else
        return res.json({ error: { status: 400, message: "Tidak diupload" } });
    } else
      return res
        .json({ error: { status: 400, message: "Data tidak lengkap" } })
        .status(400);
  } catch (err) {
    return console.log(err);
  }
}

async function deleteFavorite(req, res) {
  try {
    //
  } catch (err) {
    return console.log(err);
  }
}

export { getFavoriteAccountId, deleteFavorite, createFavorite };
