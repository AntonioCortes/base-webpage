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
        const pageContent = $('#page-content');
        
        for(const content of pageContentList)
        {
            addContentElement(pageContent, content);
        }

        if('links' in sidebarJson && sidebarJson.links.length > 0)
        {
            const linkList = sidebarJson.links;
            const divider = $('<div>').attr('name', 'divider');

            pageContent.append(divider);

            addLinks(pageContent, linkList);
        }
    });
}

function addContentElement(parentElement, content)
{
    if(Array.isArray(content.content))
    {
        const li = $('<li>');
        const a = $('<a>')
                    .attr('data-bs-toggle', 'collapse')
                    .attr('href', '#' + content.contentId)
                    .attr('role', 'button')
                    .attr('aria-expanded', 'false')
                    .attr('aria-controls', content.contentId)
                    .text(content.text);   
        
        const img = $('<img>').attr('name', 'arrow_menu');

        const ul = $('<ul>')
                    .attr('id', content.contentId)
                    .addClass('collapse show list-unstyled');

        for(contentElement of content.content)
        {
            addContentElement(ul, contentElement);
        }
        
        a.append(img);
        li.append(a);
        li.append(ul);
        parentElement.append(li);
    }
    else
    {
        const li = $('<li>').attr('onclick', 'hideMenuForMobile()')
        const a = $('<a>').text(content.text);

        if('href' in content)
        {
            a.attr('href', content.href);
        }
        else
        {
            a.attr('href', '#')
             .attr('onclick', "changeContent('" + content.content + "')")
        }

        li.append(a);
        parentElement.append(li);
    }
}

function addLinks(parentElement, linkList)
{
    const li = $('<li>');
    const a = $('<a>')
                .attr('data-bs-toggle', 'collapse')
                .attr('href', '#collapse-links')
                .attr('role', 'button')
                .attr('aria-expanded', 'true')
                .attr('aria-controls', 'collapse-links')
                .text('Links');
    
    const ul = $('<ul>')
                .attr('id', 'collapse-links')  
                .addClass('collapse show list-unstyled'); 

    for(const link of linkList)
    {
        addContentElement(ul, link);
    }

    li.append(a);
    li.append(ul);
    parentElement.append(li);
}