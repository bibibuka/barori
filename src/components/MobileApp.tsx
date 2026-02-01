export const MobileApp = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
          
          <div className="lg:w-1/2 relative z-10 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-3xl lg:text-5xl font-bold uppercase text-white mb-6">
              Теперь в мобильном
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Скачивай наше приложение, чтобы управлять графиком, следить за выплатами и получать поддержку еще быстрее.
            </p>
            <a href="#" className="inline-block bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Скачать в RuStore
            </a>
          </div>

          <div className="lg:w-1/3 relative z-10 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" 
              alt="Мобильное приложение" 
              className="w-48 lg:w-64 rounded-[2rem] border-8 border-gray-700 shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500"
            />
          </div>

          {/* Decor */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};
