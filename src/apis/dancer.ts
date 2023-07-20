import client from './client';

//필터링한 댄서 리스트 get
export const getFilteredDancerList = async (input: any) => {
  const response = await client.get('/danceclasses/filters', {
    params: {
      nickname: input.typingValue,
    },
  });
  return response.data;
};
