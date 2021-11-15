let paths = null;

$(document).ready(function () 
{
	$.getJSON("assets/constants.json", function (json) 
	{
		paths = json;
		const mainTopic = 'Main';

		$('#navbar').load(paths.common.navbar, function()
		{
			$('#nav-topic').text(mainTopic);
			
			$('#logo').attr('src', paths.mainView.logo);
		});
		$('#sidebar').load(paths.mainView.sidebar, function()
		{
			$('#sidebar-header').text(mainTopic);
		});
		$('#content').load(paths.mainView.content1);
	});
	
});

function toggleSidebar()
{
    $('#sidebar').toggleClass('active');
}

function getPath(pathKey)
{
	const splittedPathKey = pathKey.split('.');
	
	let path = paths;
	for(const key of splittedPathKey)
	{
		path = path[key];
	}

	return path;
}

function changeContent(content)
{
	$('#content').load(getPath(content));
}

function changeView(view, topic) 
{
	$('#nav-topic').text(topic);
	$('#sidebar-header').text(topic);
	$('#logo').attr('src', getPath(view + '.logo'));
	$('#content').load(getPath(view + '.mainContent'));
	$('#sidebar').load(getPath(view + '.sidebar'));
}