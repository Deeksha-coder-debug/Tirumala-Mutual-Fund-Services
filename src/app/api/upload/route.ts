import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File | null = formData.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    // Size limit: 25MB for video/images
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File exceeds maximum limit of 25MB' }, { status: 400 });
    }

    // Allowed MIME types
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf'
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `File type ${file.type} is not supported. Please upload JPG, PNG, WebP, MP4, or WebM.` 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target upload folder in public
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Generate safe clean filename with timestamp
    const ext = path.extname(file.name) || (file.type.startsWith('video') ? '.mp4' : '.jpg');
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeName = `${Date.now()}_${baseName}${ext}`;
    const filePath = path.join(uploadDir, safeName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeName,
      size: file.size,
      type: file.type,
      message: 'File uploaded and published successfully!',
    });
  } catch (error) {
    console.error('API /upload error:', error);
    return NextResponse.json({ error: 'Server error processing file upload' }, { status: 500 });
  }
}
