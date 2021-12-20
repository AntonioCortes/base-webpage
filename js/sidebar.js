function toggleSidebar()
{
    $('#sidebar').toggleClass('active');
}

function hideMenuForMobile()
{
	if(window.innerWidth <= 992)
    {
        toggleSidebar()
    };
}

function addSidebarContent(view)
{
    const sidebarJsonPath = view.paths.sidebar;
    
    $.getJSON(sidebarJsonPath, function(sidebarJson) 
    {
        const pageContentList = sidebarJson.pageContent;
        const linkList = sidebarJson.links;
        const pageContent = $('#page-content');
        const links = $('#links');

        for(const content of pageContentList)
        {
            addContentElement(pageContent, content);
        }

        for(const link of linkList)
        {
            addLink(links, link);
        }
    });
}

function addContentElement(parentElement, content)
{
    if(Array.isArray(content.content))
    {
        /*const a = document.createElement('a');
        a.setAttribute('data-bs-toggle', 'collapse');
        a.href = '#collapse1';
        a.setAttribute('role', 'button');
        a.setAttribute('aria-expanded', 'true');
        a.setAttribute('aria-controls', 'collapse1');
        a.innerText = content.text;*/
        
        /*const img = document.createElement('img');
        img.name = 'arrow_menu';

        a.appendChild(img);
        parentElement.append(a);*/
        /*const a = $('<a>', {
            'data-bs-toggle': 'collapse',
            href: '#collapse1',
            role: 'button',
            'aria-expanded': 'collapse',
            'aria-controls': 'collapse1',
            innerText: content.text,
        });*/
        const a = $('<a>')
        .attr('href', '#')
        .text('Ejemplo');
        parentElement.append(a);

        console.log(parentElement);
        console.log(a);


    }
    else
    {
    }
}

function addLink(parentElement, link)
{

}

