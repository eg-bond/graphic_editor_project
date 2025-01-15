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
  layersList: LayerT[],
  activeLayerIndex: number,
  // setLayersState: React.Dispatch<React.SetStateAction<LayerT[]>>,
  // composeLayers: () => HTMLCanvasElement | undefined,
) => {
  const d = useAppDispatch();
  const saveCanvasData = (): void => {
    const canvas = canvasRefs.current[activeLayerIndex];
    if (!canvas) return;

    // Get the canvas data as a base64 string
    const canvasData = canvas.toDataURL('image/png');

    d(addDrawing({ canvasData }));
  };

  const loadCanvasData = (): void => {
    Object.keys(canvasRefs.current).forEach((index) => {
      const canvas = canvasRefs.current[index];
      const context = contextRefs.current[index];
      if (!canvas || !context) return;

      // Get the saved data from local layers state
      const savedData = layersList[+index].canvasData;

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
