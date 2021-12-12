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

function addCodeLineNumbers()
{
	$.each($('code'), function() {
		this.innerHTML = this.innerText.trim();

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
	$('#logo').attr('src', view.paths.logo);	
	$('#sidebar').load(view.paths.sidebar, function()
	{
		$('#sidebar-header').text(view.topic);
	});

	changeContent(viewKey + '.paths.' + view.mainContent)
}

function hideMenuForMobile(){
	(window.innerWidth <= 960)?toggleSidebar():'';
}