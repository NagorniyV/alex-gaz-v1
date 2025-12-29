// калькулятор

document.addEventListener('DOMContentLoaded', function () {
  function calculateSavings() {
    // Отримуємо значення з полів вводу
    const fuelConsumption = parseFloat(document.getElementById('fuel-consumption').value) || 10;
    const annualMileage = parseFloat(document.getElementById('annual-mileage').value) || 15000;
    const petrolPrice = parseFloat(document.getElementById('petrol-price').value) || 55;
    const gasPrice = parseFloat(document.getElementById('gas-price').value) || 28;
    const gboCost = parseFloat(document.getElementById('gbo-cost').value) || 25000;
    
    // Розрахунки
    const annualPetrolCost = (annualMileage / 100) * fuelConsumption * petrolPrice;
    const annualGasCost = (annualMileage / 100) * fuelConsumption * 1.1 * gasPrice; // +10% витрата газу
    const annualSaving = annualPetrolCost - annualGasCost;
    const paybackMonths = (gboCost / annualSaving) * 12;
    const per100kmSaving = (fuelConsumption * petrolPrice) - (fuelConsumption * 1.1 * gasPrice);
    const total3YearSaving = annualSaving * 3 - gboCost;
    
    // Оновлюємо результати
    document.getElementById('annual-saving').textContent = Math.round(annualSaving) + ' ₴';
    document.getElementById('payback-period').textContent = Math.round(paybackMonths) + ' місяців';
    document.getElementById('per-100km').textContent = Math.round(per100kmSaving) + ' ₴';
    document.getElementById('total-saving').textContent = Math.round(total3YearSaving) + ' ₴';
  }
  
  // Автоматичний розрахунок при зміні значень
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateSavings);
  });
  
  // Автоматичний розрахунок при завантаженні
  calculateSavings();
});

