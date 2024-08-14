import { Request, Response } from "express";
import db from "../database/prisma.connection";

class Crime {
  public async create(req: Request, res: Response) {
    const { criminosoId, codigo } = req.body;
    if (!criminosoId) {
      return res
        .status(400)
        .json({ success: false, msg: "ID do criminoso é obrigatório." });
    }

    if (!codigo) {
      return res
        .status(400)
        .json({ success: false, msg: "Código do crime é obrigatório." });
    }
    try {
      const crimes = await db.crimes.create({
        data: { criminosoId, codigo },
      });
      if (crimes) {
        return res
          .status(201)
          .json({ success: true, msg: "Crime cadastrado." });
      }
      return res
        .status(500)
        .json({ success: false, msg: "O crime não foi cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const crimes = await db.crimes.findMany();
      if (crimes) {
        return res
          .status(200)
          .json({ success: true, msg: "Crimes listados", data: crimes });
      }
      return res
        .status(404)
        .json({ success: false, msg: "Nenhum crime encontrado." });
    } catch (error) {}
  }
}

export default Crime;
