import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../services/api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import Loader from "../components/Loader";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      const data = await fetchAlbums();
      setAlbums(data);
      setLoading(false);
    };

    loadAlbums();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5 }} gutterBottom>
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

export default AlbumsPage;
