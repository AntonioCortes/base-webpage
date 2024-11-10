class ComponentePrueba extends HTMLElement {
  
    connectedCallback() {
        const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
        
        fetch(baseUrl + 'componente-prueba.html')
            .then(response => response.text())
            .then(html => this.innerHTML = html);
    }
  }
  
  customElements.define('componente-prueba', ComponentePrueba);
