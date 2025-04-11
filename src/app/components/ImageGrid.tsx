'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardMedia, 
  CardActions, 
  IconButton, 
  Box, 
  Typography,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageType } from '@/types/image';
import ImageModal from './ImageModal';
import DeleteConfirmation from './DeleteConfirmation';

interface ImageGridProps {
  searchQuery: string;
}

export default function ImageGrid({ searchQuery }: ImageGridProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ImageType | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/images?page=${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API response:", data); 
      
      if (!data.images || !Array.isArray(data.images)) {
        console.error("Invalid response format:", data);
        return;
      }
      
      if (page === 1) {
        setImages(data.images);
      } else {
        setImages(prevImages => [...prevImages, ...data.images]);
      }
      
      setHasMore(data.images.length > 0);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]); 

  useEffect(() => {
    if (searchQuery) {
      const filtered = images.filter(image => 
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (image.tags && Array.isArray(image.tags) && 
         image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(images);
    }
  }, [searchQuery, images]);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleDeleteClick = (event: React.MouseEvent, image: ImageType) => {
    event.stopPropagation();
    setImageToDelete(image);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;
    
    try {
      const response = await fetch('/api/images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_id: imageToDelete.public_id }),
      });
      
      if (response.ok) {
        setImages(images.filter(img => img.id !== imageToDelete.id));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    } finally {
      setDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {loading && page === 1 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : filteredImages.length === 0 ? (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" color="text.secondary">
            No images found
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredImages.map((image, idx) => (
              <Grid key={idx}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                    }
                  }}
                  onClick={() => handleImageClick(image)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={image.url}
                    alt={image.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardActions disableSpacing>
                    <Typography variant="body2" sx={{ flexGrow: 1, ml: 1 }}>
                      {image.title}
                    </Typography>
                    <IconButton 
                      aria-label="delete" 
                      onClick={(e) => handleDeleteClick(e, image)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {hasMore && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button 
                variant="outlined" 
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}

      <ImageModal 
        open={modalOpen} 
        image={selectedImage} 
        onClose={() => setModalOpen(false)} 
      />

      <DeleteConfirmation 
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={imageToDelete?.title || ''}
      />
    </>
  );
}