import client from './client';

export const register = async (info: any) => {
  const response = await client.post('/auth/sign-up', info.formData, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

export const logout = async (token: any) => {
  const response = await client.post(
    '/auth/sign-out',
    { refreshToken: token.refreshToken },
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );
  return response.data;
};
