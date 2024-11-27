import styled from 'styled-components';

export const SectionWrapper = styled.div`
    display: flex;
    margin: 0 100px;
    justify-content: center;
    margin-top: 50px;
`;

export const StyledImage = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    img {
        border-radius: 20px;
    }
`;

export const StyledRightSection = styled.div`
    margin: 0 60px;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 20px;
        font-weight: 500;
        line-height: 26px;
        text-align: left;
    }
`;

export const StyledText = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    text-align: left;
    width: 500px;
    height: auto;
    display: flex;
    color: #707070;
    margin-top: 10px;
`;

export const PriceSection = styled.div`
    display: flex;
    margin-top: 20px;
    font-size: 24px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
`;

export const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-right: 60px;

`;

// Новий стиль для вибору кількості місць
export const SeatsSelection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
  font-size: 18px;
  
  h3 {
    margin-right: 10px;
    font-weight: 500;
    color: #333;
  }
  
  .ant-input-number {
    margin-right: 10px;
    width: 80px;
  }
  
  .ant-btn {
    background-color: #1890ff;
    color: #fff;
    border: none;
    
    &:hover {
      background-color: #40a9ff;
    }
  }
`;
