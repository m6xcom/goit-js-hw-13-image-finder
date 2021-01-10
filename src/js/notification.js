import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// import "material-design-icons/iconfont/material-icons.css";
const { alert, notice, info, success, error } = require("@pnotify/core");
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";

function successFetch() {
  success({
    text: "Success!",
    closer: false,
    sticker: false,
    delay: 1500,
  });
}

function insufficientFetch(length) {
  success({
    text: `Success! ${length} images were found`,
    closer: false,
    sticker: false,
    delay: 1500,
  });
}

function oneImageFetch() {
  success({
    text: `Success! Only 1 image was found`,
    closer: false,
    sticker: false,
    delay: 1500,
  });
}

function noMatchesError() {
  error({
    text: "No matches found! ",
    closer: false,
    sticker: false,
    delay: 1500,
  });
}
export default {
  successFetch,
  insufficientFetch,
  oneImageFetch,
  noMatchesError,
};
