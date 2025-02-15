import { SignInNavBtn, SignUpNavBtn } from '@/components/Buttons';
import { useAuthContext } from '@/context/AuthContext.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate('/projects', { replace: true });
    }
  }, [navigate, user?.uid]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <img className="w-screen h-screen absolute bg-contain blur-md opacity-80" src="bg-1.png" alt="" />
      <main className="relative container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
          <h2 className="text-4xl font-semibold mb-2">
            Графический редактор
          </h2>

          <p className="text-center font-medium">
            Создавайте и редактируйте изображения с легкостью!
            <br />
            Наш графический редактор предлагает мощные инструменты
            <br />
            для работы
            с изображениями: слои, кисти, фигуры и многое другое.
          </p>

          {/* Buttons Container */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <SignInNavBtn />
            <SignUpNavBtn />
          </div>
        </div>
      </main>
    </div>
  );
};
