document.addEventListener('DOMContentLoaded', function() {
  const currentLanguage = document.getElementById('currentLanguage');
  const languageOptions = document.getElementById('languageOptions');
  const options = document.querySelectorAll('.language-option');
  const switcher = document.querySelector('.language-switcher');

  // Инициализация языка
  const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
  applyTranslations(savedLang);
  updateSwitcher(savedLang);

  // Открытие/закрытие меню
  currentLanguage.addEventListener('click', function(e) {
    e.stopPropagation();
    switcher.classList.toggle('active');
  });

  // Выбор языка
  options.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.dataset.lang;
      localStorage.setItem('selectedLanguage', lang);
      applyTranslations(lang);
      updateSwitcher(lang);
      switcher.classList.remove('active');
    });
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', function() {
    switcher.classList.remove('active');
  });

  // Функция обновления switcher
  function updateSwitcher(lang) {
    const flag = lang === 'ru' ? '🇷🇺' : '🇺🇦';
    const code = lang.toUpperCase();
    document.querySelector('.current-language .lang-flag').textContent = flag;
    document.querySelector('.current-language .lang-code').textContent = code;
  }

  // Функция применения переводов
  function applyTranslations(lang) {
    const translations = {
      ru: {
        "tr-hero-title": "Подбор запчастей по VIN за 5 минут!",
        "tr-hero-slog": "Ваш автомобиль - наши хлопоты",
        "tr-order-title": "Сделай заказ в 4 шага:",
        "tr-order-step1": "Напиши нам",
        "tr-order-txt1": "расскажите, какая запчасть нужна (Фильтра и масла на KIA Picanto 2012)",
         "tr-order-step2": "Предоставьте данные",
        "tr-order-txt2": "VIN-код автомобиля или марка, модель, год автомобиля",
         "tr-order-step3": "Мы подберем запчасти для Вас:",
        "tr-order-txt3": "предоставим все возможные варианты от бюджетного до наилучшего",
        "tr-order-step4": "Делайте заказ и мы отправим запчасть",
        "tr-order-txt4": "самовывоз или доставка курьером по Харькову или отправка новой почтой по всей Украине",
         "tr-order-txt": "Бонус для города Харьков: Подберем проверенное СТО на Вашем районе, для установки купленных запчастей!",
        "tr-parts-title": "У нас есть все типы запчастей:",
        "tr-parts-parts1": "Двигатель и система выхлопа",
        "tr-parts-parts2": "Коробка передач",
        "tr-parts-parts3": "Кузовные детали",
        "tr-parts-parts4": "Тормозная система",
        "tr-parts-parts5": "Подвеска и рулевое",
        "tr-parts-parts6": "Электрика и осветление",
        "tr-parts-parts7": "Охлаждение и отопление",
        "tr-parts-parts8": "Автомобильные жидкости и масла",
        "tr-parts-parts9": "Фильтра",
        "tr-main-title": "Наши преимущества:",
        "tr-main-title1": "Индивидуальный подход:",
        "tr-main-txt1": "Кожному клиенту – внимание и помощь. Подберем, проконсультируем, поможем с установкой.",
        "tr-main-title2": "Сопровождение на всех этапах:",
        "tr-main-txt2": "Мы не исчезним после продажи. Останемся на связи до полного решения Вашего вопроса.",
        "tr-main-title3": "Только проверенные запчасти:",
        "tr-main-txt3": "Оригинал или качественный аналог всегда проверим надёжность поставщика.",
        "tr-main-title4": "10 лет опыта в ремонте авто:",
        "tr-main-txt4": "Знаем, как работает двигатель в реальности, а не только по каталогу",
        "tr-main-title5": "Честность и прозрачность:",
        "tr-main-txt5": "Рекомендуем то, что действительно нужно. Помогаем экономить — без потери качества.",
        "tr-brend-title": "В наличии запчасти к любым корейским и японским маркам авто:",
        "tr-partner-title": "Наши партнеры в Харькове",
        "tr-partner-txt1": "Запчасти, приобретённые у нас, вы можете установить у наших проверенных партнёров по всему Харькову. Мы сотрудничаем только с проверенными автосервисами, что б гарантирывать качественный монтаж и обслуживание.",
        "tr-partner-txt2": "Просто назовите в каком вы районе и мы подскажем ближайшего партнёра!",
        "tr-footer-call" : "Связь с нами:",
        "tr-footer-up" : "Подняться вверх",
        "tr-footer-title" : "Подбор запчастей по VIN за 5 минут!",
        "tr-footer-slog" : "Ваш автомобиль - наши хлопоты.",
        "tr-footer-map" : "Как нас найти",
        "tr-header-nav1": "Как заказать",
        "tr-header-nav2": "Про магазин",
        "tr-header-nav3": "Наши партнёры",
        "tr-callback-txt": "Связь с нами:",
        "tr-callback-btn": "Оставить номер",
        "tr-callback-txtcb": "Заказать звонок",
        "tr-social-viber": "Мы в Viber",
        "tr-social-telegram": "Мы в Telegram",
        "tr-callback-txtmobile": "Позвольте нам решить Ваши проблеммы! Просто оставьте Ваш номер и мы поможем с подбором запчастей!"         
      },
      uk: {
        "tr-hero-title": "Підбір запчастин по VIN за 5 хвилин!",
        "tr-hero-slog": "Ваш автомобіль - наші клопоти",
        "tr-order-title": "Зроби замовлення в 4 кроки:",
        "tr-order-step1": "Напишіть нам",
        "tr-order-txt1": "розкажіть, яка запчастина потрібна (Фільтра і мастила на KIA Picanto 2012)",
         "tr-order-step2": "Надайте данні",
        "tr-order-txt2": "VIN-код автомобіля або марка, модель, рік автомобіля",
         "tr-order-step3": "Ми підбираєм запчастини для вас:",
        "tr-order-txt3": "надамо всі можливі варіанти від бюджетного до найкращого",
         "tr-order-step4": "Робіть замовлення і ми відправляємо запчастину",
        "tr-order-txt4": "самовивіз або доставка кур'єром по Харкову, чи відправка новою поштою по Україні",
        "tr-order-txt": "Бонус для міста Харків: Підберем перевірене СТО на вашому районі, для встановлення придбаного обладнання!",
        "tr-parts-title": "У нас є всі типи запчастин:",
        "tr-parts-parts1": "Двигун і система вихлопу",
        "tr-parts-parts2": "Коробка передач",
        "tr-parts-parts3": "Кузовні деталі",
        "tr-parts-parts4": "Гальмівна система",
        "tr-parts-parts5": "Підвіска та рульове",
        "tr-parts-parts6": "Електрика та освітлення",
        "tr-parts-parts7": "Охолодження та опалення",
        "tr-parts-parts8": "Автомобільні рідини та мастила",
        "tr-parts-parts9": "Фільтри",
        "tr-main-title": "Наші переваги:",
        "tr-main-title1": "Індивідуальний підхід:",
        "tr-main-txt1": "Кожному клієнту – увага та допомога. Підберемо, проконсультуємо, допоможемо із встановленням.",
        "tr-main-title2": "Супровід на всіх етапах:",
        "tr-main-txt2": "Ми не зникаємо після продажу. Залишаємось на зв'язку до повного вирішення вашого завдання.",
        "tr-main-title3": "Тільки перевірені запчастини:",
        "tr-main-txt3": "Оригінал або якісний аналог завжди перевіряємо надійність постачальника.",
        "tr-main-title4": "10 років досвіду в ремонті авто:",
        "tr-main-txt4": "Знаємо, як працює деталь у реальності, а не лише за каталогом.",
        "tr-main-title5": "Чесність та прозорість:",
        "tr-main-txt5": "Рекомендуємо те, що справді потрібно. Допомагаємо заощадити — без втрати якості.",
        "tr-brend-title": "В наявності запчастини до будь-яких корейських та японських марок:",
        "tr-partner-title": "Наші партнери у Харкові",
        "tr-partner-txt1": "Запчастини, придбані у нас, ви можете встановити у наших перевірених партнерів по всьому Харкову. Ми співпрацюємо тільки з перевіреними автосервісами, щоб гарантувати якісний монтаж та обслуговування.",
        "tr-partner-txt2": "Просто скажіть в якому ви районі - ми порадимо найблищого партнера!",
        "tr-footer-call" : "Зв'язок з нами:",
        "tr-footer-up" : "Піднятися в гору",
        "tr-footer-title" : "Підбір запчастин по VIN за 5 хвилин!",
        "tr-footer-slog" : "Ваш автомобіль - наші клопоти.",
        "tr-footer-map": "Як нас знайти",
        "tr-header-nav1": "Як замовити",
        "tr-header-nav2": "Про магазин",
        "tr-header-nav3": "Наші партнери",
        "tr-callback-txt": "Зв'язок з нами:",
        "tr-callback-btn": "Залишити номер",
        "tr-callback-txtcb": "Замовити дзвінок",
        "tr-social-viber": "Ми у Viber",
        "tr-social-telegram": "Ми у Telegram",
        "tr-callback-txtmobile": "Дозвольте нам вирішити Ваші проблеми! Просто надайте Ваш номер і ми допоможемо з підбором запчастин!"
      }
    };
    
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      el.textContent = translations[lang][key] || key;
    });
  }
});

//  data-translate=""