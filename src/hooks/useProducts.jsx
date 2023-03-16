import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addNewProduct,
  addOrUpdateLikes,
  decreaseLike,
  getProducts as fetchProducts,
  increaseLike,
  removeLikes,
} from "../api/firebase";

const useProducts = () => {
  const queryClient = useQueryClient();
  const getProducts = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  const addLike = (id, product) => {
    /** Todo
     * 1. user정보에 해당 제품에 좋아요를 누른 것을 업데이트 한다
     * 2. 제품 정보에서 좋아요 카운트를 +1 한다
     */
    addOrUpdateLikes(id, product);
    increaseLike(product.id);
  };

  const removeLike = (id, productId) => {
    /** Todo
     * 1. user정보에 해당 제품에 좋아요를 누른 것을 제거 한다
     * 2. 제품 정보에서 좋아요 카운트를 -1 한다
     */
    removeLikes(id, productId);
    decreaseLike(productId);
  };

  return { getProducts, addProduct, addLike, removeLike };
};

export default useProducts;
