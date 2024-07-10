import * as React from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
// import logo from "../../public/logo192.png";

const pages = ["Home", "Report", "Generate Label"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const MenuButton = styled(Button)(() => ({
  backgroundColor: "rgba(80, 89, 128, 0.7) !important",
  color: "white !important",
  fontWeight: "bold",
  marginRight: "1rem",
}));

function PNGIcon(props) {
  const { src, alt, ...other } = props;
  return (
    <IconButton
      {...other}
      sx={{
        width: 100,
        height: 100,
      }}
    >
      <img src="/logo192.png" alt={alt} />
    </IconButton>
  );
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event, page) => {
    if (page === "Home") {
      window.location.href = "/";
    } else if (page === "Report") {
      window.location.href = "/reports";
    } else if (page === "Generate Label") {
      const genLabel = async () => {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/generate_label`, {
            project_ids: ["1348"],
          });
        } catch (error) {
          throw new Error(error);
        }
      };
      genLabel().then(
        setTimeout(() => {
          alert("Generate success!");
        }, 1000)
      );
    }
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      style={{ boxShadow: "none", padding: "24px 0 0 0" }}
    >
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuButton key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuButton>
              ))}
            </Menu>
          </Box>
          <PNGIcon />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <MenuButton
                key={page}
                onClick={(event) => handleClick(event, page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </MenuButton>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
