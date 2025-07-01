//кнопка Піднятись в гору

document.getElementById('back-to-top').addEventListener('click', function(e) {
  e.preventDefault(); // Отменяем стандартное поведение ссылки
  
  // Находим элемент header
  const headerElement = document.getElementById('header');
  
  // Плавный скролл до header
  if (headerElement) {
    headerElement.scrollIntoView({
      behavior: 'smooth'
    });
  }
});

// БУРГЕР КНОПКА

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Бургер-меню
  burger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Проверка, мобильное ли устройство (или узкий экран)
  const isMobile = () => window.innerWidth <= 992;

  // Обработка выпадающего меню (только на компьютере)
  if (!isMobile()) {
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      const content = dropdown.querySelector('.dropdown-content');

      // Показываем при наведении
      dropdown.addEventListener('mouseenter', () => {
        content.style.display = 'block';
      });

      // Скрываем при уходе курсора
      dropdown.addEventListener('mouseleave', () => {
        content.style.display = 'none';
      });

      // Отменяем стандартное поведение ссылки (если href="#")
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
      });
    });
  }

  // На мобильных устройствах dropdown-content НЕ показывается вообще
  else {
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      const content = dropdown.querySelector('.dropdown-content');

      // Скрываем dropdown-content (если вдруг был виден)
      content.style.display = 'none';

      // Отключаем клик по ссылке (если href="#")
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
      });
    });
  }

  // Обновляем поведение при изменении размера окна
  window.addEventListener('resize', () => {
    dropdowns.forEach(dropdown => {
      const content = dropdown.querySelector('.dropdown-content');
      content.style.display = 'none'; // Сбрасываем при любом изменении
    });

    // Если перешли в десктопный режим — включаем обработку наведения
    if (!isMobile()) {
      dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown-content');

        dropdown.addEventListener('mouseenter', () => {
          content.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
          content.style.display = 'none';
        });
      });
    }
  });
});

// МОДАЛЬНОЕ ОКНО + ФОРМА ОБРАТНОЙ СВЯЗИ
document.addEventListener('DOMContentLoaded', function() {
  // Общие настройки
  const botToken = '7401776138:AAEIszjxs4_-9alGK01THnbG9VHvAGUrEwA';
  const adminChatIds = ['398501551', '5370980969', '5235424421'];

  // ===== МОДАЛЬНОЕ ОКНО =====
  const modal = document.getElementById('callbackModal');
  const modalForm = document.getElementById('modalForm');
  
  // Открытие/закрытие модалки
  document.querySelector('.details-hero-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  });

  // Закрытие при клике вне окна
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });

  document.querySelector('.modal-close')?.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  // ===== ОБРАБОТКА ПОЛЯ ТЕЛЕФОНА =====
  const phoneInput = document.getElementById('modalPhone');
if (phoneInput) {
  // Автоматическое добавление +38 при фокусе
  phoneInput.addEventListener('focus', function() {
    if (!this.value.startsWith('+38')) {
      this.value = '+38';
    }
  });

  // Форматирование ввода телефона
  phoneInput.addEventListener('input', function(e) {
    // Удаляем всё, кроме цифр
    let cleaned = this.value.replace(/\D/g, '');
    
    // Добавляем +38, если его нет
    if (!cleaned.startsWith('38')) {
      cleaned = '38' + cleaned;
    }
    
    // Обрезаем до 12 цифр (38 + 10 цифр)
    cleaned = cleaned.substring(0, 12);
    
    // Форматируем: +38 XXX XXX XXXX (15 символов с пробелами)
    let formatted = '+38';
    if (cleaned.length > 2) {
      formatted += ' ' + cleaned.substring(2, 5);
    }
    if (cleaned.length > 5) {
      formatted += ' ' + cleaned.substring(5, 8);
    }
    if (cleaned.length > 8) {
      formatted += ' ' + cleaned.substring(8, 12);
    }
    
    this.value = formatted;
  });

  // Валидация при потере фокуса
  phoneInput.addEventListener('blur', function() {
    const digitsOnly = this.value.replace(/\D/g, '');
    if (!digitsOnly.startsWith('38') || digitsOnly.length < 12) {
      this.setCustomValidity('Введите 10 цифр номера после +38');
    } else {
      this.setCustomValidity('');
    }
  });
}

  // ===== ОБРАБОТКА ОТПРАВКИ ФОРМЫ =====
  if (modalForm) {
    modalForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Форма модального окна отправлена'); // Для отладки
      
      // Получаем значения полей
      const name = document.getElementById('modalName')?.value.trim();
      const phone = document.getElementById('modalPhone')?.value.trim();
      const vin = document.getElementById('modalVin')?.value.trim();
      const carModel = document.getElementById('modalCar')?.value.trim();

      // Валидация телефона
      const phoneRegex = /^\+38\s?\d{3}\s?\d{3}\s?\d{4}$/;
      if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона в формате +38 XXX XXX XXXX');
        return;
      }

      // Формируем сообщение
      const message = `🚗 Новая заявка обратный звонок:\n\n` +
                     `▪ Имя: ${name || 'не указано'}\n` +
                     `▪ Телефон: ${phone}\n` +
                     `▪ VIN: ${vin || 'не указан'}\n` +
                     `▪ Авто: ${carModel || 'не указано'}`;

      try {
        console.log('Отправляем в Telegram:', message); // Для отладки
        await sendToTelegram(message);
        
        // Успешная отправка
        alert('✅ Дякуємо! Ми вам зателефонуємо найближчим часом.');
        modalForm.reset();
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      } catch (error) {
        console.error('Відбулася помилка:', error);
        alert('⚠ Відбулася помилка. Будь ласка, спробуйте ще раз або зателефонуйте нам.');
      }
    });
  }

  // ===== ОТПРАВКА В TELEGRAM =====
  async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    for (const chatId of adminChatIds) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
    }
  }
});



