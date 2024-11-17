
export function createComponent(tagName, htmlFilePath) 
{
    class Component extends HTMLElement 
    {      
        connectedCallback() 
        { 
            fetch(htmlFilePath)
                .then(response => response.text())
                .then(html => 
                {
                    $(this).html(this.scapeAngleBrackets(html));
                    this.highlightCode();
                });
        }

        scapeAngleBrackets(html) 
        {
            return html.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/g, function (match, codeContent)
                {
                    const escapedContent = codeContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return `<code>${escapedContent}</code>`;
                }
            );
        }

        addCodeLineNumbers()
        {
            $('code').each( function(index, code) {
                code.innerHTML = code.innerHTML.trim();

                const lineCount = this.innerHTML.match(/[^\n]*\n[^\n]*/gi).length
                
                const div = document.createElement('div');
                div.classList.add('hljs');
                div.classList.add('padding-14');

                for(let i = 1; i < lineCount + 2; i++)
                {
                    const div2 = document.createElement('div');

                    div2.innerText = i;
                    div.appendChild(div2);
                }

                code.parentElement.insertBefore(div, code);
            });
        }

        highlightCode() 
        {       
            $('[data-bs-toggle="tooltip"]').tooltip();  

            setTimeout(function () 
            {
                hljs.highlightAll();

                const options = {
                    copyIconClass: "bi bi-files",
                    checkIconClass: "bi bi-check-lg text-success",
                };
                window.highlightJsBadge(options);

                this.addCodeLineNumbers();
            }.bind(this), 50);
        }
    }
    
    customElements.define(tagName, Component);
}