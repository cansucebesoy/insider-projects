import { initSlider } from "./initSlider.js";
import "./styles.css";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "./ajax.js";
import { addToFavorites } from "./favorites.js";
import { addToCart } from "./cart.js";

$(document).ready(() => {
  initSlider();
  fetchProducts();
  addToFavorites();
  addToCart();
  $("#favoriteBtn").hover(
    function () {
      $(this).find("i").stop(true, true).slideDown(1000);
    },
    function () {
      $(this).find("i").stop(true, true).slideUp(1000).slideDown(500);
    }
  );

  $("#cartButton").hover(
    function () {
      $(this).find("i").stop(true, true).slideDown(1000);
    },
    function () {
      $(this).find("i").stop(true, true).slideUp(1000).slideDown(500);
    }
  );

  $("#miniText")
    .css("display", "inline-block")
    .animate(
      {
        left: "+=30px",
        right: "+=30px",
      },
      500,
      function () {
        $(this).animate(
          {
            left: "-=30px",
            right: "-=30px",
          },
          500
        );
      }
    );

  $("#miniText").hover(
    function () {
      $(this).animate(
        {
          fontSize: "30px",
          color: "#ff6600",
        },
        200
      );
    },
    function () {
      $(this).animate(
        {
          fontSize: "24px",
          color: "black",
        },
        200
      );
    }
  );
});
