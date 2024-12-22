import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        API
      </Typography>
      <Button color="inherit" component={Link} to="/users">
        Users
      </Button>
      <Button color="inherit" component={Link} to="/albums">
        Albums
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
