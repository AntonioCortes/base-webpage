let constants = null;
const mainView = 'mainView';

$(document).ready(function () 
{
	$.getJSON("components/common/assets/constants.json", function (json) 
	{
		constants = json;

		populateNavbar();
	});
});

function getConstant(constantKey)
{
	const splittedConstantKey = constantKey.split('.');
	
	let constant = constants;
	for(const key of splittedConstantKey)
	{
		constant = constant[key];
	}

	return constant;
}

function changeContent(contentKey)
{
	if(contentKey.includes('.')) 
	{
		const component = getConstant(contentKey)
		if('css' in component)
		{
			$('#component-css').attr('href', component.basePath + '/' + component.css);
		}
		else
		{
			$('#component-css').attr('href', '');
		}

		$('#content').load(component.basePath + '/' + component.html, function()
		{
			$('[data-bs-toggle="tooltip"]').tooltip();  
			addCodeLineNumbers();

			setTimeout(function () 
			{
				hljs.highlightAll();

				const options = {
					copyIconClass: "bi bi-files",
					checkIconClass: "bi bi-check-lg text-success",
				};
				window.highlightJsBadge(options);
			}, 10);

			if("js" in component)
			{
				$.getScript(component.basePath + '/' + component.js);
			}
		});
	}
	else
	{
		$('#content').html(`<${contentKey}></${contentKey}>`);
	}
}

function addCodeLineNumbers()
{
	$.each($('code'), function() {
		this.innerHTML = this.innerHTML.trim();

		const lineCount = this.innerHTML.match(/[^\n]*\n[^\n]*/gi).length
		
		const div = document.createElement('div');
		div.classList.add('hljs');
		div.classList.add('padding-14');

		for(var i = 1; i < lineCount + 2; i++)
		{
			const div2 = document.createElement('div');

			div2.innerText = i;
			div.appendChild(div2);
		}

		this.parentElement.insertBefore(div, this);
	});
}

function changeView(viewKey) 
{
	const view = getConstant(viewKey);
	$('#nav-topic').text(view.topic);

	const logoUrl = view.paths.basePath + '/common/assets/img/logo.svg';
	$.ajax({
		url: logoUrl ,
		type: 'HEAD',
		success: function() {
			$('#logo').attr('src', logoUrl);
		}
	});

	if(window.innerWidth <= 992)
	{
		hideSidebar();
	}

	populateSidebar(view);

	const viewPathsKeyList = Object.keys(view.paths).filter(key => key !== 'basePath');

	changeContent(viewKey + '.paths.' + viewPathsKeyList[0]);
}

function populateNavbar() 
{
	$.get(constants.common.paths.navbar, function(navbarHTML)
	{
		$('body').prepend(navbarHTML);

		for(constant in constants) {
			if(constant !== 'common') {
				const navbarLink = $('<a>')
									.addClass('nav-link active')
									.attr('href', '#')
									.attr('onclick', `changeView('${constant}')`)
									.text(constants[constant].topic);

				$('#navbar-navlinks')
					.append(navbarLink);
			}
		}

		changeView(mainView);
	});
}

function populateSidebar(view) 
{
	$('#sidebar').load(constants.common.paths.sidebar, function()
	{
		window.onresize = function ()
		{
			if(window.innerWidth <= 992)
			{
				hideSidebar();
			}
			else
			{
				showSidebar();
			}
		}

		$('#content').click(function ()
		{
			if(window.innerWidth <= 992)
			{
				hideSidebar();
			}
		});

		$('#sidebar-header').text(view.topic);
		addSidebarContent(view);
	});
}