import './utils/handlebars.js';
import {default as DetailController} from './controller/detail-controller.js';
import {$} from './utils/lib.js';

(function ($) {
  $(function () {
    let $styleSweet = JSON.parse(localStorage.getItem("styleSweet")) || false;

    if ($styleSweet) {
      $(".wrapper-outer").addClass("sweet");
    }

    const detailNote = new DetailController();
    detailNote.renderTpl();
  });

})($);