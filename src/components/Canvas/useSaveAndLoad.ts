import { ICanvasContextRefs } from '.';

export const useSaveAndLoad = (
  canvasRef: ICanvasContextRefs['canvasRef'],
  contextRef: ICanvasContextRefs['contextRef'],
  // composeLayers: () => HTMLCanvasElement | undefined,
) => {
  const saveCanvasData = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // const compositeCanvas = composeLayers();
    // if (!compositeCanvas) return;

    // Save as image
    // const canvasData = compositeCanvas.toDataURL();

    // Get the canvas data as a base64 string
    const canvasData = canvas.toDataURL('image/png');

    // Save to localStorage
    try {
      localStorage.setItem('savedCanvasData', canvasData);
      console.log('Canvas data saved successfully');
    } catch (error) {
      console.error('Error saving canvas data:', error);
    }
  };

  const loadCanvasData = (): void => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    // Get the saved data from localStorage
    const savedData = localStorage.getItem('savedCanvasData');
    if (!savedData) {
      console.log('No saved canvas data found');
      return;
    }

    // Create a new image with the saved data
    const image = new Image();
    image.onload = () => {
      // Clear the current canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the loaded image
      context.drawImage(image, 0, 0);
    };
    image.src = savedData;
  };

  const clearCanvas = (): void => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { saveCanvasData, loadCanvasData, clearCanvas };
};
