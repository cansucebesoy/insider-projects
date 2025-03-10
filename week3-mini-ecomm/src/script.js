import { initializeSlider } from "./slider.js";
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
import { initializeFilters } from "./filters.js";

$(document).ready(() => {
  initializeSlider();
  fetchProducts();

  addToFavorites();
  addToCart();
});
