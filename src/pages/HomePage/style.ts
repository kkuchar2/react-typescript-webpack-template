import styled from "styled-components";

export const StyledHomePage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
`;

export const StyledResponseBox = styled.div`
  width: 50%;
  min-width: 600px;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
  }
`;

export const StyledCatImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const titleTheme = {
    fontSize: '2.2em',
    textColor: '#ffffff'
};

export const responseTextTheme = {
    fontSize: '1.2em',
    textColor: '#ffffff',
    textAlign: 'left'
};