function abrirFormulario() {
    const urlFormulario = "https://www.onescreensolutions.com/en/demo/"; // URL corregida
  
    document.getElementById("contactModal").style.display = "block";
    document.getElementById("formIframe").src = urlFormulario;
    document.getElementById("successMessage").style.display = "none";
  
    // Intentar configurar listener
    configurarListenerFormulario();
  }
  
  function cerrarFormulario() {
    document.getElementById("contactModal").style.display = "none";
    document.getElementById("formIframe").src = "";
  }
  
  function configurarListenerFormulario() {
    const iframe = document.getElementById("formIframe");
  
    iframe.onload = function () {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  
        const formularios = iframeDoc.querySelectorAll("form");
  
        formularios.forEach((form) => {
          form.addEventListener("submit", function () {
            document.getElementById("successMessage").style.display = "block";
  
            setTimeout(() => {
              cerrarFormulario();
            }, 3000);
          });
        });
      } catch (error) {
        console.warn("Dominio diferente, usando método alternativo.");
        configurarDeteccionAlternativa();
      }
    };
  }
  
  function configurarDeteccionAlternativa() {
    // Intentar con postMessage
    window.addEventListener("message", function (event) {
      if (event.data === "formSubmitted") {
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
          cerrarFormulario();
        }, 3000);
      }
    });
  
    // Cierre automático en 1 minuto como fallback
    setTimeout(() => {
      cerrarFormulario();
    }, 60000);
  }
  
  // Abrir modal al hacer clic en cualquier parte del body (excepto dentro del modal)
  document.addEventListener("click", function (event) {
    const modal = document.getElementById("contactModal");
    const modalContent = document.querySelector(".modal-content");
  
    const modalVisible = modal.style.display === "block";
    const esClicEnModal = modalContent.contains(event.target);
    const esBotonCerrar = event.target.classList.contains("close");
  
    if (!modalVisible && !esClicEnModal && !esBotonCerrar) {
      abrirFormulario();
    }
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  window.onclick = function (event) {
    const modal = document.getElementById("contactModal");
    if (event.target === modal) {
      cerrarFormulario();
    }
  };
  
  // Cerrar con tecla Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      cerrarFormulario();
    }
  });
  