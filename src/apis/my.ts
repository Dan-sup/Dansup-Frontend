import client from './client';

export const getMyInfo = async (accessToken: any) => {
  const response = await client.get('/mypage', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

//클래스 정보 업로드
export const postClassInfo = async (input: any) => {
  const response = await client.post(
    '/mypage/class',
    {
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
    },
    {
      headers: {
        Authorization: `Bearer ${input.accessToken}`,
      },
    },
  );
  return response.data;
};

//경력 조회
export const getPortfolio = async () => {
  const response = await client.get('/mypage/portfolio');
  return response.data;
};

//포트폴리오 영상
export const getPortfolioVideo = async () => {
  const response = await client.get('/mypage/portfolio/video');
  return response.data;
};

//수업
export const getClass = async () => {
  const response = await client.get('/mypage/class');
  return response.data;
};
