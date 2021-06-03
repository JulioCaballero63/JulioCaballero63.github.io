const imagesToLoad = document.querySelectorAll("img[data-src]");

const imageThreshold = {
  threshold: 0.5,
  rootMargin: "0px 0px 40px 0px",
};

const changeImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        changeImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imageThreshold);

  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    changeImages(img);
  });
}
