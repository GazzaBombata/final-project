import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


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

export const NavSpan = styled.span`

`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$align || 'stretch'};
  gap: ${props => props.$gap || '0px'};
  max-width: ${props => props.$maxWidth || 'none'};
  width: ${props => (props.$fitContent ? 'fit-content' : 'auto')};

  @media (max-width: 768px) {
    align-items: center;
    max-width: 100%;
    width: 100%;
  }
`;

export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  max-width: ${props => props.maxWidth || 'none'};
  min-width: ${props => props.minWidth || 'none'};
  max-height: 100%;
  width: ${props => (props.fitContent ? 'fit-content' : 'auto')};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'auto')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HorizontalLeftAlignContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || 'center'};
  gap: 10px;
  justify-content: flex-start;
  max-width: ${props => props.maxWidth || 'none'};
  min-width: ${props => props.minWidth || 'none'};
  width: ${props => (props.fitContent ? 'fit-content' : 'auto')};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'auto')};
`;

export const WrappableHorizontalLeftAlignContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || 'center'};
  gap: 10px;
  justify-content: flex-start;
  max-width: ${props => props.maxWidth || 'none'};
  min-width: ${props => props.minWidth || 'none'};
  width: ${props => (props.fitContent ? 'fit-content' : 'auto')};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'auto')};

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    align-items: center;
    justify-content: center;
  }
`;


export const StyledH1 = styled.h1`
  font-size: 2em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledWhiteH1 = styled.h1`
  font-size: 2em;
  font-family: 'Playfair Display', serif;
  color: white;
`;

export const StyledH2 = styled.h2`
  font-size: 1.5em;
  font-family: 'Playfair Display', serif;
  color: #000000;
`;

export const StyledWhiteH2 = styled.h2`
  font-size: 1.5em;
  font-family: 'Playfair Display', serif;
  color: white;
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
  font-family: 'Libre Franklin', sans-serif;
  color: #000000;
`;

export const CenteredWhiteP = styled.p`
  font-size: 1em;
  text-align: center;
  font-family: 'Libre Franklin', sans-serif;
  color: white;
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

  display: inline-block;
  outline: none;
  cursor: pointer;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  height: 38px;
  min-width: 96px;
  min-height: 38px;
  border: none;
  color: #fff;
  background-color: rgb(88, 101, 242);
  transition: background-color .17s ease,color .17s ease;
  :hover {
      background-color: rgb(71, 82, 196);
  }
                
    
`;



export const SecondaryButton = styled.button`

  display: inline-block;
  outline: none;
  cursor: pointer;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  margin: 10px 10px;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  max-width: 100px;
  border: none;
  color: #fff;
  margin: ${props => props.margin || 'none'};
  background-color: #4f545c;
  transition: background-color .17s ease,color .17s ease;
                
`;

export const SecondaryLink = styled(Link)`

  display: inline-block;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  border-radius: 3px;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0px;
  width: fit-content;
  height: fit-content;
  border: none;
  color: #fff;
  background-color: #4f545c;
  transition: background-color .17s ease,color .17s ease;
  font-family: 'Libre Franklin', sans-serif;
                
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 100%
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
  max-width: 200px;
  height: 100%;
  left: 0;
  top: 0;
  padding: 20px 0;
  background-color: #f8f8f8;
  overflow: auto;
  font-family: 'Libre Franklin', sans-serif;
  color: #333;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }

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
  max-width: 800px;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const StyledLabel = styled.label`
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1em;
  color: #000000;
  margin-bottom: 5px;
  display: inline-block;
`;

export const StyledInput = styled.input`

  border-radius: 5px;
  background: rgb(249, 250, 250);
  border: 1px solid rgb(181, 189, 196);
  font-size: 16px;
  height: 30px;
  line-height: 24px;
  padding: 7px 8px;
  color: rgb(8, 9, 10);
  box-shadow: none;
  width: fit-content;
  max-width: ${props => props.$maxWidth || 'none'};
  :focus{
      background-color: #fff;
      border-color: #3b49df;
      box-shadow: 1px 1px 0 #3b49df;
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

export const CoverPhoto = styled.div`
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const ProfilePhoto = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: -50px;
  border: 3px solid white;
  z-index: 1;
`;

export const DetailBox = styled.div`
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

export const StyledHorizontalLeftAlignContainer = styled(HorizontalLeftAlignContainer)`
  flex-wrap: wrap;
  width: 100%;
`;

export const StyledImage = styled.img`
  max-height: 100vh;
  width: auto;
`;

export const StyledHorizontalContainer = styled(HorizontalContainer)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
`;

export const FinalSection = styled.section`
padding: 50px;
text-align: center;
max-width: 800px;
& > * {
  margin: 10px 0;
}
`;

export const Benefit = styled.div`
width: 200px;
margin: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
& > * {
  margin: 5px 0;
}
`;

export const HeroSection = styled.section`
  color: white;
  padding: 50px;
  text-align: center;
  position: relative;
  background-color: rgba(0,0,0,0.5);
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover;
    background-position: center;
    background-color: black;
    z-index: -1;
  }
`;

export const BenefitsSection = styled.section`
  background-color: white;
  padding: 50px;
  text-align: center;
`;

export const BenefitsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
// Add more styled components as needed