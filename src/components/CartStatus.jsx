import { useQuery } from "@tanstack/react-query";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

const CartStatus = () => {
  const user = useAuthContext();
  const { data: products } = useQuery(["carts"], () =>
    getCart(user.userData.uid)
  );
  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
};
export default CartStatus;
