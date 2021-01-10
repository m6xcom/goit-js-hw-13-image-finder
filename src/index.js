import css from "./css/styles.css";
import refs from "./js/refs";
const { searchForm, searchInput, searchBtn, gallery, loadMoreButton } = refs;
import notification from "./js/notification";
const {
  successFetch,
  insufficientFetch,
  oneImageFetch,
  noMatchesError,
} = notification;
import fetchImages from "./js/apiService";
import showImage from "./js/gallery";
import { data } from "autoprefixer";

const toggleButton = (length, newFetch) => {
  if (length >= 12) {
    loadMoreButton.classList.remove("hidden-button");
    if (newFetch === true) {
      successFetch();
    }
  } else {
    if (length < 12 && length > 1 && newFetch === true) {
      insufficientFetch(length);
    } else if (length === 1 && newFetch === true) {
      oneImageFetch();
    } else if (length === 0 && newFetch === true) {
      noMatchesError();
    }
    if (!loadMoreButton.classList.contains("hidden-button")) {
      loadMoreButton.classList.add("hidden-button");
    }
  }
};

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

loadMoreButton.addEventListener("click", () => {
  fetchImages.setPage();
  fetchImages
    .getImages(undefined, gallery)
    .then((data) => toggleButton(data, false));
});

gallery.addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    showImage.clickImage(e.target.dataset.largeimage, false);
  }
});
