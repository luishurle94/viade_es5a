import styled from 'styled-components';

export const Gradient = styled.div`
  background-image: linear-gradient(#00F8A9, #4F7DEC);
  background-repeat: no-repeat;
  box-sizing: border-box;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('img/background-pattern2.svg');
    filter: opacity(30%);
  }
`;
