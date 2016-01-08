(function() {
  var e, t, c, a, d, i;
  for (
    t = document.querySelectorAll(".bullet"),
    i = document.querySelectorAll(".slide"),
    c = document.querySelectorAll(".description"),
    a = 0,
    d = t.length; d > a; a++) e = t[a],
    e.addEventListener(
      "click",
      function(e) {
        var t, c, a, d, i;
        if (e.preventDefault(),
          a = this.dataset.index, !this.classList.contains("active")) {
          for (
            t = document.querySelectorAll(".active"), d = 0, i = t.length; i > d; d++) c = t[d], c.classList.remove("active");
          return document.querySelector(".slide[data-index='" + a + "']").classList.add("active"), document.querySelector(".description[data-index='" + a + "']").classList.add("active"), this.classList.add("active")
        }
      });
  document.querySelector(".next").addEventListener("click", function(e) {
    var t, c, a, d, l, r, s;
    if (e.preventDefault(), console.log("touch touch"), s = parseInt(document.querySelector(".slide.active").dataset.index) + 1, s <= i.length) {
      for (t = document.querySelectorAll(".active"), a = 0, l = t.length; l > a; a++) c = t[a], c.classList.remove("active");
      return document.querySelector(".slide[data-index='" + s + "']").classList.add("active"), document.querySelector(".description[data-index='" + s + "']").classList.add("active"), document.querySelector(".bullet[data-index='" + s + "']").classList.add("active")
    }
    for (t = document.querySelectorAll(".active"), d = 0, r = t.length; r > d; d++) c = t[d], c.classList.remove("active");
    return document.querySelector(".slide[data-index='1']").classList.add("active"), document.querySelector(".description[data-index='1']").classList.add("active"), document.querySelector(".bullet[data-index='1']").classList.add("active")
  }), document.querySelector(".prev").addEventListener("click", function(e) {
    var t, c, a, d, l, r, s;
    if (e.preventDefault(), s = parseInt(document.querySelector(".slide.active").dataset.index) - 1, s > 0) {
      for (t = document.querySelectorAll(".active"), a = 0, l = t.length; l > a; a++) c = t[a], c.classList.remove("active");
      return document.querySelector(".slide[data-index='" + s + "']").classList.add("active"), document.querySelector(".description[data-index='" + s + "']").classList.add("active"), document.querySelector(".bullet[data-index='" + s + "']").classList.add("active")
    }
    for (t = document.querySelectorAll(".active"), d = 0, r = t.length; r > d; d++) c = t[d], c.classList.remove("active");
    return document.querySelector(".slide[data-index='" + i.length + "']").classList.add("active"), document.querySelector(".description[data-index='" + i.length + "']").classList.add("active"), document.querySelector(".bullet[data-index='" + i.length + "']").classList.add("active")
  })
}).call(this);

$(document).ready(function() {
  $(document).on("click", ".info", function() {
    $("figcaption").addClass("active");
    setTimeout(function() {
      $(".main *").css("z-index", "1");
    }, 3000);
  });
});