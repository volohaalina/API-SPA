import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserById, fetchAlbumsByUser } from "../services/api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@mui/material";
import Loader from "../components/Loader";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserById(id);
        const albumsData = await fetchAlbumsByUser(id);
        setUser(userData);
        setAlbums(albumsData);
        setError(null);
      } catch (err) {
        setError("User not found");
        setUser(null);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/users"
        >
          Go Back to Users
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5 }} gutterBottom>
        {user.name}
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>
        Website:{" "}
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      </Typography>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Albums
      </Typography>
      <List>
        {albums.map((album) => (
          <ListItem
            key={album.id}
            component={Link}
            to={`/albums/${album.id}`}
            sx={{ borderBottom: "1px solid #ddd", py: 1 }}
          >
            <ListItemText primary={album.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserDetailPage;
