import useProducts from "../hooks/useProducts";
import Item from "./ui/Item";

const Products = () => {
  const {
    getProducts: { isLoading, error, data: products },
  } = useProducts();

  return (
    <section className="w-full max-w-screen-2xl my-0 mx-auto">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products &&
          products.map((product) => (
            <Item key={product.id} product={product} className="" />
          ))}
      </ul>
    </section>
  );
};

export default Products;
