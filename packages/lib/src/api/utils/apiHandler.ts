import { Request, Response, NextFunction } from "express";

export const apiHandler =
  (fun: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch((err) => next(err));
  };
