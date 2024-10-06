import React, { useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import {lightTheme , darkTheme} from "./utils/Themes";
import './index.css';
import Sidebar from './components/Sidebar';


const Container = styled.div`
  display: flex;
  background: ${({theme})=> theme.bg};
  width:100%;
  height : 100vh;
  overflow-x:hidden;
  overflow-y: hidden;
`;
function App() {
  //hooks
  const [darkMode,setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container>
      <Sidebar/>
      MG Productions</Container>
    </ThemeProvider>
  );
}

export default App;
