//Theme provider -> css baseline ->header component ->main -> footer
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/NavBar";
import Main from "../components/Main";
import Footer from "../components/Footer";
const Layout = ({ children }) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Main>{children}</Main>
      <Footer />
    </ThemeProvider>
  );
};
export default Layout;
