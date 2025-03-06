$(document).ready(function () {
  let page = 0;
  const apiKey =
    "live_0rYmLDu9o1DmFpyTwzco4RzkFLpusVhM2AGh81fVlgUdBk0cQeVYLnVFqp1oRuiB";
  const limit = 10;

  const loadingIndicator = $("#loadingIndicator");
  let isFetching = false;

  function fetchDogImages() {
    if (isFetching) return;

    isFetching = true;
    loadingIndicator.show();

    $.ajax({
      url: `https://api.thedogapi.com/v1/images/search?limit=${limit}&page=${page}&api_key=${apiKey}`,
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    })
      .done(function (response) {
        console.log(response);
        const imageContainer = $("#imageContainer");
        response.forEach((img) => {
          const image = `<img src="${img.url}" alt="Random Dog Image" width="${img.width}" height="${img.height}">`;
          imageContainer.append(image);
        });
        loadingIndicator.hide();
        isFetching = false;
      })
      .fail(function () {
        alert("Failed to fetch images");
        loadingIndicator.hide();
        isFetching = false;
      });
  }

  fetchDogImages();

  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();
    const documentHeight = $(document).height();

    if (!isFetching && scrollTop + windowHeight >= documentHeight - 100) {
      page++;
      fetchDogImages();
    }
  });
});
