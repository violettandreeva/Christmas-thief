// Получаем элементы
const points = document.querySelectorAll('.point');
const dialogOverlay = document.getElementById('gameDialog');
const dialogText = document.getElementById('gameDialogText');
const dialogButton = document.getElementById('gameDialogButton');

// Пример текста для диалога
const dialogSteps = {
  1: ["Думал что тебя ждут подарки и новогоднее настроение? Ха-ха! А вот и нет, я своровала все твои подарки и очень надежно их спрятала! Хочешь их вернуть? Вряд ли получится! Но я сделала карту, которая открывается по мере нахождения подарков. Ой! Я сказала это вслух? В общем я люблю играть и дам тебе эту карту только если ты отгадаешь мою загадку. Готов?", "Загадка: Декабрь откроет секреты свои, Каждый день ты увидишь подарок внутри. Считай до дня, что Новым Годом зовётся, Ответ найдёшь там, где праздник начнётся", "До завтра!"],
  2: ["Итак, ты пришел за первым подарком? Придется тебя огорчить, но я очень хорошо прячу БОЛЬШИЕ вещи, хотя ты конечно все равно можешь постараться отгадать мою загадку и найти то, что я от тебя спрятала. Даже если ты это не найдешь, завтра ты можешь прийти за следующей загадкой и тебя что-нибудь да ждет (наверное), ну что?!", "Загадка: Теплом согревает как солнечный свет, Приятнее с ним в морозный рассвет. Одиноко он в тихом месте лежит, Где вещи возвращают себе прежний вид.", "Встретимся завтра!"],
  3: ["Ну что, нашел мой предыдущий подарок? Хотя мне без разницы! Мои гоблинские силы все равно не уменьшатся от отсутствия одного подарка! А вот тебя я чувствую силы покидают, так что один из моих украденных подарков будет тебе сегодня кстати. Что ж, правила ты теперь знаешь. Отгадываешь загадку – забираешь то, что будет дальше. Готов?", "Загадка: От усталости он избавляет, Все мышцы тебе расслабляет. Секрет этот прост, подходи — Тебя ждут руки мои!", "До скорого!"],
  4: ["Ну привет. Видимо теперь ты тут будешь появляться каждый день, да? Какая-то жизнь у тебя не сладкая, раз ты тратишь время на то чтобы испортить веселье маленькому злому Гоблину…Но ты уже тут, так что вот тебе моя загадка:", "Загадка: Я яркий, как ёлка, и сладкий, как мед, Меня любишь ты, не только в Новый год. Я в шапке скрываюсь, ищи за углом, Там, где гриль согревает своим теплом.", "До завтра!"],
  5: ["Твое присутствие уже заставляет меня нервничать.. И еще больше я буду нервничать если ты отгадаешь сегодняшнюю загадку… Но что поделать, такие правила, поэтому вот что я подготовила сегодня:", "Загадка: Сегодня капризам откроется дверь, Отказы отставить подальше теперь. Секрет этой радости прост, как всегда: Ты скажешь Пожалуйста, а я — только да", "Жду тебя завтра!"],
  6: ["Влад? Знаешь, то зачем ты сегодня пришел слишком милое, и даже моя злая сторона не в силах противостоять тому чтобы ты это получил. Поэтому отвечай на мою легчайшую загадку и просто забирай это:", "Загадка: То что давно позабыто тобой, И то что осталось пока лишь мечтой. Рядом с музыкой найдешь ты ответ, Загляни за колонки, вот мой совет.", "Пока-пока!"],
  7: ["Ну здравствуй снова. Вчера заметила что у меня выпал пушок с бровей, думала может заказать расклад таро, чтобы понять что происходит? Были бы у тебя карты и тогда ты бы хоть раз сделал что-то полезное для меня. Но даже если ты отгадаешь загадку, твои карты мне не помогут…", "Загадка: Мы правила читаем, И ход за ходом ждём. То фишки передвинем, То карты раздаём.", "Ну все, до завтра!"],
  8: ["Теперь каждый день надеюсь что ты забудешь зайти. Выключить бы тебе свет, чтобы все разрядилось и ты не смог забрать очередной подарок. Но в твоей жизни света только прибавится… (может начнет пробки вырубать хотя бы?) Вот твоя загадка:", "Я светом сияю, как звёзды в ночи, Спряталась я, ты меня отыщи! На подоконнике жду я тебя, Пускай загорится огнями зима!", "Увидимся!"],
  9: ["", "", ""],
};

