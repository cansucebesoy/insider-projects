$(document).ready(function () {
  function fetchData() {
    return new Promise((resolve, reject) => {
      fetch("https://jsonplaceholder.typicode.com/uers")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP hata status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Veri başarı ile alındı:", data);
          resolve(data);
        });
    }).catch((err) => {
      console.log("hata alindi:", err);
      reject(err);
    });
  }
  fetchData()
    .then((data) => {
      console.log("veri hazir:", data);
    })
    .catch((err) => {
      console.log("veri alimi basarisiz:", err);
    });
});
