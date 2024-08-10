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

async function createProcess(req, res) {
  try {
    const { product_id, account_id, email, status, quantity } = req.body;

    const getProduct = await prisma.product.findFirst({
      where: { id: parseInt(product_id) },
    });
    if (getProduct) {
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
    }
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

export { getProcessByAccountId, createProcess, updateProcess, deleteProcess };
