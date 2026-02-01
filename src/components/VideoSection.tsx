export const VideoSection = () => {
  return (
    <section className="py-12 bg-slate-100">
      <div className="container mx-auto flex justify-center">
        <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://rutube.ru/play/embed/14875330" 
            frameBorder="0" 
            allow="clipboard-write; autoplay" 
            allowFullScreen 
            title="Video"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
