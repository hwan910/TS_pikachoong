import { useLocation } from 'react-router-dom';

export const Detailpage = () => {
  const { state } = useLocation();

  return <div>{state[0].statNm}</div>;
};
