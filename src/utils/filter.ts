export const changeClassWayToK = (classWay: any) => {
  if (classWay == 'OD') {
    return '원데이';
  } else if (classWay == 'R') {
    return '정규반';
  } else if (classWay == 'P') {
    return '공연반';
  } else if (classWay == 'M') {
    return '전문반';
  } else if (classWay == 'S') {
    return '세션';
  }
};

export const changeClassLevelToK = (classWay: any) => {
  if (classWay == 'BA') {
    return '베이직';
  } else if (classWay == 'BE') {
    return '초급';
  } else if (classWay == 'BM') {
    return '초중급';
  } else if (classWay == 'M') {
    return '중급';
  } else if (classWay == 'A') {
    return '고급';
  }
};
