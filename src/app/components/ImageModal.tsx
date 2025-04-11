'use client';

import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { ImageType } from '@/types/image';

interface ImageModalProps {
  open: boolean;
  image: ImageType | null;
  onClose: () => void;
}

export default function ImageModal({ open, image, onClose }: ImageModalProps) {
  if (!image) return null;
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: '70vh' }}>
          <Image 
            src={image.url} 
            alt={image.title} 
            fill 
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}