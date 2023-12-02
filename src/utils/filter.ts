export const changeClassWayToK = (classWay: any) => {
  if (classWay == '원데이') {
    return 'OD';
  } else if (classWay == '정규반') {
    return 'R';
  } else if (classWay == '공연반') {
    return 'P';
  } else if (classWay == '전문반') {
    return 'M';
  } else if (classWay == '세션') {
    return 'S';
  }
};

export const changeClassLevelToK = (classWay: any) => {
  if (classWay == '베이직') {
    return 'BA';
  } else if (classWay == '초급') {
    return 'BE';
  } else if (classWay == '초중급') {
    return 'BM';
  } else if (classWay == '중급') {
    return 'M';
  } else if (classWay == '고급') {
    return 'A';
  }
};
