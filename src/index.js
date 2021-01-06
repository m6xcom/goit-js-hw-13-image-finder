import css from "./css/styles.css";
import refs from "./js/refs";
const { searchForm, searchInput, searchBtn, gallery, loadMoreButton } = refs;
import fetchImages from "./js/apiService";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  gallery.innerHTML = "";
  fetchImages.queryValue = searchInput.value;
  fetchImages.resetPage();
  fetchImages.getImages(searchInput.value, gallery);
  searchInput.value = "";
  loadMoreButton.classList.remove("hidden-button");
});

loadMoreButton.addEventListener("click", () => {
  fetchImages.setPage();
  fetchImages.getImages(undefined, gallery);
});
