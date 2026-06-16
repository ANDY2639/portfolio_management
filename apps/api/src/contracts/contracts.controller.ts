import { Controller, Get } from "@nestjs/common";
import { openApiDocument } from "./openapi";

@Controller()
export class ContractsController {
  @Get("openapi.json")
  getOpenApiDocument() {
    return openApiDocument;
  }
}
