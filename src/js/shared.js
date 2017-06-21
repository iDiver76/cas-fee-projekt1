import {default as notesStorage} from "./notesStorage.js";


function bindEvents() {

    // $(".task-actions").on("click", ".toggle-task-details", (e) => {
    //   console.log("eeee", e);
    //   let target = $(e.currentTarget).attr("href");
    //   $(target).slideToggle("fast");
    //   $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
    // });
    //
    //
    //
    // $(".task-status").on("change", "input[name=isDone]", (e) => {
    //   getTaskById(e.target.dataset.id);
    // });
    //
    // $("#styleswitch").on("change", () => {
    //   debugger;
    //   $(".wrapper-outer").toggleClass("sweet");
    // });
    //
    // $(".toggle-task-details").on("click", (e) => {
    //   let target = $(e.currentTarget).attr("href");
    //   $(target).slideToggle("fast");
    //   $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
    // });
  }

export default {bindEvents};
