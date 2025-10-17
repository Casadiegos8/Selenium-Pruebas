// Navigation between test cases
function showSection(caseId) {
  const sections = document.querySelectorAll(".test-case")
  sections.forEach((section) => section.classList.remove("active"))
  document.getElementById(caseId).classList.add("active")
}

// CASO 1: Login Form Validation
const loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Clear previous errors
  document.getElementById("login-email-error").textContent = ""
  document.getElementById("login-password-error").textContent = ""
  document.getElementById("login-success").style.display = "none"

  let isValid = true

  // Email validation
  if (!email) {
    document.getElementById("login-email-error").textContent = "El email es requerido"
    isValid = false
  } else if (!isValidEmail(email)) {
    document.getElementById("login-email-error").textContent = "Email inválido"
    isValid = false
  }

  // Password validation
  if (!password) {
    document.getElementById("login-password-error").textContent = "La contraseña es requerida"
    isValid = false
  } else if (password.length < 6) {
    document.getElementById("login-password-error").textContent = "La contraseña debe tener al menos 6 caracteres"
    isValid = false
  }

  // Check credentials
  if (isValid) {
    if (email === "test@selenium.com" && password === "test123") {
      const successMsg = document.getElementById("login-success")
      successMsg.textContent = "✓ Login exitoso! Bienvenido."
      successMsg.style.display = "block"
      loginForm.reset()
    } else {
      document.getElementById("login-password-error").textContent = "Credenciales incorrectas"
    }
  }
})

// CASO 2: Register Form Validation
const registerForm = document.getElementById("register-form")
registerForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const firstname = document.getElementById("reg-firstname").value
  const lastname = document.getElementById("reg-lastname").value
  const email = document.getElementById("reg-email").value
  const phone = document.getElementById("reg-phone").value
  const country = document.getElementById("reg-country").value
  const age = document.getElementById("reg-age").value
  const terms = document.getElementById("terms").checked

  // Clear previous errors
  document.querySelectorAll("#register-form .error-message").forEach((el) => (el.textContent = ""))
  document.getElementById("register-success").style.display = "none"

  let isValid = true

  if (!firstname) {
    document.getElementById("reg-firstname-error").textContent = "El nombre es requerido"
    isValid = false
  }

  if (!lastname) {
    document.getElementById("reg-lastname-error").textContent = "El apellido es requerido"
    isValid = false
  }

  if (!email) {
    document.getElementById("reg-email-error").textContent = "El email es requerido"
    isValid = false
  } else if (!isValidEmail(email)) {
    document.getElementById("reg-email-error").textContent = "Email inválido"
    isValid = false
  }

  if (!country) {
    document.getElementById("reg-country-error").textContent = "Selecciona un país"
    isValid = false
  }

  if (age && (age < 18 || age > 100)) {
    document.getElementById("reg-age-error").textContent = "La edad debe estar entre 18 y 100"
    isValid = false
  }

  if (!terms) {
    alert("Debes aceptar los términos y condiciones")
    isValid = false
  }

  if (isValid) {
    const successMsg = document.getElementById("register-success")
    successMsg.textContent = "✓ Registro exitoso! Bienvenido " + firstname + " " + lastname
    successMsg.style.display = "block"
    registerForm.reset()
  }
})

// CASO 3: Contact Form Validation
const contactForm = document.getElementById("contact-form")
const messageTextarea = document.getElementById("contact-message")
const charCount = document.getElementById("char-count")

messageTextarea.addEventListener("input", function () {
  const length = this.value.length
  charCount.textContent = length + " / 500 caracteres"

  if (length > 500) {
    charCount.style.color = "#e74c3c"
  } else {
    charCount.style.color = "#666"
  }
})

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("contact-name").value
  const email = document.getElementById("contact-email").value
  const subject = document.getElementById("contact-subject").value
  const message = document.getElementById("contact-message").value

  // Clear previous errors
  document.querySelectorAll("#contact-form .error-message").forEach((el) => (el.textContent = ""))
  document.getElementById("contact-success").style.display = "none"

  let isValid = true

  if (!name) {
    document.getElementById("contact-name-error").textContent = "El nombre es requerido"
    isValid = false
  }

  if (!email) {
    document.getElementById("contact-email-error").textContent = "El email es requerido"
    isValid = false
  } else if (!isValidEmail(email)) {
    document.getElementById("contact-email-error").textContent = "Email inválido"
    isValid = false
  }

  if (!subject) {
    document.getElementById("contact-subject-error").textContent = "Selecciona un asunto"
    isValid = false
  }

  if (!message) {
    document.getElementById("contact-message-error").textContent = "El mensaje es requerido"
    isValid = false
  } else if (message.length > 500) {
    document.getElementById("contact-message-error").textContent = "El mensaje no puede exceder 500 caracteres"
    isValid = false
  }

  if (isValid) {
    const successMsg = document.getElementById("contact-success")
    successMsg.textContent = "✓ Mensaje enviado exitosamente!"
    successMsg.style.display = "block"
    contactForm.reset()
    charCount.textContent = "0 / 500 caracteres"
  }
})

// CASO 4: Table Functionality
const searchInput = document.getElementById("search-input")
const tableBody = document.getElementById("table-body")
const selectAllCheckbox = document.getElementById("select-all")
const selectedCountSpan = document.getElementById("selected-count")

// Search functionality
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase()
  const rows = tableBody.getElementsByTagName("tr")

  Array.from(rows).forEach((row) => {
    const text = row.textContent.toLowerCase()
    row.style.display = text.includes(searchTerm) ? "" : "none"
  })
})

