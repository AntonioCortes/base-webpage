let constants = null;

$(document).ready(function () 
{
	$.getJSON("assets/constants.json", function (json) 
	{
		constants = json;

		$('#navbar').load(constants.common.paths.navbar, function()
		{
			$('#nav-topic').text(constants.mainView.topic);		
			$('#logo').attr('src', constants.mainView.paths.logo);
		});

		changeView('mainView');
	});
});

function toggleSidebar()
{
    $('#sidebar').toggleClass('active');
}

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
	const component = getConstant(contentKey)
	if("css" in component)
	{
		$('#component-css').attr('href', component.basePath + '/' + component.css);
	}
	else
	{
		$('#component-css').attr('href', '');
	}

	$('#content').load(component.basePath + '/' + component.html, function()
	{
		hljs.highlightAll();
		hljs.initLineNumbersOnLoad();

		if("js" in component)
		{
			$.getScript(component.basePath + '/' + component.js);
		}
	});
}

function changeView(viewKey) 
{
	const view = getConstant(viewKey);
	$('#nav-topic').text(view.topic);
	$('#logo').attr('src', view.paths.logo);	
	$('#sidebar').load(view.paths.sidebar, function()
	{
		$('#sidebar-header').text(view.topic);
	});

	changeContent(viewKey + '.paths.' + view.mainContent)
}