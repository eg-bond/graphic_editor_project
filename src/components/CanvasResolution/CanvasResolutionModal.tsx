import { FC, useEffect, useState } from 'react';
import { Modal, Form, InputNumber, Button, Switch, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resizeCanvas, selectLayersList, selectWidthAndHeight } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { allowOnlyNumbers } from '@/utils/formatInteger';
import { WIDTH_AND_HEIGHT_VALIDATION_RULES } from '@/utils/constants';

const { Text } = Typography;

interface CanvasResolutionModalProps {
  open: boolean;
  onClose: () => void;
}

export const CanvasResolutionModal: FC<CanvasResolutionModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { width, height } = useAppSelector(selectWidthAndHeight);
  const layersList = useAppSelector(selectLayersList);

  const [keepRatio, setKeepRatio] = useState(true);
  const aspectRatio = width / height;

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ width, height });
    }
  }, [form, open, width, height]);

  const handleWidthChange = (newWidth: number | null) => {
    if (newWidth === null) return;
    if (keepRatio) {
      form.setFieldsValue({ height: Math.round(newWidth / aspectRatio) });
    }
  };

  const handleHeightChange = (newHeight: number | null) => {
    if (newHeight === null) return;
    if (keepRatio) {
      form.setFieldsValue({ width: Math.round(newHeight * aspectRatio) });
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

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
        <div className="flex items-center gap-2 mb-4">
          <Text strong>Сохранить пропорции</Text>
          <Switch checked={keepRatio} onChange={setKeepRatio} />
        </div>

        {/* Поля для ширины и высоты */}
        <Form.Item
          label="Ширина"
          name="width"
          rules={WIDTH_AND_HEIGHT_VALIDATION_RULES}
        >
          <InputNumber
            placeholder="Введите ширину"
            onKeyDown={allowOnlyNumbers}
            onChange={handleWidthChange}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Высота"
          name="height"
          rules={WIDTH_AND_HEIGHT_VALIDATION_RULES}
        >
          <InputNumber
            placeholder="Введите высоту"
            onKeyDown={allowOnlyNumbers}
            onChange={handleHeightChange}
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* Кнопки */}
        <div className="flex justify-center mt-4 gap-4">
          <Button onClick={onClose}>Отмена</Button>
          <Button type="primary" onClick={handleSave}>Сохранить</Button>
        </div>
      </Form>
    </Modal>
  );
};