// конец калькулятора

 document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Закриваємо всі інші відкриті питання
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Перемикаємо поточний елемент
                item.classList.toggle('active');
            });
        });
        
        // Відкриваємо перше питання за замовчуванням
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    });


    
// МОДАЛЬНОЕ ОКНО И БУРГЕР КНОПКА
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация модального окна');
    
    // Элементы модальных окон
    const callbackModal = document.getElementById('callbackModal');
    const successModal = document.getElementById('successModal');
    const modalForm = document.getElementById('modalForm');
    
    console.log('Найдены элементы:', {
        callbackModal: !!callbackModal,
        successModal: !!successModal,
        modalForm: !!modalForm
    });

    // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
    document.addEventListener('click', function(e) {
        // Открытие по кнопке details-hero-btn
        if (e.target.classList.contains('details-hero-btn')) {
            console.log('✅ Клик по кнопке details-hero-btn');
            
            if (callbackModal) {
                callbackModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                console.log('✅ Модальное окно открыто');
            } else {
                console.error('❌ callbackModal не найден');
            }
        }
    });

    // ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
    document.addEventListener('click', function(e) {
        // Закрытие по крестику
        if (e.target.classList.contains('modal-close')) {
            closeModals();
        }
        
        // Закрытие по клику вне окна
        if (e.target === callbackModal || e.target === successModal) {
            closeModals();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });

    function closeModals() {
        if (callbackModal) callbackModal.style.display = 'none';
        if (successModal) successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // ОБРАБОТКА ФОРМЫ
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📧 ОТПРАВКА ФОРМЫ - НАЧАЛО');
            
            const phone = document.getElementById('modalPhone').value;
            
            // Проверка телефона
            if (!phone) {
                alert('Будь ласка, введіть номер телефону');
                return;
            }

            // Сбор данных формы
            const formData = {
                name: document.getElementById('modalName').value,
                phone: phone,
                carModel: document.getElementById('carModel').value,
                timestamp: new Date().toLocaleString('uk-UA')
            };

            console.log('📧 Данные формы:', formData);
            console.log('🟢 ВЫЗЫВАЕМ sendToTelegram...');

            // ВЫЗОВ ФУНКЦИИ
            try {
                sendToTelegram(formData);
                console.log('🟢 sendToTelegram ВЫЗВАНА УСПЕШНО');
            } catch (error) {
                console.error('❌ ОШИБКА при вызове sendToTelegram:', error);
            }

            // Показ окна успеха
            if (callbackModal) callbackModal.style.display = 'none';
            if (successModal) successModal.style.display = 'block';

            // Автоматическое закрытие через 3 секунды
            setTimeout(() => {
                closeModals();
                modalForm.reset();
            }, 3000);
        });
    }

    // МАСКА ДЛЯ ТЕЛЕФОНА
    const modalPhone = document.getElementById('modalPhone');
    if (modalPhone) {
        modalPhone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('38')) {
                value = value.substring(2);
            }
            let formattedValue = '+38 (';
            
            if (value.length > 0) {
                formattedValue += value.substring(0, 3);
            }
            if (value.length > 3) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length > 6) {
                formattedValue += '-' + value.substring(6, 10);
            }
            
            e.target.value = formattedValue;
        });
    }

    // БУРГЕР МЕНЮ
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileHeaderColumn = document.querySelector('.mobile-header-colum');
    
    if (burgerMenu && mobileHeaderColumn) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            mobileHeaderColumn.classList.toggle('active');
            document.body.style.overflow = mobileHeaderColumn.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.mobile-header-colum .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileHeaderColumn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне области
        document.addEventListener('click', function(event) {
            if (mobileHeaderColumn.classList.contains('active') && 
                !mobileHeaderColumn.contains(event.target) && 
                !burgerMenu.contains(event.target)) {
                burgerMenu.classList.remove('active');
                mobileHeaderColumn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при ресайзе
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileHeaderColumn.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mobileHeaderColumn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ФУНКЦИЯ ОТПРАВКИ В TELEGRAM - УПРОЩЕННАЯ ВЕРСИЯ
function sendToTelegram(data) {
    console.log('🟢 sendToTelegram ВЫЗВАНА!', data);
    
    const botToken = '8370472423:AAFbn4BXuexXC5wk-GP5G3mpsQg02LWZpZY';
    const chatIds = ['398501551', '875408006', '1123218594'];
    
    // Кодируем сообщение для URL
    const text = encodeURIComponent(
        `📞 Нова заявка з сайту!\n\n👤 Ім'я: ${data.name || 'Не вказано'}\n📱 Телефон: ${data.phone}\n🚗 Авто: ${data.carModel || 'Не вказано'}\n⏰ Час: ${data.timestamp}`
    );
    
    console.log('🟡 Закодированное сообщение:', text);

    // Отправляем сообщение всем в массиве через GET запросыыыыыыыыыы
    chatIds.forEach((chatId, index) => {
        console.log(`🟡 Отправка ${index + 1}/${chatIds.length} для chat_id: ${chatId}`);
        
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=HTML`;
        
        console.log('🟡 URL запроса:', url);
        
        // Используем fetch с обработкой ошибок
        fetch(url)
            .then(response => {
                console.log(`🟡 Ответ получен для ${chatId}, статус:`, response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log(`✅ Результат для ${chatId}:`, result);
                if (result.ok) {
                    console.log(`✅ УСПЕХ: Сообщение отправлено в Telegram для ${chatId}`);
                } else {
                    console.error(`❌ ОШИБКА Telegram для ${chatId}:`, result.description);
                    
                    // Если ошибка 403 - бот не может писать пользователю
                    if (result.error_code === 403) {
                        console.error(`❌ Бот не может писать пользователю ${chatId}. Начните диалог с ботом.`);
                    }
                }
            })
            .catch(error => {
                console.error(`❌ ОШИБКА сети для ${chatId}:`, error);
                
                // Альтернативный способ через Image (обходит CORS)
                const img = new Image();
                img.src = url;
                console.log('🟡 Пробуем отправить через Image:', url);
            });
    });
    
    console.log('🟢 sendToTelegram ЗАВЕРШЕНА');
}

// АЛЬТЕРНАТИВНАЯ ФУНКЦИЯ ЕСЛИ ОСНОВНАЯ НЕ РАБОТАЕТ
function sendToTelegramAlternative(data) {
    console.log('🟢 Альтернативная отправка в Telegram');
    
    const botToken = '8370472423:AAFbn4BXuexXC5wk-GP5G3mpsQg02LWZpZY';
    const chatIds = ['398501551', '484881476'];
    
    const text = `📞 Нова заявка з сайту!%0A%0A👤 Ім'я: ${data.name || 'Не вказано'}%0A📱 Телефон: ${data.phone}%0A🚗 Авто: ${data.carModel || 'Не вказано'}%0A⏰ Час: ${data.timestamp}`;
    
    chatIds.forEach(chatId => {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=HTML`;
        
        // Способ 1: через Image (работает всегда)
        const img = new Image();
        img.src = url;
        console.log('🟡 Отправка через Image для', chatId, ':', url);
        
        // Способ 2: через XMLHttpRequest
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
            console.log('🟡 Отправка через XMLHttpRequest для', chatId);
        } catch (error) {
            console.error('❌ Ошибка XMLHttpRequest:', error);
        }
    });
}

//BREND SECTION

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const items = track.querySelectorAll('div'); // Выбираем все div-элементы, содержащие img и p
    
    // Клонируем все элементы (и изображения, и текст) для бесшовности
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
    
    // Перезапуск анимации при скролле (опционально)
    track.addEventListener('animationiteration', () => {
      track.style.animation = 'none';
      void track.offsetWidth; // Trigger reflow
      track.style.animation = 'scroll 40s linear infinite';
    });
  });

// Липкие кнопки (телефон и скролл вверх)// Липкие кнопки - телефон и скролл вверх
window.initStickyButtons = function() {
    console.log('🚀 Инициализация липких кнопок...');
    
    // Получаем элементы
    const phoneBtn = document.getElementById('phoneButton');
    const phonePanel = document.getElementById('phonePanel');
    const scrollBtn = document.getElementById('scrollTopButton');
    
    // Проверяем, что элементы существуют
    if (!phoneBtn || !phonePanel || !scrollBtn) {
        console.error('❌ Не найдены элементы липких кнопок!');
        return;
    }
    
    console.log('✅ Все элементы найдены');
    
    // 1. КНОПКА ТЕЛЕФОНА
    console.log('📱 Настройка кнопки телефона...');
    
    // Флаг для отслеживания состояния панели
    let isPhonePanelOpen = false;
    
    // Клик по кнопке телефона
    phoneBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Останавливаем всплытие
        
        if (isPhonePanelOpen) {
            // Закрываем панель
            phonePanel.classList.remove('active');
            isPhonePanelOpen = false;
            console.log('📴 Панель телефона закрыта');
        } else {
            // Открываем панель
            phonePanel.classList.add('active');
            isPhonePanelOpen = true;
            console.log('📞 Панель телефона открыта');
            
            // Автоматически закрываем через 5 секунд
            setTimeout(() => {
                if (isPhonePanelOpen) {
                    phonePanel.classList.remove('active');
                    isPhonePanelOpen = false;
                    console.log('⏰ Панель телефона закрыта по таймауту');
                }
            }, 5000);
        }
    });
    
    // Закрытие панели при клике в любом другом месте
    document.addEventListener('click', function(e) {
        if (isPhonePanelOpen && 
            !phonePanel.contains(e.target) && 
            !phoneBtn.contains(e.target)) {
            phonePanel.classList.remove('active');
            isPhonePanelOpen = false;
            console.log('🚪 Панель телефона закрыта (клик вне панели)');
        }
    });
    
    // 2. КНОПКА СКРОЛЛА ВВЕРХ
    console.log('⬆️ Настройка кнопки скролла вверх...');
    
    // Находим секцию hero для расчета позиции
    const heroSection = document.querySelector('.hero-section') || 
                       document.querySelector('section:first-of-type') ||
                       document.querySelector('header');
    
    let heroBottom = 0;
    
    if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        heroBottom = window.scrollY + heroRect.bottom;
        console.log(`🎯 Секция hero найдена, нижняя граница: ${heroBottom}px`);
    } else {
        // Если нет hero секции, используем 300px от верха
        heroBottom = 300;
        console.log('⚠️ Секция hero не найдена, используем дефолтную позицию');
    }
    
    // Целевая позиция для показа кнопки (heroBottom + 200px)
    const scrollThreshold = heroBottom + 200;
    console.log(`🎯 Кнопка появится при скролле > ${scrollThreshold}px`);
    
    // Функция показа/скрытия кнопки скролла
    function updateScrollButton() {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        
        if (currentScroll > scrollThreshold) {
            // Показываем кнопку
            if (!scrollBtn.classList.contains('visible')) {
                scrollBtn.classList.add('visible');
                console.log(`⬆️ Показать кнопку (скролл: ${currentScroll}px)`);
            }
        } else {
            // Скрываем кнопку
            if (scrollBtn.classList.contains('visible')) {
                scrollBtn.classList.remove('visible');
                console.log(`⬇️ Скрыть кнопку (скролл: ${currentScroll}px)`);
            }
        }
        
        // Закрываем панель телефона при скролле
        if (isPhonePanelOpen) {
            phonePanel.classList.remove('active');
            isPhonePanelOpen = false;
            console.log('📴 Панель телефона закрыта при скролле');
        }
    }
    
    // Клик по кнопке скролла вверх
    scrollBtn.addEventListener('click', function() {
        console.log('🔼 Скролл наверх');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Закрываем панель телефона если открыта
        if (isPhonePanelOpen) {
            phonePanel.classList.remove('active');
            isPhonePanelOpen = false;
            console.log('📴 Панель телефона закрыта после скролла');
        }
    });
    
    // Инициализация при загрузке
    updateScrollButton();
    
    // Слушаем событие скролла
    window.addEventListener('scroll', updateScrollButton);
    
    // Обновляем позицию при ресайзе (на случай изменения размера hero)
    window.addEventListener('resize', function() {
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            heroBottom = window.scrollY + heroRect.bottom;
            const newThreshold = heroBottom + 200;
            console.log(`🔄 Обновлена позиция: ${newThreshold}px`);
        }
        updateScrollButton();
    });
    
    console.log('🎉 Липкие кнопки успешно инициализированы!');
    
    // Возвращаем объект для отладки
    return {
        phoneBtn,
        phonePanel,
        scrollBtn,
        isPhonePanelOpen: () => isPhonePanelOpen,
        getScrollThreshold: () => scrollThreshold
    };
};

// Автоматический запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM полностью загружен');
    
    // Даем небольшую задержку для гарантированной загрузки всех элементов
    setTimeout(() => {
        if (typeof initStickyButtons === 'function') {
            const stickyButtons = initStickyButtons();
            console.log('🎯 Объект липких кнопок создан:', stickyButtons);
            
            // Добавляем в глобальную область для отладки
            window.stickyButtons = stickyButtons;
        } else {
            console.error('❌ Функция initStickyButtons не найдена!');
        }
    }, 100);
});