export function combineCanvasImages(
  canvas1Data: string, canvas2Data: string,
): Promise<string> {
  return new Promise((resolve) => {
    // Create a new canvas
    const resultCanvas = document.createElement('canvas');
    const ctx = resultCanvas.getContext('2d') as CanvasRenderingContext2D;

    // Create two image objects
    const img1 = new Image();
    const img2 = new Image();

    // Counter to track loaded images
    let loadedImages = 0;

    // Function to draw images once both are loaded
    const drawImages = () => {
      loadedImages++;
      if (loadedImages === 2) {
        // Set canvas size to match the images
        resultCanvas.width = Math.max(img1.width, img2.width);
        resultCanvas.height = Math.max(img1.height, img2.height);

        // Draw first image
        ctx.drawImage(img1, 0, 0);

        // Draw second image on top
        ctx.globalAlpha = 1; // You can adjust opacity if needed
        ctx.drawImage(img2, 0, 0);

        // Convert the result to data URL
        const combinedImageData = resultCanvas.toDataURL('image/png');
        resolve(combinedImageData);
      }
    };

    // Load the images
    img1.onload = drawImages;
    img2.onload = drawImages;

    img1.src = canvas1Data;
    img2.src = canvas2Data;
  });
}
