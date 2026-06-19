import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Body, Controller, Get, NotFoundException, Param, Patch } from "@nestjs/common";
import { Obligation } from "../../utils/Interfaces";

const obligationsPath = join(process.cwd(), "data", "obligations.json");

@Controller("obligations")
export class ObligationsController {
  private readObligations(): Obligation[] {
    return JSON.parse(readFileSync(obligationsPath, "utf-8"));
  }

  private writeObligations(obligations: Obligation[]): void {
    writeFileSync(obligationsPath, `${JSON.stringify(obligations, null, 2)}\n`, "utf-8");
  }

  @Get()
  findAll(): Obligation[] {
    return this.readObligations();
  }

  @Patch(":title")
  updateStatus(@Param("title") title: string, @Body() body: { status: string }): Obligation[] {
    const obligations = this.readObligations();
    const obligation = obligations.find((obligation) => obligation.title === title);
    if (!obligation) {
      throw new NotFoundException("Obligation not found");
    }
    obligation.status = body.status;
    this.writeObligations(obligations);
    return obligations;
  }
}