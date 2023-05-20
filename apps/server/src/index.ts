import { apolloServer, expressApp, httpServer } from "@/graphql/server";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

apolloServer.start().then(async () => {
  expressApp.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  const PORT = Number(process.env.PORT) || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
});
