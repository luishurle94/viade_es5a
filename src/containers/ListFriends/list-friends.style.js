import styled from 'styled-components';

export const TextEditorWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 60px 0;
`;
export const TextEditorContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;
export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('img/pattern-geo.png'),
    linear-gradient(135deg, #7c4dff 0%, #18a9e6 50%, #01c9ea 100%);
  background-repeat: repeat, no-repeat;
  padding: 20px 10px;
  font-size: 30px;
  p {
    color: white;
  }
  .edit-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1rem;
  }
`;