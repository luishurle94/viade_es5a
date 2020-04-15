import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import styled from 'styled-components';

import { media } from '@utils';

export const TextEditorWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('/img/concentric-hex-pattern_2x.png');
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
  background-image: url('/img/pattern-geo.png'),
    linear-gradient(135deg, #7c4dff 0%, #18a9e6 50%, #01c9ea 100%);
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

export const Input = styled.input`
  margin: 5px;
`;

export const Label = styled.label`
  margin: 5px;
`;

export const Title = styled.label`
  font-size: 2rem;
  margin: 5px;
`;

export const TextArea = styled.textarea`
  margin: 5px;
`;

export const Form = styled.form`
  background-image: linear-gradient(#00F8A9, #4F7DEC), url('img/background-pattern2.svg');
  background-size: cover;
  padding: 20px 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  width: 130vw;
  height: 85vh;
  grid-gap: 20px 40px;
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
  
`;

export const Button = styled.button`
  max-width: 128px;
  display: inline-block;

  &:first-child {
    margin-right: 10px;
  }
`;

export const FullGridSize = styled.div`
  grid-column: span 1;
  text-align: left;
  margin-bottom: 50px;
  ${media.tablet`
    grid-column: span 2;
  `}
  p > span {
    font-weight: bold;
  }
`;

export const WebId = styled.div`
  padding: 20px 40px 0px 40px;
  position: relative;
  &:after {
    background-color: #d8d8d8;
    display: block;
    content: '';
    height: 1px;
    width: 100%;
    margin: 25px 0 0 0;
  }
  a {
    display: inline-block;
    word-break: break-all;
    margin-left: 10px;
  }
`;

export const AutoSaveNotification = styled.section`
  margin-bottom: 0px !important;
`;

export const MilestoneAccordion = styled.div`
    .accordion {
      background-color: #eee;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      border: none;
      text-align: left;
      outline: none;
      font-size: 15px;
      transition: 0.4s;
    }

    .active, .accordion:hover {
      background-color: #ccc; 
    }

    .panel {
      padding: 0 18px;
      display: none;
      background-color: white;
      overflow: hidden;
    }
`;

