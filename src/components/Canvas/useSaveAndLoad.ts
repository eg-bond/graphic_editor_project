import { addDrawing } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { useAppDispatch } from '@/redux/hooks';

export const useSaveAndLoad = (
  canvasRefs: React.MutableRefObject<{
    [key: string]: HTMLCanvasElement | null;
  }>,
  contextRefs: React.MutableRefObject<{
    [key: string]: CanvasRenderingContext2D;
  }>,
  localLayers: LayerT[],
  activeLayerIndex: number,
) => {
  const d = useAppDispatch();

  const saveCanvasData = (): void => {
    const canvas = canvasRefs.current[activeLayerIndex];
    if (!canvas) return;

    // Get the canvas data as a base64 string
    const canvasData = canvas.toDataURL('image/png');

    d(addDrawing({ canvasData }));
    // d(updateLocalLayers({ index: activeLayerIndex, canvasData }));
  };

  const loadCanvasData = (): void => {
    Object.keys(canvasRefs.current).forEach((index) => {
      const canvas = canvasRefs.current[index];
      const context = contextRefs.current[index];
      if (!canvas || !context) return;

      // Get the saved data from local layers st ate
      const savedData = localLayers[+index].canvasData;

      // Create a new image with the saved data
      const image = new Image();
      image.onload = () => {
        // Clear the current canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the loaded image
        context.drawImage(image, 0, 0);
      };
      image.src = savedData;
    });
  };

  // const loadCanvasData = async (): Promise<void> => {
  //   for (const index of Object.keys(canvasRefs.current)) {
  //     const canvas = canvasRefs.current[index];
  //     const context = contextRefs.current[index];
  //     if (!canvas || !context) continue;

  //     const savedData = localLayers[+index].canvasData;

  //     // Create a blob from the base64 data
  //     const blob = await fetch(savedData).then(res => res.blob());
  //     // Create bitmap (hardware accelerated)
  //     const bitmap = await createImageBitmap(blob);

  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     context.drawImage(bitmap, 0, 0);

  //     // Optional: release the bitmap when done
  //     bitmap.close();
  //   }
  // };

  const clearCanvas = (): void => {
    Object.keys(canvasRefs.current).forEach((index) => {
      const canvas = canvasRefs.current[index];
      const context = contextRefs.current[index];
      if (!canvas || !context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  return { saveCanvasData, loadCanvasData, clearCanvas };
};
