const imagesToLoad = document.querySelectorAll("img[data-src]");

const imageOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px 40px 0px",
};

const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

if ("IntersectionObserver" in window) {
  const imgObserver = new IntersectionObserver((items, imgObserver) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        imgObserver.unobserve(item.target);
      }
    });
  }, imageOptions);

  imagesToLoad.forEach((img) => {
    imgObserver.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}
