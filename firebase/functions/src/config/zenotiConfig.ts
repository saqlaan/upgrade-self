export enum Organization {
  US = "US",
  CANADA = "CANADA",
}

export const requestHeaders = {
  [Organization.US]: { Authorization: `apikey ${process.env.API_KEY_US}` },
  [Organization.CANADA]: {
    Authorization: `apikey ${process.env.API_KEY_CANADA}`,
  },
};
