interface Props {
  canvasElement: HTMLCanvasElement | null;
  width: number;
  height: number;
  data: string;
}

export const loadCanvasData = async ({
  canvasElement,
  width,
  height,
  data,
}: Props): Promise<void> => {
  const ctx = canvasElement?.getContext('2d');
  if (!ctx) return;
  // console.log(ctx);

  // Create a blob from the base64 data
  const blob = await fetch(data).then(res => res.blob());
  // Create bitmap (hardware accelerated)
  const bitmap = await createImageBitmap(blob);

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0);

  // Optional: release the bitmap when done
  bitmap.close();
};
