// Custom JavaScript for Vital AI Landing Page

document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll behavior
    const navbar = document.querySelector(".navbar")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.padding = "0.5rem 0"
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
      } else {
        navbar.style.padding = "1rem 0"
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      }
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const navbarHeight = document.querySelector(".navbar").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          const navbarToggler = document.querySelector(".navbar-toggler")
          const navbarCollapse = document.querySelector(".navbar-collapse")
          if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click()
          }
        }
      })
    })
  
    // Form validation
    const forms = document.querySelectorAll("form")
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        let isValid = true
        const requiredFields = form.querySelectorAll("[required]")
  
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false
            field.classList.add("is-invalid")
          } else {
            field.classList.remove("is-invalid")
          }
        })
  
        // Email validation for email fields
        const emailFields = form.querySelectorAll('input[type="email"]')
        emailFields.forEach((field) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (field.value.trim() && !emailRegex.test(field.value.trim())) {
            isValid = false
            field.classList.add("is-invalid")
          }
        })
  
        if (isValid) {
          // Show success message
          const formContainer = form.parentElement
          const successMessage = document.createElement("div")
          successMessage.className = "alert alert-success mt-3"
          successMessage.textContent = "Thank you! Your submission has been received."
  
          form.style.display = "none"
          formContainer.appendChild(successMessage)
  
          // Reset form after 5 seconds
          setTimeout(() => {
            form.reset()
            form.style.display = "block"
            formContainer.removeChild(successMessage)
          }, 5000)
        }
      })
    })
  
    // Add input event listeners to remove invalid class when user types
    document.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("is-invalid")
      })
    })
  
    // Testimonial hover effect
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    testimonialCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        testimonialCards.forEach((c) => c.classList.remove("active"))
        this.classList.add("active")
      })
    })
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card, .step")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.classList.add("animate")
        }
      })
    }
  
    // Initial check on load
    animateOnScroll()
  
    // Check on scroll
    window.addEventListener("scroll", animateOnScroll)
  })
  
  