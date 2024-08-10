import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getFavoriteAccountId(req, res) {
  try {
    // const getFavorite = await prisma.product.findMany({ where: {} });
    const getFavorite = await prisma.favorite.findMany({
      where: { account_id: parseInt(req.params.account_id) },
    });
    if (getFavorite.length > 0)
      return res.json({ data: getFavorite }).status(200);
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

    const validate = await prisma.favorite.findFirst({
      where: { product_id, account_id, email },
    });

    console.log(validate);
    if (validate) return res.json({ validate });

    if (product_id && account_id && email) {
      const getProductData = await prisma.product.findFirst({
        where: { id: parseInt(product_id) },
      });
      const uploadFavorite = await prisma.favorite.create({
        data: {
          product_id,
          account_id,
          email,
          product_image: getProductData.product_images,
          product_name: getProductData.product_name,
          product_price: getProductData.product_price,
        },
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
    const deleteFavorite = await prisma.favorite.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (deleteFavorite)
      return res.json({ status: "Deleted", data: deleteFavorite }).status(200);
    else
      return res.json({
        error: { status: 400, message: "product kesukaan tidak terhapu" },
      });
  } catch (err) {
    return console.log(err);
  }
}

export { getFavoriteAccountId, deleteFavorite, createFavorite };
