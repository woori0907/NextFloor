import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { addOrUpdateToCart, getLiked } from "../api/firebase";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import setTitle from "../hooks/setTitle";
import useProducts from "../hooks/useProducts";

const ProductDetail = () => {
  const user = useAuthContext();
  const location = useLocation();
  const data = location.state;
  const [isLiked, setLiked] = useState(false);
  const [selected, setSelected] = useState(data.options && data.options[0]);
  const { addLike, removeLike } = useProducts();
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  // console.log(user && user.userData.uid);

  const handleClick = (event) => {
    event.preventDefault();
    if (!user.userData) {
      alert("로그인을 해주세요.");
      return;
    }
    const product = {
      image: data.image,
      id: data.id,
      title: data.title,
      price: data.price,
      option: selected,
      quantity: 1,
    };
    addOrUpdateToCart(user.userData.uid, product);
  };

  const handleLikeClick = (event) => {
    const product = {
      image: data.image,
      id: data.id,
      title: data.title,
      price: data.price,
    };

    if (!user.userData) {
      alert("로그인을 해주세요.");
      return;
    }

    if (!isLiked) {
      addLike(user.userData.uid, product);
      setLiked(true);
    } else {
      removeLike(user.userData.uid, product.id);
      setLiked(false);
    }
  };

  useEffect(() => {
    setTitle(data.title);
  }, [data.title]);

  useEffect(() => {
    if (user) {
      let like = null;
      async function fetchData() {
        like = await getLiked(user && user?.userData?.uid, data.id);
        console.log(like.length);
        if (like.length > 0) {
          setLiked(like);
        }
      }
      fetchData();
    }
  }, []);

  return (
    <section className="w-full max-w-screen-2xl my-0 mx-auto">
      <p className="mx-12 mt-4 text-gray-700">{data.category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img
          className="w-full px-4 basis-7/12"
          src={data.image}
          alt={data.title}
        />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{data.title}</h2>
          <p className="text-2xl font-bold py-2">{`₩${data.price}`}</p>
          <div
            className="py-2 border-b border-gray-400 cursor-pointer flex flex-row"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <AiFillHeart className="text-2xl text-brand " />
            ) : (
              <AiOutlineHeart className="text-2xl" />
            )}

            <p className="mx-2">{data.likes}</p>
          </div>
          <p className="py-4 text-lg">{data.description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션 :{" "}
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {data.options &&
                data.options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
};

export default ProductDetail;
