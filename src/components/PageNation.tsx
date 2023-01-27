interface Props {
  allpage: number[];
}

const PageNation = ({ allpage }: Props) => {
  return (
    <>
      <div>
        {allpage?.map((v: any, i: number) => {
          return <button key={i}>{v}</button>;
        })}
      </div>
    </>
  );
};

export default PageNation;
