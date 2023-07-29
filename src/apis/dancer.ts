import client from './client';

//필터링한 댄서 리스트 get
export const getFilteredDancerList = async (typingValue: any) => {
  const response = await client.get('/profile', {
    params: {
      nickname: typingValue,
    },
  });
  return response.data.data;
};

//댄서경력 조회
export const getDancerPortfolio = async (id: any) => {
  const response = await client.get('/profile/${id}/portfolio');
  return response.data;
};

//댄서 포트폴리오 영상
export const getDancerPortfolioVideo = async (id: any) => {
  const response = await client.get('/profile/${id}/portfolio/video');
  return response.data;
};

//댄서 수업
export const getDancerClass = async (id: any) => {
  const response = await client.get('/profile/${id}/class');
  return response.data;
};
