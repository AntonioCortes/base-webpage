function toggleNavbar() 
{
	$('#navbarNavAltMarkup').toggleClass('show');
}

function hideNavBarForMobile() 
{
	if(window.innerWidth <= 992)
    {
        toggleNavbar()
    };
}