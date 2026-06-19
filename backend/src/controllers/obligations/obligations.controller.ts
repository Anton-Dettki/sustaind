import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Controller, Get } from "@nestjs/common";
import { Obligation } from "../../utils/Interfaces";

@Controller("obligations")
export class ObligationsController {
  @Get()
  findAll(): Obligation[] {
    const obligations: Obligation[] = JSON.parse(
        readFileSync(join(process.cwd(), "data", "obligations.json"), "utf-8"),
      );
    return obligations;
  }
}