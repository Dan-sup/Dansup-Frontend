export const changeDateForm = (date: any) => {
  const dateList = date.split('-');

  return `${dateList[1]}/${dateList[2]}`;
};

export const changeDayForm = (
  mon: any,
  tue: any,
  wed: any,
  thu: any,
  fri: any,
  sat: any,
  sun: any,
) => {
  return `${mon ? '월' : ''}${tue ? '화' : ''}${wed ? '수' : ''}${
    thu ? '목' : ''
  }${fri ? '금' : ''}${sat ? '토' : ''}${sun ? '일' : ''}`;
};
