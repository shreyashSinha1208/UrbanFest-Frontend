import LogoImage from '../assets/Logo.png';

export default function LoadingScreen() {
          return (
                    <div className="flex items-center justify-center min-h-screen">
                              <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="w-28 h-28 border-8 text-[#B88E2F] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#B88E2F] rounded-full">
                                                  <img src={LogoImage} className="w-12 h-8 animate-ping" alt="Logo-Image" />
                                        </div>
                              </div>
                    </div>
          );
}