// Select all checkbox
selectAllCheckbox.addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(".row-checkbox")
  checkboxes.forEach((cb) => (cb.checked = this.checked))
  updateSelectedCount()
})

// Individual checkbox change
tableBody.addEventListener("change", (e) => {
  if (e.target.classList.contains("row-checkbox")) {
    updateSelectedCount()
  }
})

function updateSelectedCount() {
  const checkedBoxes = document.querySelectorAll(".row-checkbox:checked")
  selectedCountSpan.textContent = checkedBoxes.length + " filas seleccionadas"
}

// Delete selected rows
document.getElementById("delete-selected-btn").addEventListener("click", () => {
  const checkedBoxes = document.querySelectorAll(".row-checkbox:checked")
  if (checkedBoxes.length === 0) {
    alert("No hay filas seleccionadas")
    return
  }

  if (confirm("¿Estás seguro de eliminar " + checkedBoxes.length + " fila(s)?")) {
    checkedBoxes.forEach((cb) => {
      cb.closest("tr").remove()
    })
    updateSelectedCount()
    selectAllCheckbox.checked = false
  }
})

// Delete individual row
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("¿Estás seguro de eliminar esta fila?")) {
      e.target.closest("tr").remove()
      updateSelectedCount()
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    alert("Función de edición - Aquí podrías abrir un modal para editar")
  }
})

// Add new row
document.getElementById("add-row-btn").addEventListener("click", () => {
  const newId = tableBody.getElementsByTagName("tr").length + 1
  const newRow = `
        <tr>
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${newId}</td>
            <td>Usuario Nuevo ${newId}</td>
            <td>usuario${newId}@ejemplo.com</td>
            <td><span class="badge badge-pending">Pendiente</span></td>
            <td>
                <button class="btn-icon edit-btn" title="Editar">✏️</button>
                <button class="btn-icon delete-btn" title="Eliminar">🗑️</button>
            </td>
        </tr>
    `
  tableBody.insertAdjacentHTML("beforeend", newRow)
})

// Sort table
const sortDirection = {}
function sortTable(columnIndex) {
  const table = document.getElementById("data-table")
  const rows = Array.from(tableBody.getElementsByTagName("tr"))

  sortDirection[columnIndex] = !sortDirection[columnIndex]

  rows.sort((a, b) => {
    const aValue = a.getElementsByTagName("td")[columnIndex].textContent
    const bValue = b.getElementsByTagName("td")[columnIndex].textContent

    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortDirection[columnIndex] ? aValue - bValue : bValue - aValue
    }

    return sortDirection[columnIndex] ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
  })

  rows.forEach((row) => tableBody.appendChild(row))
}

// CASO 5: Dynamic Elements
// Alerts
document.getElementById("alert-success").addEventListener("click", () => showAlert("success", "¡Operación exitosa!"))
document
  .getElementById("alert-warning")
  .addEventListener("click", () => showAlert("warning", "Advertencia: Revisa los datos"))
document.getElementById("alert-error").addEventListener("click", () => showAlert("error", "Error: Algo salió mal"))
document.getElementById("alert-info").addEventListener("click", () => showAlert("info", "Información importante"))

function showAlert(type, message) {
  const alertContainer = document.getElementById("alert-container")
  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.textContent = message
  alertContainer.appendChild(alert)

  setTimeout(() => {
    alert.remove()
  }, 3000)
}

// Modal
const modal = document.getElementById("modal")
const openModalBtn = document.getElementById("open-modal")
const closeModalBtn = document.getElementById("modal-close")
const cancelModalBtn = document.getElementById("modal-cancel")

openModalBtn.addEventListener("click", () => {
  modal.classList.add("show")
})

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show")
})

cancelModalBtn.addEventListener("click", () => {
  modal.classList.remove("show")
})

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show")
  }
})

document.getElementById("modal-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const input = document.getElementById("modal-input").value
  alert("Valor ingresado: " + input)
  modal.classList.remove("show")
  document.getElementById("modal-form").reset()
})

// Toggle element
document.getElementById("toggle-element").addEventListener("click", () => {
  const toggleBox = document.getElementById("toggle-box")
  const toggleText = document.getElementById("toggle-text")

  if (toggleBox.classList.contains("hidden")) {
    toggleBox.classList.remove("hidden")
    toggleText.textContent = "Visible"
  } else {
    toggleBox.classList.add("hidden")
    toggleText.textContent = "Oculto"
  }
})

// Load content dynamically
document.getElementById("load-content").addEventListener("click", () => {
  const spinner = document.getElementById("loading-spinner")
  const content = document.getElementById("dynamic-content")

  spinner.classList.remove("hidden")
  content.innerHTML = ""

  setTimeout(() => {
    spinner.classList.add("hidden")
    content.innerHTML = `
            <h4>Contenido Cargado Dinámicamente</h4>
            <p>Este contenido se cargó después de 2 segundos.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
        `
  }, 2000)
})

// Dropdown
const dropdownBtn = document.getElementById("dropdown-btn")
const dropdownMenu = document.getElementById("dropdown-menu")

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show")
})

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    dropdownMenu.classList.remove("show")
  }
})

dropdownMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item")) {
    e.preventDefault()
    alert("Seleccionaste: " + e.target.textContent)
    dropdownMenu.classList.remove("show")
  }
})

// Counter
let counter = 0
const counterDisplay = document.getElementById("counter")

document.getElementById("increment").addEventListener("click", () => {
  counter++
  counterDisplay.textContent = counter
})

document.getElementById("decrement").addEventListener("click", () => {
  counter--
  counterDisplay.textContent = counter
})

document.getElementById("reset").addEventListener("click", () => {
  counter = 0
  counterDisplay.textContent = counter
})

// Helper function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
