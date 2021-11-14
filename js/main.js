let paths = null;

$(document).ready(function () 
{
	$.getJSON( "/assets/paths.json", function( json )
	{
		paths = json;

		$('#navbar').load(paths.common.navbar);
		$('#sidebar').load(paths.mainView.sidebar);
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

function changeContent(...args)
{
	if(args.length == 1)
	{
		$('#content').load(getPath(args[0]));
	}
	else if(args.length == 2)
	{
		$('#sidebar').load(getPath(args[0]));
		$('#content').load(getPath(args[1]));
	}
}