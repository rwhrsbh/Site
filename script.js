const reqUrl = "http://127.0.0.1:3000";

// const login1 = document.getElementById("login1");
// const password1 = document.getElementById("password1");
// const button1 = document.getElementById("button1");

document.addEventListener("DOMContentLoaded", () => {
  const loginbutton = document.getElementById("logbutton");

  const regLogin = document.getElementById("regLogin");
  const regPassword = document.getElementById("regPassword");
  const regButton = document.getElementById("register");
  regButton.addEventListener("click", userRegister);
  loginbutton.addEventListener("click", checkRegistration);

  function userRegister() {
    let reg = new Promise((resolve, reject) => {
      if (regLogin.value === "" || regPassword.value === "") {
        alert("Введите логин и пароль");
        return;
      }

      let data = {
        username: regLogin.value,
        password: regPassword.value,
      };

      fetch(reqUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            console.log("response failed");
          }
        })
        .then((jsonData) => {
          resolve(jsonData);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
    reg
      .then((data) => {
        console.log("reg success");
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  }

  function checkRegistration() {
    const login = document.getElementById("login");
    const password = document.getElementById("password");

    fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Вы успешно авторизованы");
          // window.location.href = "index.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }
});

// КОД СО STACKOVERFLOW https://stackoverflow.com/questions/72368183/javascript-login-with-cookies
// НАДО В НЕМ РАЗОБРАТЬСЯ И РЕАЛИЗОВАТЬ ВХОД ПО КУКИ
//______________________________________________________________________________________________________________________
// document.querySelector('#loginForm').addEventListener('submit', () => {
//     setCookie('user', document.querySelector('#uname').value, '/')
//     setCookie('pass', document.querySelector('#pwd').value, '/')
//   })

//   if(!getCookie('user')||!getCookie('pass')) if(location.href != 'https://somelocation.example/index.html/') location.replace('https://somelocation.example/index.html/')

//   // Cookies setting and getting functions

//   function setCookie(name, value, path, options = {}) {
//           options = {
//               path: path,
//               ...options
//           }; if (options.expires instanceof Date) {
//               options.expires = options.expires.toUTCString();
//           } let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
//           for (let optionKey in options) {
//               updatedCookie += "; " + optionKey
//               let optionValue = options[optionKey]
//               if (optionValue !== true) {
//                   updatedCookie += "=" + optionValue
//               }
//           }
//           document.cookie = updatedCookie;
//   }

//   function getCookie(name) {
//           let matches = document.cookie.match(new RegExp(
//               "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//               ))
//           return matches ? decodeURIComponent(matches[1]) : undefined
//   }
//__________________________________________________________________________________________________________________________________________________
