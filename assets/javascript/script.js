tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0A0F1F',
            },
            animation: {
                'gradient-glow': 'gradient-glow 5s ease-in-out infinite',
                'shimmer': 'shimmer 4s linear infinite',
                'float-1': 'float 6s ease-in-out infinite',
                'float-2': 'float 7s ease-in-out infinite 1s',
                'float-3': 'float 8s ease-in-out infinite 0.5s',
                'float-4': 'float 9s ease-in-out infinite 1.5s',
            },
            keyframes: {
                'gradient-glow': {
                    '0%, 100%': { 'box-shadow': '0 0 25px 5px rgba(249, 115, 22, 0.4), 0 0 15px 3px rgba(59, 130, 246, 0.3)' },
                    '50%': { 'box-shadow': '0 0 35px 10px rgba(249, 115, 22, 0.2), 0 0 20px 7px rgba(59, 130, 246, 0.5)' },
                },
                'shimmer': {
                    '0%': { 'background-position': '-200% center' },
                    '100%': { 'background-position': '200% center' },
                },
                'float': {
                    '0%, 100%': { 'transform': 'translateY(0px)' },
                    '50%': { 'transform': 'translateY(-20px)' },
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    window.addEventListener('mousemove', e => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .gallery-thumbnail, [role="button"], input').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover'));
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-40% 0px -60% 0px" });

    sections.forEach(section => {
        const sectionRevealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sectionRevealObserver.observe(section);
        observer.observe(section);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const galleryGrid = document.getElementById('gallery-grid');

    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');

    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightboxModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    const closeLightbox = () => {
        lightboxModal.classList.add('hidden');
        if (projectModal.classList.contains('hidden')) {
            document.body.classList.remove('modal-open');
        }
    }

    const openProjectModal = (button) => {
        const title = button.dataset.title;
        const description = button.dataset.description;
        const images = JSON.parse(button.dataset.images);

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        galleryGrid.innerHTML = '';

        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = "Project Screenshot";
            img.className = "gallery-thumbnail rounded-lg w-full h-auto object-cover transition-transform hover:scale-105";
            img.addEventListener('click', () => openLightbox(src));
            galleryGrid.appendChild(img);
        });

        projectModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    const closeProjectModal = () => {
        projectModal.classList.add('hidden');
        if (lightboxModal.classList.contains('hidden')) {
            document.body.classList.remove('modal-open');
        }
    }

    document.querySelectorAll('.view-gallery-btn').forEach(button => {
        button.addEventListener('click', () => openProjectModal(button));
    });

    closeModalBtn.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (event) => {
        if (event.target === projectModal) closeProjectModal();
    });

    document.querySelectorAll('.gallery-thumbnail').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src));
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (event) => {
        if (event.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            if (!lightboxModal.classList.contains('hidden')) {
                closeLightbox();
            } else if (!projectModal.classList.contains('hidden')) {
                closeProjectModal();
            }
        }
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const htmlEl = document.documentElement;

    const updateTheme = (isDark) => {
        htmlEl.classList.toggle('dark', isDark);
        darkIcon.classList.toggle('hidden', isDark);
        lightIcon.classList.toggle('hidden', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = htmlEl.classList.contains('dark');
        updateTheme(!isCurrentlyDark);
    });

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    updateTheme(initialIsDark);

    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const submitButtonText = document.getElementById('submit-button-text');
    const toastSuccess = document.getElementById('toast-success');
    const toastError = document.getElementById('toast-error');
    const toastErrorMessage = document.getElementById('toast-error-message');
    let toastTimeout;

    function showToast(type, message) {
        clearTimeout(toastTimeout);

        const toastToShow = type === 'success' ? toastSuccess : toastError;
        const toastToHide = type === 'success' ? toastError : toastSuccess;

        toastToHide.classList.remove('show');

        if (type === 'error') {
            toastErrorMessage.textContent = message || 'An unexpected error occurred.';
        }

        toastToShow.classList.add('show');

        toastTimeout = setTimeout(() => {
            toastToShow.classList.remove('show');
        }, 5000);
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        submitButtonText.innerHTML = 'Sending...';
        submitButton.disabled = true;

        const formData = new FormData(this);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showToast('success');
                    contactForm.reset();
                } else {
                    showToast('error', data.message);
                }
            })
            .catch(error => {
                showToast('error', 'An unexpected error occurred. Please try again.');
                console.error('Fetch Error:', error);
            })
            .finally(() => {
                submitButtonText.innerHTML = '<i class="fa-solid fa-paper-plane mr-3"></i> Send Message';
                submitButton.disabled = false;
            });
    });
});