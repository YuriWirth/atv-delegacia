import { Request, Response } from "express";
import db from "../database/prisma.connection";

class Armas {
  public async create(req: Request, res: Response) {
    const { crimeId, tipo } = req.body;
    if (!crimeId) {
      return res
        .status(400)
        .json({ success: false, msg: "Informe o ID do crime" });
    }
    if (!tipo) {
      return res
        .status(400)
        .json({ success: false, msg: "Informe o tipo do arma" });
    }
    try {
      const armas = await db.armas.create({
        data: {
          crimeId,
          tipo,
        },
      });
      return res.status(200).json({
        success: true,
        msg: "Arma cadastrada com sucesso",
        data: armas,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const armas = await db.armas.findMany();
      return res.status(200).json({
        success: true,
        msg: "Armas listadas com sucesso",
        data: armas,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
}
export default Armas;
