import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCommentByProductId(req, res) {
  try {
    if (!parseInt(req.params.product_id))
      return res.json({
        error: { status: 400, message: "product_id dibutuhkan" },
      });
    const getCommentByProductId = await prisma.comments.findMany({
      where: { product_id: parseInt(req.params.product_id) },
    });
    if (getCommentByProductId.length)
      return res.json({ data: getCommentByProductId });
    else
      return res
        .json({
          data: [],
        })
        .status(404);
  } catch (err) {
    return console.log(err);
  }
}

async function createComment(req, res) {
  try {
    const { account_id, product_id, email, comments } = req.body;
    if (account_id && product_id && email && comments) {
      const updata = await prisma.comments.create({
        data: { account_id, product_id, email, comments },
      });
      console.log(updata);
      if (updata) return res.json({ data: updata, h: "H" }).status(200);
      else
        return res
          .json({
            error: { status: 400, message: "data tidak terupload" },
          })
          .status(400);
    } else
      return res.json({ error: { message: "Data tidak lengkap" } }).status(400);
    //
  } catch (err) {
    return console.log(err);
  }
}

async function updateComment(req, res) {
  try {
    const { comments } = req.body;
    if (!comments && parseInt(req.params.id))
      return res.json({
        status: 400,
        message: "data comment atau id url params dibutuhhkan",
      });
    else {
      const updata = await prisma.comments.update({
        where: { id: parseInt(req.params.id) },
        data: { comments },
      });
      if (updata) return res.json({ data: updata });
      else return res.json({ error: { message: "Tidak bisa diupdate" } });
    }
  } catch (err) {
    return console.log(err);
  }
}

async function deleteComment(req, res) {
  try {
    //
    const deleteComment = await prisma.comments.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (deleteComment)
      return res.json({ status: "deleted", data: deleteComment }).status(200);
    else return res.json({ error: { message: "Data tidak dihapus" } });
  } catch (err) {
    return console.log(err);
  }
}

export { getCommentByProductId, createComment, updateComment, deleteComment };