// Получаем элементы
const welcomeScreen = document.getElementById('welcomeScreen');
const welcomeButton = document.getElementById('welcomeButton');

// Добавляем обработчик на кнопку "Продолжить"
if (welcomeButton) {
    welcomeButton.addEventListener('click', () => {
        // Скрываем экран приветствия
        welcomeScreen.style.display = 'none';

        // Показываем основную часть игры (предположим, она обёрнута в div с id "game")
        const gameScreen = document.getElementById('game');
        if (gameScreen) {
            gameScreen.style.display = 'block';
        }
    });
}

// Текущее состояние диалога
let currentDialogIndex = 0;
let activeDialogSteps = [];

// Получение текущей даты
const today = new Date();
const currentDay = today.getDate(); // Получаем текущий день месяца

points.forEach((point) => {
  const dialogId = parseInt(point.getAttribute('data-dialog'));
  if (localStorage.getItem(`point-${dialogId}`) === 'opened') {
    point.classList.add('opened');
  }
  if (dialogId <= currentDay) {
    point.addEventListener('click', () => {
      // Показываем диалог
      activeDialogSteps = dialogSteps[dialogId];
      currentDialogIndex = 0;
      showDialogStep();
    // Сохраняем в localStorage
    localStorage.setItem(`point-${dialogId}`, 'opened');
      // Добавляем класс "opened" для кружка
      point.classList.add('opened');
    });
  } else {
    point.addEventListener('click', () => {
      alert("Эта точка будет доступна позже!");
    });
  }
});


// Показать текущий шаг диалога
function showDialogStep() {
  if (currentDialogIndex < activeDialogSteps.length) {
    dialogText.textContent = activeDialogSteps[currentDialogIndex];
    dialogOverlay.style.display = 'flex';
  } else {
    closeDialog();
  }
}

// Кнопка "Продолжить"
dialogButton.addEventListener('click', () => {
  currentDialogIndex++;
  showDialogStep();
});

// Закрыть диалог
function closeDialog() {
  dialogOverlay.style.display = 'none';
}

// Генерация снежинок
// const snowContainer = document.getElementById("snowContainer");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄"; // Символ снежинки
  
  // Случайное расположение, размер и продолжительность анимации
  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.fontSize = Math.random() * 10 + 10 + "px"; // 10px - 20px
  snowflake.style.animationDuration = Math.random() * 3 + 5 + "s"; // 5-8 секунд
  
  // Добавляем в контейнер
  document.getElementById("snowContainer").appendChild(snowflake);
  
  // Удаление после завершения
  setTimeout(() => {
      snowflake.remove();
  }, 5000);
}

setInterval(createSnowflake, 50);

// музыка
// const bgMusic = document.getElementById('bgMusic');
// bgMusic.volume = 0.2; // Уровень громкости (0.0 до 1.0)
// bgMusic.play(); // Воспроизвести музыку

const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.2; // Уровень громкости (0.0 до 1.0)

// Добавляем слушатель события, который запускает музыку после взаимодействия
document.addEventListener('click', function playMusic() {
    bgMusic.play().catch(error => {
        console.error("Ошибка при воспроизведении музыки:", error);
    });

    // Удаляем обработчик после первого запуска
    document.removeEventListener('click', playMusic);
});


// щелчок
const clickSound = document.getElementById('clickSound');

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0; // Сброс времени (чтобы звук играл каждый раз)
        clickSound.play(); // Проиграть звук
    });
});


// для диалогов
