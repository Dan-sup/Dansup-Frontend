import client from './client';

//전체 클래스 리스트 get
export const getAllClassList = async () => {
  const response = await client.get('/classes');
  return response.data.data;
};

//필터링한 클래스 리스트 get
export const getFilteredClassList = async (input: any) => {
  const response = await client.post('/classes/filters', input.filterValue, {
    params: {
      title: input.typingValue,
    },
  });
  return response.data.data;
};

//한 클래스 세부 get
export const getClass = async (classId: number) => {
  const response = await client.get(`/classes/${classId}`);
  return response.data.data;
};
