import type { Layer } from '.';

export const useSaveAndLoad = (
  canvasRefs: React.MutableRefObject<{
    [key: string]: HTMLCanvasElement | null;
  }>,
  contextRefs: React.MutableRefObject<{
    [key: string]: CanvasRenderingContext2D;
  }>,
  layersState: Layer[],
  activeLayerIndex: number,
  setLayersState: React.Dispatch<React.SetStateAction<Layer[]>>,
  // composeLayers: () => HTMLCanvasElement | undefined,
) => {
  const saveCanvasData = (): void => {
    const canvas = canvasRefs.current[activeLayerIndex];
    if (!canvas) return;

    // Get the canvas data as a base64 string
    const canvasData = canvas.toDataURL('image/png');

    // Save to local layers state
    setLayersState((prevLayersState) => {
      const updatedLayersState = [...prevLayersState];
      updatedLayersState[activeLayerIndex].canvasData = canvasData;
      return updatedLayersState;
    });

    // Save to localStorage
    // try {
    //   localStorage.setItem('savedCanvasData', canvasData);
    //   console.log('Canvas data saved successfully');
    // } catch (error) {
    //   console.error('Error saving canvas data:', error);
    // }
  };

  const loadCanvasData = (): void => {
    Object.keys(canvasRefs.current).forEach((index) => {
      const canvas = canvasRefs.current[index];
      const context = contextRefs.current[index];
      if (!canvas || !context) return;

      // Get the saved data from localStorage
      // const savedData = localStorage.getItem('savedCanvasData');
      // if (!savedData) {
      //   console.log('No saved canvas data found');
      //   return;
      // }

      // Get the saved data from local layers state
      const savedData = layersState[+index].canvasData;

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
