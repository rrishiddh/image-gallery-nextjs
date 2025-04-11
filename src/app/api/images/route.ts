import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

// GET images
export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 30,
    });
    console.log("Cloudinary response:", result);

    const images = result.resources.map((resource: any) => ({
      id: resource.asset_id,
      url: resource.secure_url,
      public_id: resource.public_id,
      title: resource.public_id.split('/').pop(),
      tags: resource.tags || [],
      created_at: resource.created_at,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}



// DELETE image
export async function DELETE(request: NextRequest) {
  try {
    const { public_id } = await request.json();
    
    await cloudinary.uploader.destroy(public_id);
    
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ message: 'Upload endpoint' });
}