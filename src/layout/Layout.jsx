import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../components/top-navigation/NavBar";
import Main from "../components/Main";
import Footer from "../components/bottom-navigation/Footer";
const Layout = ({ children }) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Main>{children}</Main>
      <Footer />
    </ThemeProvider>
  );
};
export default Layout;
