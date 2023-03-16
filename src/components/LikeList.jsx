import { useQuery } from "@tanstack/react-query";
import { getLikedItems } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import Item from "./ui/Item";

const LikeList = () => {
  const user = useAuthContext();
  const { isLoading, data: products } = useQuery(["liked"], () =>
    getLikedItems(user.userData.uid)
  );
  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {hasProducts && (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products &&
              products.map((product) => (
                <Item key={product.id} product={product} className="" />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default LikeList;
