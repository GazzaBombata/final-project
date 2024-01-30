import styled from 'styled-components';

export const CenteredSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LeftAlignSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledH1 = styled.h1`
  font-size: 2em;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH2 = styled.h2`
  font-size: 1.5em;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH3 = styled.h3`
  font-size: 1.17em;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH4 = styled.h4`
  font-size: 1em;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH5 = styled.h5` 
  font-size: 0.83em;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledH6 = styled.h6`
  font-size: 0.67em;
  text-align: center;
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
  text-align: left;
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

export const StyledTableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

export const StyledSidebar = styled.div`
  position: fixed;
  width: 200px;
  height: 100%;
  left: 0;
  top: 0;
  padding: 20px;
  background-color: #f5f5f5;
  overflow: none;
`;

// Add more styled components as needed