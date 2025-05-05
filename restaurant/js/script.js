document.addEventListener('DOMContentLoaded', function() {
    // Анимация при прокрутке
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    // Инициализация анимации
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  
    // Обработка формы бронирования
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Здесь можно добавить AJAX-запрос для отправки данных
        console.log('Данные бронирования:', data);
        
        // Показываем уведомление
        alert('Спасибо! Ваш столик забронирован. Мы свяжемся с вами для подтверждения.');
        
        // Сбрасываем форму
        this.reset();
        
        // Закрываем модальное окно (если форма в модальном окне)
        const modal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
        if (modal) modal.hide();
      });
    }
  
    // Обработка формы подписки
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Здесь можно добавить AJAX-запрос
        console.log('Подписка на email:', email);
        
        alert('Спасибо за подписку!');
        this.reset();
      });
    }
  
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Инициализация галереи
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
      galleryModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const imgSrc = button.getAttribute('data-bs-img');
        const modalImg = galleryModal.querySelector('.modal-img');
        modalImg.src = imgSrc;
      });
    }
  
    // Таймер обратного отсчета для акции
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 3); // Акция на 3 дня
      
      const updateCountdown = () => {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
          countdownElement.innerHTML = 'Акция завершена';
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
          <span>${days}d</span> :
          <span>${hours}h</span> :
          <span>${minutes}m</span> :
          <span>${seconds}s</span>
        `;
      };
      
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  
    // Добавление товаров в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('.product-name').textContent;
        const productPrice = product.querySelector('.product-price').textContent;
        
        // Здесь можно добавить логику добавления в корзину
        console.log(`Добавлено в корзину: ${productName} - ${productPrice}`);
        
        // Анимация добавления
        this.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        this.classList.add('btn-success');
        
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-shopping-cart"></i> В корзину';
          this.classList.remove('btn-success');
        }, 2000);
      });
    });
  
    // Инициализация карты (пример для Google Maps)
    function initMap() {
      if (document.getElementById('map')) {
        // Координаты ресторана
        const restaurantLocation = { lat: 55.751244, lng: 37.618423 };
        
        // Создаем карту
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: restaurantLocation,
          styles: [
            {
              "featureType": "poi",
              "stylers": [{ "visibility": "off" }]
            }
          ]
        });
        
        // Добавляем маркер
        new google.maps.Marker({
          position: restaurantLocation,
          map: map,
          title: 'Ресторан "Гастрономия"'
        });
      }
    }
  
    // Загружаем API Google Maps (замените YOUR_API_KEY на реальный ключ)
    if (document.getElementById('map')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
  
  // Функция для инициализации модальных окон
  function initModals() {
    // Инициализация всех модальных окон Bootstrap
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(modalEl => {
      modalEl.addEventListener('shown.bs.modal', function() {
        const video = this.querySelector('video');
        if (video) video.play();
      });
      
      modalEl.addEventListener('hidden.bs.modal', function() {
        const video = this.querySelector('video');
        if (video) video.pause();
      });
    });
  }
  
  // Инициализация после загрузки DOM
  document.addEventListener('DOMContentLoaded', initModals);