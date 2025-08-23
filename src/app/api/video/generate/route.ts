import { NextRequest, NextResponse } from 'next/server';
import { videoApiManager } from '@/lib/videoApi';
import { VideoGenerationRequest } from '@/types/video';

export async function POST(request: NextRequest) {
  try {
    const body: VideoGenerationRequest = await request.json();
    
    // Validate required fields
    if (!body.modelId || !body.prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: modelId and prompt are required' },
        { status: 400 }
      );
    }

    // Generate video
    const result = await videoApiManager.generateVideo(body);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Video generation API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const provider = searchParams.get('provider');
    
    if (!id || !provider) {
      return NextResponse.json(
        { error: 'Missing required parameters: id and provider are required' },
        { status: 400 }
      );
    }

    // Get video status
    const result = await videoApiManager.getVideoStatus(id, provider);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Video status API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
