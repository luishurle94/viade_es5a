import styled from 'styled-components';

import {
  GradientBackground,
  Panel,
} from '@util-components';

export const TextEditorWrapper = styled(GradientBackground)`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-repeat: repeat;
  padding: 60px 0;
`;
export const TextEditorContainer = styled(Panel)`
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
  background-image: linear-gradient(135deg, #00F8A9 0%, #4F7DEC 50%, #00F8A9 100%);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  font-size: 50px;
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

export const Button = styled.button`
  max-width: 128px;
  display: inline-block;
  background-color: #4B7FEB;
  color: white;
  text-align: center;
  height: 30px;

  &:first-child {
    margin-right: 10px;
  }
  &:hover {
    color: white;
    background-color: #406dc9;
  }
`;

export const MainButton = styled.button`
  max-width: 128px;
  display: inline-block;
  background-color: #4B7FEB;
  color: white;
  text-align: center;
  height: 60px;
  margin: 10px 0;
  &:first-child {
    margin-right: 10px;
  }
  &:hover {
    color: white;
    background-color: #406dc9;
  }
`;

export const FriendDetailsWrapper = styled.div`
  display: grid;
  border: 0.5px groove;
  padding: 10px;
  font-size: 1.2rem;

  .content {
    display:flex;
    font-size: 1rem;
  }

  .p-grid {
    margin: 10px;
    margin-left: 20px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    flex: 1;
  }

  .flex-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .button {
    width: 90px;
  }

`;

export const Input = styled.input`
  margin: 5px;
  max-width: 400px;
`;

export const DialogContent = styled.div`
display: flex;
flex-direction: column;

.button {
  align-self: flex-end;
  margin: 10px;
  max-width: 150px;
}
`;