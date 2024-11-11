class Content4 extends HTMLElement {
  
    connectedCallback() {
        const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
        
        fetch(baseUrl + 'content-4.html')
            .then(response => response.text())
            .then(html => this.innerHTML = html);
    }
}

customElements.define('component-content-4', Content4);