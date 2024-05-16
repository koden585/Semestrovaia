function showMainContent() {
    // Получаем значение имени из поля ввода
    var userName = document.getElementById("nameInput").value.trim();

    // Проверяем, что имя было введено
    if (userName) {
        // Скрываем блок приветствия, показываем основной контент
        document.getElementById("welcomeContainer").style.display = "none";
        document.getElementById("mainContent").style.display = "block";

        // Отображаем приветственное сообщение с именем пользователя
        document.getElementById("welcomeMessage").textContent = "Привет, " + userName + "!";
    } else {
        alert("Пожалуйста, введите ваше имя!");
    }
}

function handleEnterKey(event) {
    // Проверяем, была ли нажата клавиша Enter (код клавиши 13)
    if (event.keyCode === 13) {
        // Находим кнопку "Далее" по идентификатору
        var nextButton = document.getElementById("nextButton");

        // Проверяем, существует ли кнопка "Далее"
        if (nextButton) {
            // Нажимаем кнопку "Далее"
            nextButton.click();
        }
    }
}