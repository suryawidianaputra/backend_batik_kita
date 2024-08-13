import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getProcessByAccountId(req, res) {
  try {
    const findUserProcess = await prisma.procces.findMany({
      where: { account_id: parseInt(req.params.account_id) },
    });
    if (findUserProcess) return res.json({ data: findUserProcess }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

async function getProcessByProcessId() {
  try {
    const findUserProcess = await prisma.procces.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    if (findUserProcess) return res.json({ data: findUserProcess }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

async function getAllProcess(req, res) {
  try {
    const filter = req.query.filter;
    const getProcess = await prisma.procces.findMany({
      where: filter !== "all" ? { status: filter } : undefined,
      orderBy: {
        id: "desc",
      },
    });
    if (getProcess) return res.json({ data: getProcess }).status(200);
    else
      return res.json({
        error: { message: "tidak dapat melakukan GET", filter },
      });
  } catch (err) {
    return console.log(err);
  }
}

async function createProcess(req, res) {
  try {
    const { product_id, account_id, email, status, quantity } = req.body;

    const getProduct = await prisma.product.findFirst({
      where: { id: parseInt(product_id) },
    });

    const getUser = await prisma.users.findFirst({ where: { id: account_id } });

    if (getProduct && getUser) {
      const upProcess = await prisma.procces.create({
        data: {
          product_id,
          account_id,
          email,
          status,
          quantity,
          price: getProduct.product_price * parseInt(quantity),
          product_name: getProduct.product_name,
          product_description: getProduct.product_description,
          product_image: getProduct.product_images,
        },
      });
      if (upProcess) return res.json({ data: upProcess }).status(201);
      else return res.json({ error: { message: "data tidak diUpload" } });
    } else
      return res.json({
        error: { status: 400, message: "Ada kesalahan dalam memproses" },
      });
  } catch (err) {
    return console.log(err);
  }
}

async function updateProcess(req, res) {
  try {
    const { status } = req.body;
    const updateStatus = await prisma.procces.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status,
      },
    });
    if (updateStatus) return res.json({ data: updateStatus }).status(200);
    else
      return res
        .json({ error: { message: "Tidak dapat mengupdate" } })
        .status(400);
  } catch (err) {
    return console.log(err);
  }
}

async function deleteProcess(req, res) {
  try {
    const deleteProcess = await prisma.procces.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (deleteProcess) return res.json({ data: deleteProcess }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

export {
  getProcessByAccountId,
  getAllProcess,
  createProcess,
  updateProcess,
  deleteProcess,
  getProcessByProcessId,
};
