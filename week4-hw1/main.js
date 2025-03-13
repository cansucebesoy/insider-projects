$(document).ready(function () {
  function fetchData() {
    const cachedData = localStorage.getItem("userData");
    const cacheTime = localStorage.getItem("userDataTime");
    const currentTime = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (
      cachedData &&
      cacheTime &&
      currentTime - parseInt(cacheTime) < oneDayInMs
    ) {
      console.log("veri local storagedan cekildi");
      return Promise.resolve(JSON.parse(cachedData));
    }

    return new Promise((resolve, reject) => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP hata status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Veri başarı ile alındı:", data);

          localStorage.setItem("userData", JSON.stringify(data));
          localStorage.setItem("userDataTime", currentTime.toString());
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

      displayData(data);
    })
    .catch((err) => {
      console.log("veri alimi basarisiz:", err);

      $(".ins-api-users").html("<p>Kullanici bilgileri yuklenemedi.</p>");
    });

  function displayData(users) {
    let userListHtml = '<ul class="user-list">';

    users.forEach((user) => {
      userListHtml += `
      <li class="user-item" data-id="${user.id}" >
       <h3>${user.name}</h3>
          <p><strong>Kullanıcı Adı:</strong> ${user.username}</p>
          <p><strong>E-posta:</strong> ${user.email}</p>
          <p><strong>Adres:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
          <button class="delete-user">Delete user</button>
      </li>`;
    });
    userListHtml += "</ul>";

    $(".ins-api-users").append(userListHtml);

    $(".ins-api-users").on("click", ".delete-user", function () {
      const userId = $(this).closest(".user-item").data("id");
      deleteUser(userId);
    });

    const style = document.createElement("style");
    style.textContent = `
      .user-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 20px; 
}

.user-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
  width: 80%; 
  max-width: 400px; 
  text-align: center; 
}

.user-item h3 {
  margin-top: 0;
  color: #333;
}

.delete-user {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px; 
}
    `;
    document.head.appendChild(style);
  }

  function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem("userData")) || [];

    users = users.filter((user) => user.id !== userId);

    localStorage.setItem("userData", JSON.stringify(users));

    $(`.user-item[data-id='${userId}']`).remove();
  }
});
