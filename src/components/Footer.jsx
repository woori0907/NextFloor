const Footer = () => {
  return (
    <footer className="flex w-full border-t border-grey-300 pt-8 pb-12 font-semibold mt-20">
      <section className="w-full max-w-screen-2xl mx-auto flex ">
        <section className="basis-2/3">
          <h3>고객센터</h3>
          <h2 className="text-5xl font-extrabold">02-0000-0000</h2>
          <p className="text-gray-500 mt-6 leading-relaxed font-light">
            평일 10:00 ~ 19:00 (주말 & 공휴일 휴무)
            <br />
            13:00 ~ 14:00 (점심시간)
          </p>
        </section>
        <section className="basis-1/3">
          <h1 className="text-6xl text-brand font-bold cursor-pointer">
            Next Floor
          </h1>
          <p className="text-gray-500 mt-6 leading-relaxed font-light">
            Dress shabbily and they remember the dress, dress impeccably and
            they remember the woman
            <br />; Coco Chanel
          </p>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
