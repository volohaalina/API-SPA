import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../services/api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import Loader from "../components/Loader";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5 }} gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            component={Link}
            to={`/users/${user.id}`}
            sx={{ borderBottom: "1px solid #ddd", py: 1 }}
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UsersPage;