// ФОРМА ОБРАТНОЙ СВЯЗИ
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phoneInput');
  const callbackForm = document.getElementById('callbackForm');
  
  // Автоматическое добавление +38 при фокусе
  if (phoneInput) {
    phoneInput.addEventListener('focus', function() {
      if (!this.value.startsWith('+38')) {
        this.value = '+38';
      }
    });

    // Форматирование ввода телефона
    phoneInput.addEventListener('input', function(e) {
      // Удаляем всё, кроме цифр
      let cleaned = this.value.replace(/\D/g, '');
      
      // Добавляем +38, если его нет
      if (!cleaned.startsWith('38')) {
        cleaned = '38' + cleaned;
      }
      
      // Обрезаем до 12 цифр (38 + 10 цифр)
      cleaned = cleaned.substring(0, 12);
      
      // Форматируем: +38 XXX XXX XXXX
      let formatted = '+38';
      if (cleaned.length > 2) {
        formatted += ' ' + cleaned.substring(2, 5);
      }
      if (cleaned.length > 5) {
        formatted += ' ' + cleaned.substring(5, 8);
      }
      if (cleaned.length > 8) {
        formatted += ' ' + cleaned.substring(8, 12);
      }
      
      this.value = formatted;
    });
  }

  // Обработка отправки формы
  if (callbackForm) {
    callbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('nameInput').value.trim();
      const phoneNumber = document.getElementById('phoneInput').value.trim();
      const messageText = document.getElementById('messageInput').value.trim();
      const responseMessage = document.getElementById('responseMessage');
      
      // Валидация номера телефона (ровно 10 цифр после +38)
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      if (!cleanPhone.startsWith('38') || cleanPhone.length !== 12) {
        responseMessage.textContent = "Введіть коректний номер телефону у форматі +38 XXX XXX XXXX!";
        responseMessage.className = "response-message error";
        responseMessage.style.display = "block";
        return;
      }

      // Формируем сообщение для Telegram
      const telegramMessage = `🚗 Новая заявка обратный звонок:\n\n` +
                         `▪ Имя: ${name || 'не указано'}\n` +
                         `▪ Телефон: ${phoneNumber}\n` +
                         `▪ Авто: ${messageText || 'не указано'}`;

      const botToken = '7401776138:AAEIszjxs4_-9alGK01THnbG9VHvAGUrEwA';
      const adminChatIds = ['398501551', '5370980969', '5235424421'];
      
      // Отправляем запросы
      Promise.all(
        adminChatIds.map(chatId => 
          fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage
            })
          })
        )
      )
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        responseMessage.textContent = "Дякуємо! Ми вам зателефонуємо найближчим часом.";
        responseMessage.className = "response-message success";
        responseMessage.style.display = "block";
        callbackForm.reset();
        
        setTimeout(() => {
          responseMessage.style.display = "none";
        }, 5000);
      })
      .catch(error => {
        console.error("Помилка відправки:", error);
        responseMessage.textContent = "Помилка відправки. Спробуйте ще раз або зателефонуйте нам.";
        responseMessage.className = "response-message error";
        responseMessage.style.display = "block";
      });
    });
  }
});