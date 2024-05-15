import { JWTData } from "@/utils/JWTManager";
import { Request } from "express";

declare global {
  interface RequestWithAuth extends Request {
    body: {
      readonly userData: JWTData; // JWTData from JWTManager
      [x: string | number | symbol]: unknown; // Can contain anything else
    };
  }
}
