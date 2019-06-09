import { Request, Response } from 'express';

export let get = (req: Request, res: Response) => {
  res.status(200).send({});
};