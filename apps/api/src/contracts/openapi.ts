import { AppContract } from "@portfolio/contracts";
import { generateOpenApi } from "@ts-rest/open-api";

export const openApiDocument = generateOpenApi(
  AppContract,
  {
    info: {
      title: "Portfolio API",
      version: "0.1.0",
      description: "HTTP contract generated from @portfolio/contracts",
    },
  },
  {
    setOperationId: true,
  },
);
