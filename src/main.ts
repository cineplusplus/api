import express, {
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
} from "express";
import cors from "cors";
import { RegisterRoutes } from "../routes/routes";
import NodeMediaServer from "node-media-server";
import config from "./services/streaming/config";
import swaggerUi from "swagger-ui-express";

export function main() {
  const app = express();
  const port = 3000;

  const nms = new NodeMediaServer(config);

  app.use(cors());
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  app.use(
    "/docs",
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import("../annotation/swagger.json"))
      );
    }
  );

  RegisterRoutes(app);
  nms.run();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
