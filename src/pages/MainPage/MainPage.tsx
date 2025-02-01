import { SignInNavBtn, SignUpNavBtn } from '@/components/Buttons';

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Графический редактор
          </h2>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SignInNavBtn />
            <SignUpNavBtn />
          </div>
        </div>
      </main>
    </div>
  );
};
