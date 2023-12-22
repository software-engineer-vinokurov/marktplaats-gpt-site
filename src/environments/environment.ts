import { sharedEnvironment } from "./shared.environment";

export const environment = {
  ...sharedEnvironment,
  production: true,

  apiServer: "https://marktplaatsgpt.fly.dev",
};
