import { useState } from "react";
import { Link } from "react-router-dom";
import { getProduct } from "../../api/firebase";

const Item = ({ product, product: { id, image, title, category, price } }) => {
  const [curProduct, setProduct] = useState(null);

  useState(async () => {
    const temp = await getProduct(id);
    setProduct(temp);
  }, []);

  return (
    <Link to={`/products/${id}`} state={curProduct}>
      <li className="rounded-lg shadow-md overflow-hidden cursor-pointer">
        <div className="w-full overflow-hidden">
          <img
            className="w-full transition-transform duration-700 hover:scale-110"
            src={image}
            alt={title}
          />
        </div>
        <div className="mt-2 px-2 text-lg flex justify-between items-center">
          <h3 className="truncate">{title}</h3>
          <p>{`₩${price}`}</p>
        </div>
        {category ? (
          <p className="mb-2 px-2 text-gray-400">{category}</p>
        ) : null}
      </li>
    </Link>
  );
};

export default Item;
