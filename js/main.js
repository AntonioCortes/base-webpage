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

		$('#sidebar').load(constants.mainView.paths.sidebar, function()
		{
			$('#sidebar-header').text(constants.mainView.topic);
		});

		$('#content').load(constants.mainView.paths.content1, function()
		{
			hljs.highlightAll();
			hljs.initLineNumbersOnLoad();
		});
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

function changeContent(content)
{
	$('#content').load(getConstant(content), function()
	{
		hljs.highlightAll();
		hljs.initLineNumbersOnLoad();
	});
}

function changeView(view) 
{
	$('#nav-topic').text(getConstant(view + '.topic'));
	$('#logo').attr('src', getConstant(view + '.paths.logo'));
	$('#content').load(getConstant(view + '.paths.mainContent'), function()
	{
		hljs.highlightAll();
		hljs.initLineNumbersOnLoad();
	});
	$('#sidebar').load(getConstant(view + '.paths.sidebar'), function()
	{
		$('#sidebar-header').text(getConstant(view + '.topic'));
	});
}