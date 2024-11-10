/*class Content1 extends HTMLElement {
  
    connectedCallback() {
        const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
        
        fetch(baseUrl + 'content-1.html')
            .then(response => response.text())
            .then(html => this.innerHTML = html);
    }
  }
  
  customElements.define('componente-content-1', Content1);*/