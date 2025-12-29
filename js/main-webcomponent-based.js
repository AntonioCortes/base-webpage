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

function changeView(viewKey) 
{
	const view = getConstant(viewKey);
	$('#nav-topic').text(view.topic);

	const logoUrl = 'basePath' in view
				? view.basePath + '/common/assets/img/logo.svg' 
				: view.paths.basePath + '/common/assets/img/logo.svg';
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
}

function populateNavbar() 
{
	$.get(constants.common.paths.navbar, function(navbarHTML)
	{
		$('body').prepend(navbarHTML);

		for(const constant in constants) {
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