import client from './client';

//필터링한 댄서 리스트 get
export const getFilteredDancerList = async (typingValue: any) => {
  const response = await client.get('/danceclasses/filters', {
    params: {
      nickname: typingValue,
    },
  });
  return response.data;
};
