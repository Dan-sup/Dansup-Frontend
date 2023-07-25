import client from './client';

export const getMyInfo = async (accessToken: any) => {
  const response = await client.get('/mypage', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
