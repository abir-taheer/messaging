import { apolloServer } from "@/server/apollo";
import { applyMiddlewareToExpressApp } from "@/server/express";
import { httpServer } from "@/server/http";

apolloServer.start().then(async () => {
  await applyMiddlewareToExpressApp();

  const PORT = Number(process.env.PORT) || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
});
