const Banner = () => {
  return (
    <section className="h-[614px] bg-yellow-900 relative">
      <div className="overflow-hidden relative h-full flex">
        <div className="w-full h-full bg-cover bg-banner opacity-80 relative shrink-0 transition-transform duration-500"></div>
      </div>
      <div className="absolute w-full top-1/2 text-center text-gray-50 drop-shadow-2xl">
        <h2 className="text-6xl font-black">Shop with US</h2>
        <p className="text-2xl">Best Products, High Quality</p>
      </div>
    </section>
  );
};

export default Banner;
