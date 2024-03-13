export enum Organization {
  US = "US",
  CA = "CA",
}

export const requestHeaders = {
  [Organization.US]: { Authorization: `apikey ${process.env.API_KEY_US}` },
  [Organization.CA]: {
    Authorization: `apikey ${process.env.API_KEY_CANADA}`,
  },
};
