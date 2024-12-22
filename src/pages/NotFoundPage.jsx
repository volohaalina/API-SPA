import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Container sx={{ textAlign: "center", mt: 10 }}>
    <Typography variant="h4" gutterBottom>
      Page Not Found
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/users">
      Go Back to Home
    </Button>
  </Container>
);

export default NotFoundPage;
