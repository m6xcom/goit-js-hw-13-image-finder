import * as basicLightbox from "basiclightbox";

export default {
  clickImage(image) {
    basicLightbox.create(`<img src="${image}">`).show();
  },
};
