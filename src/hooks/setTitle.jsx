const setTitle = (title) => {
  const pageTitle = document.querySelector("title");
  if (title === undefined) {
    title = "Next-Floor";
  }
  pageTitle.innerText = title;
};

export default setTitle;
