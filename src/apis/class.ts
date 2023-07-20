import client from './client';

//수업 리스트 get
export const getClassList = async () => {
  const response = await client.get('/danceclasses');
  return response.data;
};

//필터링한 수업 리스트 get
export const getFilteredClassList = async (input: any) => {
  const response = await client.get('/danceclasses/filters', {
    params: {
      word: input.typingValue,
      danceClassFilterDto: input.filterValue,
    },
  });
  return response.data;
};

//한 수업 세부 get
export const getClass = async (classId: number) => {
  const response = await client.get(`/danceclasses/${classId}`);
  return response.data;
};

//한 수업의 영상 get
export const getClassVideo = async (classId: number) => {
  const response = await client.get(`/danceclasses/${classId}/video`);
  return response.data;
};
