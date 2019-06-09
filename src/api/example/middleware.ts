import { Request, Response, NextFunction } from "express";

export let canGet = (req: Request, res: Response, next: NextFunction) => { return next(); };