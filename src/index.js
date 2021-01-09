import css from "./css/styles.css";
import refs from "./js/refs";
const { searchForm, searchInput, searchBtn, gallery, loadMoreButton } = refs;
import fetchImages from "./js/apiService";
import { data } from "autoprefixer";

const toggleButton = (length) => {
  if (length >= 12) {
    loadMoreButton.classList.remove("hidden-button");
  } else {
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
    .then((data) => toggleButton(data));
  searchInput.value = "";
});

loadMoreButton.addEventListener("click", () => {
  fetchImages.setPage();
  fetchImages.getImages(null, gallery).then((data) => toggleButton(data));
});
