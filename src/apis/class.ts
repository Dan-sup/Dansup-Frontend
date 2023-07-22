import client from './client';

//클래스 리스트 get
export const getClassList = async () => {
  const response = await client.get('/danceclasses');
  return response.data;
};

//필터링한 클래스 리스트 get
export const getFilteredClassList = async (input: any) => {
  const response = await client.post(
    '/danceclasses/filters',
    {
      params: {
        word: input.typingValue,
      },
    },
    { data: { danceClassFilterDto: input.filterValue } },
  );
  return response.data;
};

//한 클래스 세부 get
export const getClass = async (classId: number) => {
  const response = await client.get(`/danceclasses/${classId}`);
  return response.data;
};

//한 클래스의 영상 get
export const getClassVideo = async (classId: number) => {
  const response = await client.get(`/danceclasses/${classId}/video`);
  return response.data;
};
