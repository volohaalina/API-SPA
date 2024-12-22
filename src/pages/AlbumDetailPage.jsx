import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchAlbumById,
  fetchPhotosByAlbum,
  fetchUserById,
} from "../services/api";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Button,
  Box,
} from "@mui/material";
import Loader from "../components/Loader";

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAlbumDetails = async () => {
      setLoading(true);
      try {
        const albumData = await fetchAlbumById(id);
        const photosData = await fetchPhotosByAlbum(id);
        const userData = await fetchUserById(albumData.userId);

        setAlbum(albumData);
        setPhotos(photosData);
        setUser(userData);
        setError(null);
      } catch (err) {
        setError("Album not found");
        setAlbum(null);
        setPhotos([]);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadAlbumDetails();
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
          to="/albums"
        >
          Go Back to Albums
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">{album.title}</Typography>
      <Typography>
        Created by:{" "}
        <Link
          to={`/users/${user.id}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {user.name}
        </Link>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 3,
        }}
      >
        {photos.map((photo) => (
          <Box
            key={photo.id}
            sx={{
              flex: "1 1 calc(33.333% - 16px)", // ширина 1/3 для карточек, минус 2gap
              maxWidth: "calc(33.333% - 16px)",
            }}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={photo.thumbnailUrl}
                alt={photo.title}
              />
              <CardContent>
                <Typography variant="body2">{photo.title}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AlbumDetailPage;
