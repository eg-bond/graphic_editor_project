import { selectLayersList, selectWidthAndHeight } from '@/redux/history';
import { useAppSelector } from '@/redux/hooks';

export const useExportDrawing = () => {
  const layersList = useAppSelector(selectLayersList);
  const { width, height } = useAppSelector(selectWidthAndHeight);

  const exportDrawing = async () => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context не найден!');
      return;
    }

    try {
      // First, load all images and store them in an array with their indices
      const loadedImages = await Promise.all(
        layersList.map(async (layer, index) => {
          if (!layer.canvasData) return null;

          return new Promise<{
            image: HTMLImageElement; index: number;
          }>((resolve) => {
            const image = new Image();
            image.onload = () => {
              resolve({ image, index });
            };
            image.src = layer.canvasData;
          });
        }),
      );

      // Then draw the images in reverse order (bottom to top)
      // Filter out null values and sort by index
      loadedImages
        .filter((item): item is {
          image: HTMLImageElement; index: number;
        } => item !== null)
        .sort((a, b) => b.index - a.index) // Reverse order: last layer first
        .forEach(({ image }) => {
          ctx.drawImage(image, 0, 0);
        });

      // Create and trigger download
      const dataURL = offscreenCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${Date.now()}.png`;
      link.click();

      // Cleanup
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error exporting drawing:', error);
    }
  };

  return { exportDrawing };
};
