import { LayerT } from '@/redux/history/historySlice';

export const useSaveAndLoad = (
  canvasRefs: React.MutableRefObject<{
    [key: string]: HTMLCanvasElement | null;
  }>,
  contextRefs: React.MutableRefObject<{
    [key: string]: CanvasRenderingContext2D;
  }>,
  LayersList: LayerT[],
) => {
  const loadCanvasData = (): void => {
    Object.keys(canvasRefs.current).forEach((index) => {
      const canvas = canvasRefs.current[index];
      const context = contextRefs.current[index];
      if (!canvas || !context) return;
      // Get the saved data from local layers st ate
      const savedData = LayersList[+index].canvasData;
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

  return { loadCanvasData };
};

// Другой вариант функции loadCanvasData, по идее должен быть лучше
// в плане перфоманса чем тот, что выше

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
