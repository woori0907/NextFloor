import { useRef } from "react";
import { useEffect } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import setTitle from "../hooks/setTitle";

const Home = () => {
  const intersectDOM = useRef();
  const moveText = useRef();

  useEffect(() => {
    setTitle();
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log(Math.round(window.screen.width / 10));
        moveText.current.style.transform = `translateX(${Math.round(
          window.screen.width / 10
        )}px)`;
      } else if (!entries[0].isIntersecting) {
        moveText.current.style.transform = `translateX(-${Math.round(
          window.screen.width / 10
        )}px)`;
      }
    });
    io.observe(intersectDOM.current);
  }, []);
  return (
    <section>
      <Banner />
      <section className="h-20 flex align-middle mt-14 p-4 justify-center">
        <h2 className="text-4xl font-extrabold text-stone-700	">New Arrival</h2>
      </section>
      <Products />
      <div className="flex w-full justify-center items-center mx-auto">
        <div
          ref={intersectDOM}
          className="m-10 h-80 overflow-hidden transition-transform duration-1000 basis-1/2"
        >
          <h1
            ref={moveText}
            className="text-7xl md:text-5xl sm:text-3xl font-black transition-transform duration-1000"
          >
            HI, We're Next Floor. {<br />}Welcome to our homepage. {<br />}I
            hope you guys enjoy it.
          </h1>
        </div>
        <div className="basis-1/2">
          <img src="/images/banner_2.png" className="translate-x-1/4" alt="" />
        </div>
      </div>
      <section className="h-20 flex align-middle mt-14 p-4 justify-center">
        <h2 className="text-4xl font-extrabold text-stone-700	">Weekly Best</h2>
      </section>
      <Products />
    </section>
  );
};

export default Home;
