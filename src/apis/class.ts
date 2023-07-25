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

//클래스 정보 업로드
export const postClassInfo = async (input: any) => {
  const response = await client.post('/mypage/class', {
    date: input.date,
    days: {
      fri: input.friday,
      mon: input.monday,
      sat: input.saturday,
      sun: input.sunday,
      thu: input.thursday,
      tue: input.tuesday,
      wed: input.wednesday,
    },
    detail1: input.classContent,
    detail2: input.classUser,
    detail3: input.classIntro,
    difficulty: input.classLevel,
    endTime: input.endTime,
    genres: [
      {
        genre: input.genre,
      },
    ],
    hashTag1: input.hashTag1,
    hashTag2: input.hashTag2,
    hashTag3: input.hashTag3,
    location: input.location,
    maxPeople: input.maxPeople,
    method: input.classWay,
    reserveLink: input.classLink,
    song: input.classSong,
    startTime: input.startTime,
    title: input.title,
    tuition: input.classFee,
    videoFile: input.url,
  });
  return response.data;
};
