import client from './client';

export const register = async (info: any) => {
  const response = await client.post('/auth/sign-up', info.formData, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
