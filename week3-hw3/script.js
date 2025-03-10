$(document).ready(function () {
  loadRandomUsers();

  $("#loadUsers").click(function () {
    $(this).addClass("animated-btn");
    setTimeout(() => {
      $(this).removeClass("animated-btn");
    }, 1000);

    loadRandomUsers();
  });

  Fancybox.bind("[data-fancybox]", {});

  function loadRandomUsers() {
    $("#userCards").empty();
    $("#userSlider").empty();

    $.ajax({
      url: "https://randomuser.me/api/?results=9",
      dataType: "json",
      success: function (data) {
        displayUsers(data.results);
        initializeSlider(data.results);
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });
  }

  function displayUsers(users) {
    users.forEach(function (user, index) {
      const card = $(`
          <div class="user-card" data-fancybox data-src="#user-${index}">
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
            <div class="user-info">
              <h3>${user.name.first} ${user.name.last}</h3>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Country:</strong> ${user.location.country}</p>
            </div>
          </div>
        `);

      $("#userCards").append(card);

      const modal = $(`
          <div id="user-${index}" style="display:none;" class="user-details">
            <img src="${user.picture.large}" alt="${user.name.first} ${
        user.name.last
      }">
            <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Address:</strong> ${user.location.street.number} ${
        user.location.street.name
      }, ${user.location.city}</p>
            <p><strong>Country:</strong> ${user.location.country}</p>
            <p><strong>Postcode:</strong> ${user.location.postcode}</p>
            <p><strong>Date of Birth:</strong> ${new Date(
              user.dob.date
            ).toLocaleDateString()}</p>
          </div>
        `);

      $("body").append(modal);

      setTimeout(function () {
        card.fadeIn(500);
      }, index * 200);

      card.hover(function () {
        $(this).toggleClass("highlight");
      });
    });
  }

  function initializeSlider(users) {
    if ($("#userSlider").hasClass("slick-initialized")) {
      $("#userSlider").slick("unslick");
    }

    users.forEach(function (user) {
      const sliderItem = $(`
          <div class="slider-item">
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.location.country}</p>
          </div>
        `);

      $("#userSlider").append(sliderItem);
    });

    $("#userSlider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
});
