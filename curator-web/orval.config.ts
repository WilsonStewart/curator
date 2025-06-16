import { defineConfig } from "orval";

export default defineConfig({
  "curator-api": {
    input: "http://localhost:4000/api/openapi.json",
    output: {
      mode: "tags-split",
      target: "./src/lib/api-client/",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "http://localhost:4000/api",
    },
  },
});
