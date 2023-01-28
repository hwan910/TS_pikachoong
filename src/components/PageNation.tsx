interface Props {
  allpage: number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageNation = ({ allpage, page, setPage }: Props) => {
  return (
    <>
      <div>
        {allpage?.map((v: number, i: number) => {
          return (
            <button
              style={{
                color: v - 1 === page ? 'black' : 'gray',
                fontWeight: v - 1 === page ? 700 : 300,
              }}
              onClick={() => setPage(v - 1)}
              key={i}
            >
              {v}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default PageNation;
