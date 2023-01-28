import styled from 'styled-components';
import Header from './Header/Header';

const Layout = ({ children }: any) => {
  return (
    <Wrap>
      <Header />
      <Container>{children}</Container>
    </Wrap>
  );
};

export default Layout;

// styled-components
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
