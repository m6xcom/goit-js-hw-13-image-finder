import css from "./css/styles.css";
import refs from "./js/refs";
const { searchForm, searchInput, gallery, fetchTrigger } = refs;
import notification from "./js/notification";
const {
  successFetch,
  insufficientFetch,
  oneImageFetch,
  noMatchesError,
  noMoreImages,
} = notification;
import fetchImages from "./js/apiService";
import showImage from "./js/gallery";
import "intersection-observer";
import { data } from "autoprefixer";

const toggleButton = (length, newFetch) => {
  if (length >= 3) {
    fetchTrigger.classList.remove("hidden");
    if (newFetch === true) {
      successFetch();
    }
  } else {
    if (length < 3 && length > 1 && newFetch === true) {
      insufficientFetch(length);
    } else if (length === 1 && newFetch === true) {
      oneImageFetch();
    } else if (length === 0 && newFetch === true) {
      noMatchesError();
    } else if (length === 0 && newFetch === false) {
      noMoreImages();
    }
    if (!fetchTrigger.classList.contains("hidden")) {
      fetchTrigger.classList.add("hidden");
    }
  }
};

const options = {
  root: null,
  treshhold: 1.0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      fetchImages.setPage();
      fetchImages
        .getImages(undefined, gallery)
        .then((data) => toggleButton(data, false));
    }
  });
}, options);

observer.observe(fetchTrigger);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  gallery.innerHTML = "";
  fetchImages.queryValue = searchInput.value;
  fetchImages.resetPage();
  fetchImages
    .getImages(searchInput.value, gallery)
    .then((data) => toggleButton(data, true));
  searchInput.value = "";
});

gallery.addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    showImage.clickImage(e.target.dataset.largeimage, false);
  }
});
