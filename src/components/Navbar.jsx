import { Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";

import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

const Navbar = () => {
  const { userData, login, logout } = useAuthContext();
  return (
    <header className="flex justify-between border-b border-grey-300 p-6 font-semibold">
      <Link
        to={"/"}
        className="flex items-center text-4xl text-brand font-bold"
      >
        Next Floor
      </Link>
      <nav className="flex items-center gap-4">
        <Link to={`/products`}>Products</Link>
        {userData ? (
          <Link to={`/cart`}>
            <CartStatus />
          </Link>
        ) : null}

        {userData && userData.isAdmin ? (
          <Link to={`/products/new`} className="text-2xl">
            <FiPlusSquare />
          </Link>
        ) : null}
        {userData ? (
          <Link to={`/mypage`}>
            <User user={userData} />
          </Link>
        ) : null}
        {userData ? (
          <Button onClick={logout} text={"Logout"} />
        ) : (
          <Button onClick={login} text={"Login"} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
