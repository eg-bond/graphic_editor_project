import { FC, useEffect } from 'react';
import { Modal, Form, InputNumber, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  resizeCanvas,
  selectLayersList,
  selectWidthAndHeight,
} from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { allowOnlyNumbers } from '@/utils/formatInteger';

interface CanvasResolutionModalProps {
  open: boolean;
  onClose: () => void;
}

export const CanvasResolutionModal: FC<CanvasResolutionModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { width, height } = useAppSelector(selectWidthAndHeight);
  const layersList = useAppSelector(selectLayersList);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ width, height });
    }
  }, [form, open, width, height]);

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();

      const updatedLayers = await Promise.all(
        layersList.map(
          (layer): Promise<LayerT> =>
            new Promise((resolve) => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');

              if (!context) {
                resolve(layer);
                return;
              }

              canvas.width = width;
              canvas.height = height;

              // Загружаем данные слоя
              const image = new Image();
              image.src = layer.canvasData;

              image.onload = () => {
                context.drawImage(image, 0, 0);

                const resizedCanvas = document.createElement('canvas');
                const resizedContext = resizedCanvas.getContext('2d');

                if (resizedContext) {
                  resizedCanvas.width = values.width;
                  resizedCanvas.height = values.height;

                  resizedContext.drawImage(canvas, 0, 0);

                  resolve({
                    ...layer,
                    canvasData: resizedCanvas.toDataURL(),
                  });
                } else {
                  resolve(layer);
                }
              };

              image.onerror = () => {
                resolve(layer);
              };
            }),
        ),
      );

      dispatch(resizeCanvas({
        width: values.width,
        height: values.height,
        updatedLayers,
      }));

      // Закрываем модальное окно
      onClose();
    } catch (error) {
      console.error('Error while resizing canvas layers:', error);
    }
  };

  return (
    <Modal
      title="Изменить размер холста"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Ширина"
          name="width"
          rules={[{ required: true, message: 'Введите ширину' }]}
        >
          <InputNumber
            min={200}
            max={5000}
            placeholder="Введите ширину"
            onKeyDown={allowOnlyNumbers}
          />
        </Form.Item>
        <Form.Item
          label="Высота"
          name="height"
          rules={[{ required: true, message: 'Введите высоту' }]}
        >
          <InputNumber
            min={200}
            max={5000}
            placeholder="Введите высоту"
            onKeyDown={allowOnlyNumbers}
          />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Отмена</Button>
          <Button type="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
