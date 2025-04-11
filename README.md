# NextGen Image Gallery

A simple image gallery web application with upload and delete functionality, built using AI with Next.js, TypeScript and Material UI.

## Live Demo

[Live Demo](https://image-gallery-nextjs-rrishiddh.vercel.app/)

## GitHub Repository

[GitHub Repository](https://github.com/rrishiddh/image-gallery-nextjs)

## Features

- Upload single/multiple images using Cloudinary
- Display uploaded images in a responsive grid
- Click on images to open a larger preview
- Delete images with confirmation popup
- Pagination with "Load More" button
- Search functionality to filter images by title or tags
- Fully responsive design
- Basic header and footer with Material UI

## Technologies Used

- **Next.js 15**
- **TypeScript**
- **Material UI** 
- **Cloudinary** 
- **React Hooks**

## Getting Started

### Prerequisites

- Node.js 
- npm or yarn
- Cloudinary account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/image-gallery.git
   cd image-gallery
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Cloudinary credentials
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Set up Cloudinary upload preset
   - Log in to your Cloudinary dashboard
   - Go to Settings > Upload
   - Scroll down to "Upload presets"
   - Click "Add upload preset"
   - Set "Mode" to "Unsigned"
   - Set "Preset name" to "gallery_upload"
   - Save the preset

5. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── images/
│   │   │   ├── route.ts         # API routes for images
│   ├── components/
│   │   ├── Header.tsx           # Header component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── ImageGrid.tsx        # Grid to display images
│   │   ├── ImageModal.tsx       # Modal for image preview
│   │   ├── UploadButton.tsx     # Button to upload images
│   │   ├── DeleteConfirmation.tsx # Confirmation dialog
│   │   ├── SearchBar.tsx        # Search functionality
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
├── utils/
│   ├── cloudinary.ts            # Cloudinary utilities
├── types/
│   ├── image.ts                 # Type definitions
```

## Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

Then, to start the production server:

```bash
npm start
# or
yarn start
```

## Notes for Development

- This project uses Next.js App Router for routing
- Material UI is used for the UI components
- Images are stored and managed using Cloudinary
- The application is fully responsive and works on all device sizes

## Future Improvements

- Add user authentication
- Add image categorization and collections
- Add image editing functionality
- Implement drag and drop for image uploads
