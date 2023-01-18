export interface RefreshAccessMutationSchemaResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    prefixToken: string;
  };
}

export const refreshAccessMutationSchema = `
  mutation RefreshAccess {
    response: refreshAccess {
      accessToken
      refreshToken
      prefixToken
    }
  }
`;
