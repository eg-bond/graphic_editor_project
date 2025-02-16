import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      open: true,
    },
  };

  if (command === 'serve') {
    return {
      ...config,
      base: '/',
    };
  } else {
    return {
      ...config,
      base: '/graphic_editor_project',
    };
  }
});
