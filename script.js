// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu if open
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Pricing Calculator Logic
const checkboxes = document.querySelectorAll('input[name="service"]');
const totalPriceDisplay = document.getElementById('total-price');
const whatsappBtn = document.getElementById('whatsapp-send');

// Replace this with the actual WhatsApp number of the agency
const agencyWhatsAppNumber = '201000000000'; // Example: Egypt number

function calculateTotal() {
    let total = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.value);
        }
    });
    
    // Animate the number change
    animateValue(totalPriceDisplay, parseInt(totalPriceDisplay.innerText), total, 300);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
});

// Send Order via WhatsApp
whatsappBtn.addEventListener('click', () => {
    let selectedServices = [];
    let total = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedServices.push(checkbox.getAttribute('data-name'));
            total += parseInt(checkbox.value);
        }
    });
    
    if (selectedServices.length === 0) {
        alert("يرجى اختيار خدمة واحدة على الأقل قبل الإرسال.");
        return;
    }
    
    let message = "مرحباً وكالة AiTools،%0a%0a";
    message += "أريد الاستفسار عن باقة الخدمات التالية:%0a";
    
    selectedServices.forEach(service => {
        message += "✅ " + service + "%0a";
    });
    
    message += "%0aالإجمالي التقديري: " + total + "$%0a%0a";
    message += "برجاء التواصل معي لإتمام الاتفاق.";
    
    const whatsappUrl = `https://wa.me/${agencyWhatsAppNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
});

// 3D Tilt Effect for Service Cards
const cards = document.querySelectorAll('.service-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});
