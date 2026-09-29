import { NextRequest, NextResponse } from 'next/server';
import { 
  getNewsItems, saveNewsItems, 
  getGalleryItems, saveGalleryItems 
} from '@/lib/cms-storage';
import { GalleryItem, NewsItem } from '@/lib/cms-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'news') {
      const items = getNewsItems();
      return NextResponse.json({ success: true, items });
    }

    if (type === 'gallery') {
      const items = getGalleryItems();
      return NextResponse.json({ success: true, items });
    }

    return NextResponse.json({ 
      success: true, 
      news: getNewsItems(), 
      gallery: getGalleryItems() 
    });
  } catch (error) {
    console.error('[API /api/cms GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve CMS content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, item } = body;

    if (!type || !item) {
      return NextResponse.json(
        { success: false, error: 'Missing type or item payload' },
        { status: 400 }
      );
    }

    if (type === 'news') {
      const current = getNewsItems();
      const existingIndex = current.findIndex((n) => n.id === item.id);
      let updated: NewsItem[];

      if (existingIndex >= 0) {
        // Update existing in-place
        updated = [...current];
        updated[existingIndex] = { ...updated[existingIndex], ...item };
      } else {
        // Prepend new item
        updated = [item, ...current];
      }

      saveNewsItems(updated);
      return NextResponse.json({ success: true, items: updated });
    }

    if (type === 'gallery') {
      const current = getGalleryItems();
      const existingIndex = current.findIndex((g) => g.id === item.id);
      let updated: GalleryItem[];

      if (existingIndex >= 0) {
        // Update existing in-place
        updated = [...current];
        updated[existingIndex] = { ...updated[existingIndex], ...item };
      } else {
        // Prepend new item
        updated = [item, ...current];
      }

      saveGalleryItems(updated);
      return NextResponse.json({ success: true, items: updated });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid content type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[API /api/cms POST Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save CMS item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Missing type or id query param' },
        { status: 400 }
      );
    }

    if (type === 'news') {
      const current = getNewsItems();
      const updated = current.filter((n) => n.id !== id);
      saveNewsItems(updated);
      return NextResponse.json({ success: true, items: updated });
    }

    if (type === 'gallery') {
      const current = getGalleryItems();
      const updated = current.filter((g) => g.id !== id);
      saveGalleryItems(updated);
      return NextResponse.json({ success: true, items: updated });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid content type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[API /api/cms DELETE Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete CMS item' },
      { status: 500 }
    );
  }
}
