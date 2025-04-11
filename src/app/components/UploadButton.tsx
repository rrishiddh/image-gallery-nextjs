'use client';

import { useState, useRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface UploadButtonProps {
  onUploadSuccess: () => void;
}

export default function UploadButton({ onUploadSuccess }: UploadButtonProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setLoading(true);
    
    try {
      const uploadPromises = Array.from(files).map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'gallery_upload');        
        return fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        }).then(res => {
          if (!res.ok) {
            throw new Error(`Upload failed with status: ${res.status}`);
          }
          return res.json();
        });
      });
      
      await Promise.all(uploadPromises);
      console.log('Upload successful');
      onUploadSuccess();
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Make sure your Cloudinary configuration is correct.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleUpload}
      />
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <CloudUploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Images'}
      </Button>
    </>
  );
}