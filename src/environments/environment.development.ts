import { sharedEnvironment } from "./shared.environment";

export const environment = {
  ...sharedEnvironment,
  production: false,

  apiServer: "http://127.0.0.1:5000",
  //apiServer: "https://marktplaatsgpt.fly.dev",
};
