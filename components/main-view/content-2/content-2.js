class Content2 extends HTMLElement {
  
    connectedCallback() {
        const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
        
        fetch(baseUrl + 'content-2.html')
            .then(response => response.text())
            .then(html => this.innerHTML = html);
    }
  }
  
  customElements.define('component-content-2', Content2);