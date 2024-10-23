import { PrismaClient } from "@prisma/client";
import { trimmed } from "../utils/validation.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function GET(req, res) {
  try {
    const { email, password } = req.body;
    const data = await prisma.users.findFirst({
      where: { email: email },
    });
    if (!data)
      return res
        .json({ error: { status: 400, message: "Email tidak valid" } })
        .status(400);

    if (bcrypt.compare(password, data.password))
      return res.json({
        status: 200,
        login: true,
        data: data,
      });
    else
      return res
        .json({ error: { status: 400, message: "Email tidak valid" } })
        .status(400);
  } catch (err) {
    return console.log(err);
  }
}

async function getAccountByEmail(req, res) {
  try {
    const email = req.params.email;
    const getAccountData = await prisma.users.findFirst({
      where: { email: email },
    });
    if (getAccountData.email)
      return res.json({ data: getAccountData }).status(200);
    else
      return res
        .json({
          error: {
            status: 404,
            message: "Data tidak ditemukan",
          },
        })
        .status(404);
  } catch (err) {
    return console.log(err);
  }
}

async function GetAllUsers(req, res) {
  try {
    const userData = await prisma.users.findMany();
    if (userData) return res.json({ data: userData });
    else
      return res
        .json({ error: { status: 404, message: "Data tidak ditemukan" } })
        .status(404);
  } catch (err) {
    return console.log(err);
  }
}

async function POST(req, res) {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const getEmail = await prisma.users.findFirst({ where: { email: email } });
    if (trimmed(username) && trimmed(email) && trimmed(password)) {
      if (!getEmail) {
        const postData = await prisma.users.create({
          data: {
            username,
            email,
            password: hash,
          },
        });
        if (postData.email)
          return res
            .status(200)
            .json({ status: 201, login: true, data: postData });
        else return res.json({ error: "Error" });
      } else
        return res.json({ error: { status: 400, message: "Email sudah ada" } });
    } else
      return res.json({ error: { status: 400, message: "Data tidak valid" } });
  } catch (err) {
    return console.log(err);
  }
}

async function PATCH(req, res) {
  try {
    const { password } = req.body;
    const data = await prisma.users.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    if (!trimmed(password))
      return res
        .json({
          error: { status: 400, message: "Password tidak cocok" },
        })
        .status(400);
    if (bcrypt.compare(password, data.password)) {
      const updateData = await prisma.users.update({
        where: { id: parseInt(req.params.id) },
        data: {
          password: trimmed(password)
            ? await bcrypt.hash(password, 10)
            : data.password,
        },
      });
      if (updateData) return res.json({ status: 200, data: updateData });
    }
  } catch (err) {
    return console.log(err);
  }
}

async function DELETE(req, res) {
  try {
    const deleteData = await prisma.users.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (deleteData)
      return res.json({ status: "deleted", data: deleteData }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

async function ADDRESS(req, res) {
  try {
    const { address, note, phoneNumber } = req.body;
    if (!(address && note && phoneNumber))
      return res
        .json({ error: { status: 400, message: "Data tidak lengkap" } })
        .status(400);
    const updata = await prisma.users.update({
      where: { email: req.params.email },
      data: { address: address, note: note, phoneNumber: phoneNumber },
    });
    if (updata) return res.json({ status: 200, data: updata }).status(200);
  } catch (err) {
    return console.log(err);
  }
}

async function PICTURE(req, res) {
  try {
    if (!req.file.path)
      return res
        .json({ error: { message: "File tidak diupload" } })
        .status(400);
    else {
      const upPitcture = await prisma.users.update({
        where: { email: req.params.email },
        data: { profilePitcure: req.file.filename },
      });
      if (upPitcture) return res.json({ data: upPitcture }).status(200);
    }
  } catch (err) {
    return console.log(err);
  }
}

export {
  GET,
  getAccountByEmail,
  POST,
  PATCH,
  DELETE,
  ADDRESS,
  PICTURE,
  GetAllUsers,
};
