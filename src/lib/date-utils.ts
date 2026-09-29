/**
 * Utility functions for safe date formatting across news, NFOs, IPOs, and CMS
 */

export function formatDisplayDate(dateStr?: string | null, fallback = 'TBA'): string {
  if (!dateStr || dateStr === 'null' || dateStr === 'undefined') return fallback;
  
  const trimmed = dateStr.trim();
  if (!trimmed) return fallback;

  // Try parsing ISO or standard date formats
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // If already a human-readable string like "12 October 2026", clean and return
  const cleaned = trimmed.replace(/\bnull\b/gi, '').trim();
  return cleaned || fallback;
}

export function formatInputDate(dateStr?: string | null): string {
  if (!dateStr || dateStr === 'null' || dateStr === 'undefined') return '';
  const parsed = new Date(dateStr.trim());
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }
  return '';
}
