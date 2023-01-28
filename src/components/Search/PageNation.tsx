import styled from 'styled-components';

interface Props {
  allpage: number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageNation = ({ allpage, page, setPage }: Props) => {
  return (
    <>
      <PageListBox>
        {allpage?.map((v: number, i: number) => {
          return (
            <PageBtn
              style={{
                color: v - 1 === page ? 'black' : 'gray',
                fontWeight: v - 1 === page ? 700 : 300,
              }}
              onClick={() => setPage(v - 1)}
              key={i}
            >
              {v}
            </PageBtn>
          );
        })}
      </PageListBox>
    </>
  );
};

export default PageNation;

const PageListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  padding: 3px;
  width: 100px;
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const PageBtn = styled.button`
  all: unset;
  padding-right: 4px;
  padding-left: 4px;
  cursor: pointer;
`;
