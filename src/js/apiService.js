import { searchImages } from "pixabay-api";
import template from "../templates/galleryItem.hbs";

export default {
  link: "https://pixabay.com/api/",
  image_type: "photo",
  orientation: "horizontal",
  query: "",
  page: 1,
  per_page: 12,

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },
  async getImages(val = this.query, place) {
    let key = "19787532-99c32fb0a864719ee4b9d7cb0";
    let params = {
      image_type: this.image_type,
      orientation: this.orientation,
      page: this.page,
      per_page: this.per_page,
    };
    const response = await searchImages(key, val, params);
    const data = response.hits;
    const loadMore = data.length;
    const markup = template(data);
    place.insertAdjacentHTML("beforeend", markup);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1500);
    return loadMore;
  },
  setPage() {
    this.page += 1;
    return this.page;
  },
  resetPage() {
    this.page = 1;
    return this.page;
  },
};
