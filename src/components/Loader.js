import Header from "./Header";
import Foot  from  "./ProgressBar"
import styled from 'styled-components';

export default function LoadPage() {
  return (
  <>
    <Header />
    <Background>
      <Wrapper>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif" alt="loading..." />
      </Wrapper>
    </Background>
    <Foot />
  </>
  );
}

const Wrapper = styled.div`
  margin-top: 70px;
  padding: 0 16px 0 16px;
  background: #f2f2f2;
  gap: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    margin-top: 180px;
    width: 100px;
  }
`;

const Background = styled.div`
  min-height: calc(100vh - 180px);
  width: 100vw;
  background: #f2f2f2;
`;