import { toPng } from 'html-to-image';

/**
 * Exports the appraisal card as a PNG image
 */
export async function exportAppraisalCard(
  elementId: string = 'appraisal-card',
  filename: string = 'appraisal-card.png'
): Promise<void> {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#000000',
      width: 1200,
      height: 630,
    });

    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error exporting appraisal card:', error);
    throw error;
  }
}


