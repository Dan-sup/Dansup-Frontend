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
export const postClassInfo = async (info: any) => {
  const response = await client.post('/mypage/class', info.formData, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//포토폴리오 업로드
export const postPortfolio = async (info: any) => {
  const response = await client.post('/mypage/portfolio/video', info.formData, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//경력 조회
export const getPortfolio = async (accessToken: any) => {
  const response = await client.get('/mypage/portfolio', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

//포트폴리오 영상
export const getPortfolioVideo = async (accessToken: any) => {
  const response = await client.get('/mypage/portfolio/video', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

//수업
export const getMyClass = async (accessToken: any) => {
  const response = await client.get('/mypage/class', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
