import { FC, useEffect } from 'react';
import { Modal, Form, InputNumber, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateResolution, saveToLocalStorage } from '@/redux/project/projectSlice';
import { selectLayersList, setStateFromHistory } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';

interface CanvasResolutionModalProps {
  open: boolean;
  onClose: () => void;
}

export const CanvasResolutionModal: FC<CanvasResolutionModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  // Получаем текущую ширину, высоту и слои из Redux
  const { width, height } = useAppSelector(state => state.project);
  const layersList = useAppSelector(selectLayersList);

  // Инициализируем форму текущими значениями при открытии модального окна
  useEffect(() => {
    if (open) {
      form.setFieldsValue({ width, height });
    }
  }, [form, open, width, height]);

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();

      // Создаём новый список слоёв с обновлёнными canvasData
      const updatedLayers = await Promise.all(
        layersList.map(
          (layer): Promise<LayerT> =>
            new Promise((resolve) => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');

              if (!context) {
                resolve(layer); // Если контекст недоступен, возвращаем оригинальный слой
                return;
              }

              // Устанавливаем старые размеры холста
              canvas.width = width;
              canvas.height = height;

              // Загружаем данные слоя
              const image = new Image();
              image.src = layer.canvasData;

              image.onload = () => {
                // Рисуем содержимое слоя на временном canvas
                context.drawImage(image, 0, 0);

                // Переключаемся на новое разрешение
                const resizedCanvas = document.createElement('canvas');
                const resizedContext = resizedCanvas.getContext('2d');

                if (resizedContext) {
                  resizedCanvas.width = values.width;
                  resizedCanvas.height = values.height;

                  // Копируем содержимое без изменения масштаба
                  resizedContext.drawImage(canvas, 0, 0);

                  // Возвращаем новый слой с обновлённым canvasData
                  resolve({
                    ...layer,
                    canvasData: resizedCanvas.toDataURL(),
                  });
                } else {
                  resolve(layer); // Если контекст недоступен, возвращаем оригинальный слой
                }
              };

              image.onerror = () => {
                resolve(layer); // Если загрузка изображения не удалась, возвращаем оригинальный слой
              };
            }),
        ),
      );

      // Обновляем слои в Redux
      dispatch(setStateFromHistory({ layersList: updatedLayers }));

      // Обновляем разрешение холста в Redux
      dispatch(updateResolution({ width: values.width, height: values.height }));

      // Сохраняем изменения в LocalStorage
      dispatch(saveToLocalStorage());

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
          <InputNumber min={1} max={5000} placeholder="Введите ширину" />
        </Form.Item>
        <Form.Item
          label="Высота"
          name="height"
          rules={[{ required: true, message: 'Введите высоту' }]}
        >
          <InputNumber min={1} max={5000} placeholder="Введите высоту" />
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
