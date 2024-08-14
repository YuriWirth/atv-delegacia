import { Response, Request } from "express";
import db from "../database/prisma.connection";

class Criminoso {
  public async create(req: Request, res: Response) {
    const { idade, nome } = req.body;
    if (!idade) {
      return res.status(400).json({ error: "idade é obrigatório" });
    }
    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }
    try {
      const criminoso = await db.criminoso.create({ data: { idade, nome } });
      return res
        .status(200)
        .json({ success: true, msg: "Criminoso cadastrado.", data: criminoso });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const criminosos = await db.criminoso.findMany();

      return res
        .status(200)
        .json({ success: true, msg: "Criminosos listados.", data: criminosos });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
}

export default Criminoso;
