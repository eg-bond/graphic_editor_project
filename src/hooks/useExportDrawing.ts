import { selectLayersList, selectWidthAndHeight } from '@/redux/history';
import { useAppSelector } from '@/redux/hooks';

export const useExportDrawing = () => {
  const layersList = useAppSelector(selectLayersList);
  const { width, height } = useAppSelector(selectWidthAndHeight);

  const exportDrawing = () => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext('2d');
    if (ctx) {
      layersList.forEach((layer) => {
        if (layer.canvasData) {
          const image = new Image();
          image.src = layer.canvasData;
          image.onload = () => {
            ctx.drawImage(image, 0, 0);
          };
        }
      });

      setTimeout(() => {
        const dataURL = offscreenCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${Date.now()}.png`;
        link.click();
      }, 1000);
    } else {
      console.error('Canvas context не найден!');
    }
  };

  return { exportDrawing };
};
