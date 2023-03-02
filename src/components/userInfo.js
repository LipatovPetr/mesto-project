import { api } from "./api.js";

class UserInfo2 {
  constructor({ name, about }) {
    this.nameElement = document.querySelector(name);
    this.aboutElement = document.querySelector(about);
  }

  getUserInfo() {
    api.getProfileData().then((userData) => {
      return(userData);
    });
  }

  setUserInfo(name, about) {
    api.uploadProfileData(name, about).then((userData) => {
        this.nameElement.textContent = userData.name;
        this.aboutElement.textContent = userData.about;
    })
  }
}

// Тест: создаем класс и с помощью его метода обновляем и выводим на странице имя и профессию пользователя

const sels = {name: ".profile__name", about:".profile__title"} // 
const profile = new UserInfo2(sels);
profile.setUserInfo("Петр Липатов", "Исследователь океанов")





