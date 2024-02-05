import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const CenteredSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: ${props => props.$maxWidth || 'none'};
  width: ${props => (props.$fitContent ? 'fit-content' : 'auto')};
`;

export const LeftAlignSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  max-width: ${props => props.$maxWidth || 'none'};
  width: ${props => (props.$fitContent ? 'fit-content' : 'auto')};
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$align || 'stretch'};
  max-width: ${props => props.$maxWidth || 'none'};
  width: ${props => (props.$fitContent ? 'fit-content' : 'auto')};
`;

export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  max-width: ${props => props.maxWidth || 'none'};
  width: ${props => (props.fitContent ? 'fit-content' : 'auto')};
`;

export const StyledH1 = styled.h1`
  font-size: 2em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH2 = styled.h2`
  font-size: 1.5em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH3 = styled.h3`
  font-size: 1.17em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH4 = styled.h4`
  font-size: 1em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH5 = styled.h5` 
  font-size: 0.83em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH6 = styled.h6`
  font-size: 0.67em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const CenteredP = styled.p`
  font-size: 1em;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const LeftAlignP = styled.p`
  font-size: 1em;
  font-family: 'Libre Franklin', sans-serif;
  color: #000000;
`;

export const LeftAlignGreyP = styled.p`
  font-size: 1em;
  text-align: left;
  font-family: 'Libre Franklin', sans-serif;
  color: #808080;
`;

export const PrimaryButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1em;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0.5em;
  width: fit-content;
`;

export const SecondaryButton = styled.button`
  color: #000000;
  background-color: #ffffff;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1em;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0.5em;
  width: fit-content;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const StyledTableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const StyledTableHeader = styled.thead`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

export const StyledSidebar = styled.aside`
  position: fixed;
  width: auto;
  max-width: 150;
  height: 100%;
  left: 0;
  top: 0;
  padding: 20px 0;
  background-color: #f8f8f8;
  overflow: auto;
  font-family: 'Libre Franklin', sans-serif;
  color: #333;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    padding: 10px 30px;

    &:hover {
        background-color: #ddd;
      }


    a {
      color: #333;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:active {
        color: #000;
      }
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  &.active {
    color: #007bff;
  }
`;

export const MainContentWithSideBar = styled.div`
  margin-left: 210px;
`;

export const StyledLabel = styled.label`
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1em;
  color: #000000;
  margin-bottom: 5px;
  display: inline-block;
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  font-family: 'Libre Franklin', sans-serif;
  color: #000000;
  max-width: 500px;
  border-color: ${props => props.isError ? 'red' : 'defaultBorderColor'};

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0,123,255,.5);
  }
`;

export const StyledFileInput = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  font-family: 'Libre Franklin', sans-serif;

  & input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  & .content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    font-family: 'Libre Franklin', sans-serif;
  }
`;
// Add more styled components as needed