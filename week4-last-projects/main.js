const appendLocation = ".ins-api-users";
const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
script.onload = function () {
  $(document).ready(function () {
    $(document).on("click", `${appendLocation} .delete-user`, function () {
      const userId = $(this).closest(".user-item").data("id");
      deleteUser(userId);
    });
    $(document).on("click", `${appendLocation} .refresh-users`, function () {
      if (sessionStorage.getItem("refreshedUsed") === "true") {
        alert("refresh buttonu bu oturumda sadece bir kez kontrol edilebilir.");
        return;
      }
      sessionStorage.setItem("refreshedUsed", "true");
      localStorage.removeItem("userCache");
      fetchData().then(displayData);
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
      .refresh-users {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin: 20px auto;
        display: block;
      }
    `;
    document.head.appendChild(style);
    function checkAndAddButton() {
      const userList = document.querySelector(`${appendLocation} .user-list`);
      if (
        (!userList || (userList && userList.children.length === 0)) &&
        $(`${appendLocation} .refresh-users`).length === 0
      ) {
        $(appendLocation).html(
          '<button class="refresh-users">Refresh Users</button>'
        );
      }
    }
    let isProcessingMutation = false;
    const observer = new MutationObserver(function (mutations) {
      if (!isProcessingMutation) {
        isProcessingMutation = true;
        console.log(
          `DOM değişikliği algılandı: ${mutations[0].type}`,
          mutations[0].target
        );
        setTimeout(() => {
          isProcessingMutation = false;
        }, 50);
      }
      checkAndAddButton();
    });
    function fetchData() {
      const cached = JSON.parse(localStorage.getItem("userCache")) || {};
      const { data: cachedData, time: cacheTime } = cached;
      const currentTime = new Date().getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (
        cachedData &&
        Array.isArray(cachedData) &&
        cachedData.length &&
        cacheTime &&
        currentTime - parseInt(cacheTime) < oneDayInMs
      ) {
        return Promise.resolve(cachedData);
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
            localStorage.setItem(
              "userCache",
              JSON.stringify({ data, time: currentTime })
            );
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    function displayData(users) {
      $(appendLocation).empty();
      if (!users || !users.length) {
        checkAndAddButton();
        return;
      }
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
      $(appendLocation).html(userListHtml);
    }
    function deleteUser(userId) {
      let cached = JSON.parse(localStorage.getItem("userCache")) || {};
      let users = cached.data || [];
      users = users.filter((user) => user.id !== userId);
      localStorage.setItem(
        "userCache",
        JSON.stringify({ data: users, time: cached.time })
      );
      displayData(users);
    }
    fetchData()
      .then((data) => {
        displayData(data);
        const targetNode = document.querySelector(appendLocation);
        if (targetNode) {
          const config = { childList: true, subtree: true };
          observer.observe(targetNode, config);
        }
      })
      .catch((err) => {
        $(appendLocation).html("<p>Kullanici bilgileri yuklenemedi.</p>");
      });
  });
};
document.head.appendChild(script);
