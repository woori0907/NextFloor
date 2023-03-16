import LikeList from "../components/LikeList";

const MyPage = () => {
  return (
    <section className="w-full max-w-screen-2xl my-0 mx-auto">
      <section className="py-9 border-b border-grey-300 mb-9">
        <h1 className="text-2xl text-gray-800 font-bold">Wish List</h1>
      </section>
      <LikeList />
    </section>
  );
};

export default MyPage;
