const initialPaddingLeft = 10;
const innerElementsPaddingLeft = 10;
let contentIdCount = 0;

function toggleSidebar()
{
    $('#sidebar').toggleClass('hide');
    $('#sidebar').toggleClass('show');
}

function showSidebar()
{
    const sidebar = $('#sidebar');

    if(sidebar.attr('class') !== undefined && sidebar.attr('class').split(/\s+/).includes('hide'))
    {
        sidebar.removeClass('hide');
        sidebar.addClass('show');    
    }
}

function hideSidebar()
{
    const sidebar = $('#sidebar');

    if(sidebar.attr('class') === undefined || !sidebar.attr('class').split(/\s+/).includes('hide'))
    {
        sidebar.removeClass('show');
        sidebar.addClass('hide');
    }
}

function addSidebarContent(view)
{
    const sidebarJsonPath = view.paths.basePath + '/common/assets/sidebar.json';
    
    addNavbarLinks();

    $.getJSON(sidebarJsonPath, function(sidebarJson) 
    {
        const pageContentList = sidebarJson.pageContent;
        const pageContent = $('#page-content');
        
        pageContentList.forEach(function(content, index) {
            const isCollapsed = index > 0;
            addContentElement(pageContent, content, isCollapsed, initialPaddingLeft);
        });

        if('links' in sidebarJson && sidebarJson.links.length > 0)
        {
            const linkList = sidebarJson.links;
            const divider = $('<div>').attr('name', 'divider');

            pageContent.append(divider);

            addLinks(pageContent, linkList, initialPaddingLeft);
        }
    });
}

function addContentElement(parentElement, content, isCollapsed, paddingLeft)
{
    const nextPaddingLeft = paddingLeft + innerElementsPaddingLeft;
    contentIdCount++;

    if(Array.isArray(content.content))
    {
        const contentId = `${content.text.replaceAll(' ', '-')}-${contentIdCount}`;

        const li = $('<li>');
        const a = $('<a>')
                    .attr('data-bs-toggle', 'collapse')
                    .attr('href', '#' + contentId)
                    .attr('role', 'button')
                    .attr('aria-expanded', 'true')
                    .attr('aria-controls', contentId)
                    .css({ 'padding-left' : `${paddingLeft}px`})
                    .text(content.text);
                    
        if(initialPaddingLeft === paddingLeft) 
        {
            a.addClass('primary-a');
        } 
        else 
        {
            a.addClass('secondary-a');
        }
        
        const img = $('<img>')
                        .attr('name', 'arrow_menu')
                        .attr('src', 'components/common/assets/svg/simple-arrow.svg');

        const ul = $('<ul>')
                    .attr('id', contentId)
                    .addClass('collapse show list-unstyled');

        if(isCollapsed) {
            a.attr('aria-expanded', false);
            ul.removeClass('show');
        }              

        for(const contentElement of content.content)
        {
            addContentElement(ul, contentElement, true, nextPaddingLeft);
        }
        
        a.append(img);
        li.append(a);
        li.append(ul);
        parentElement.append(li);
    }
    else
    {
        const li = $('<li>');
        const a = $('<a>')
                    .text(content.text)
                    .css( { 'padding-left' : `${paddingLeft}px` } );

        if(initialPaddingLeft === paddingLeft) 
        {
            a.addClass('primary-a');
        } 
        else 
        {
            a.addClass('secondary-a');
        }

        if('href' in content)
        {
            a.attr('href', content.href);
        }
        else
        {
            a.attr('href', '#')
             .attr('onclick', "changeContent('" + content.content + "')")
             .addClass('link');
        }

        li.append(a);
        parentElement.append(li);
    }
}

function addLinks(parentElement, linkList, paddingLeft)
{
    const li = $('<li>');
    const a = $('<a>')
                .attr('data-bs-toggle', 'collapse')
                .attr('href', '#collapse-links')
                .attr('role', 'button')
                .attr('aria-expanded', 'true')
                .attr('aria-controls', 'collapse-links')
                .css( { 'padding-left' : `${paddingLeft}px` } )
                .text('Links');
            
    const img = $('<img>')
                    .attr('name', 'arrow_menu')
                    .attr('src', 'components/common/assets/svg/simple-arrow.svg');
    
    const ul = $('<ul>')
                .attr('id', 'collapse-links')  
                .addClass('collapse show list-unstyled'); 

    for(const link of linkList)
    {
        addContentElement(ul, link, false, paddingLeft);
    }

    a.append(img);
    li.append(a);
    li.append(ul);
    parentElement.append(li);
}

function addNavbarLinks() //add navbar links to sidebar
{ 
    const ul = $('#sidebar-navlinks-ul');

    $('#navbar-navlinks > a').each(function ()
    {
        const a = $('<a>')
                    .attr('href', $(this).attr('href'))
                    .attr('onclick', $(this).attr('onclick'))
                    .text($(this).text());

        const li = $('<li>');

        li.append(a);
        ul.append(li);
    });
}

function filterMenus()
{
    const searchedText = $('#searchbar').val();
    
    $('#page-content [href="#"], #collapse-links a').each(function() 
    {
        if ($(this).text().toLowerCase().search(searchedText.toLowerCase()) > -1) 
        {
            $(this).show();

            $('[href="#' + this.parentElement.parentElement.id + '"]').each(function()
            {
                if($(this).attr('aria-expanded') === 'false')
                {
                    this.click();
                }
            });
        }
        else 
        {
            $(this).hide();
        }
    });
}