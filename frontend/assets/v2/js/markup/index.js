var speedAnimateChangePic = 500;

function slideToursSlide() {
	var WidthAllWindow = $(window).width();
	var var_slideToursBody = $('.slideTours');
	var var_lengthTours;
	
	var var_slideTours = $('.centerTours');
	var widthSmall;
	if (WidthAllWindow <= 1000) {
		widthSmall = 1000;
	}
	else if (WidthAllWindow > 1000 && WidthAllWindow < 1050) {
		widthSmall = WidthAllWindow;
	}
	else if (WidthAllWindow > 1050 && WidthAllWindow < 1290) {
		widthSmall = Math.floor(1050 + ( (WidthAllWindow - 1050) / ((1290 - 1050) / (1205 - 1050))) );
	}
	else if (WidthAllWindow > 1290 && WidthAllWindow < 1390) {
		widthSmall = 1205;
	}
	else if (WidthAllWindow > 1390 && WidthAllWindow < 1490) {
		widthSmall = Math.floor(1205 + ( (WidthAllWindow - 1390) / ((1490 - 1390) / (1390 - 1205))) );
	}
	else if (WidthAllWindow > 1490) {
		widthSmall = 1390;
	}
	
	var_slideTours.css('width', widthSmall+'px');
	$('.slideTours .center').css('width', widthSmall+'px');
	
	var var_allWidth = $('.slideTours .center').width();
	var var_widthTours;
	if (var_allWidth >= 1390) {
		var_lengthTours = 8;
		var_widthTours = Math.floor(((var_allWidth / var_lengthTours) - 2));
	}
	else if (var_allWidth < 1390 && var_allWidth >= 1290) {
		var_lengthTours = 7;
		var_widthTours = Math.floor(((var_allWidth / var_lengthTours) - 2));
	}
	else if (var_allWidth < 1290 && var_allWidth > 1000) {
		var_lengthTours = 6;
		var_widthTours = Math.floor(((var_allWidth / var_lengthTours) - 2));
	}
	else if (var_allWidth <= 1000) {
		var_lengthTours = 5;
		var_widthTours = Math.floor(((var_allWidth / var_lengthTours) - 2));
	}
	var_slideToursBody.find('.toursTicketsMain').css('width',var_widthTours+'px');
}

function CenterIMGResize() {
	var HeightAllWindow = $(window).height();
	if (HeightAllWindow < 800) {
		HeightAllWindow = HeightAllWindow - 38 - 158;
		$('.slideTours').addClass('small');
	}
	else {
		HeightAllWindow = HeightAllWindow - 38 - 214;
		$('.slideTours').removeClass('small');
	}
	$('.innerBlockMain').css('height', HeightAllWindow+'px');
	
	
	var pathIMG = $('.innerBlockMain .IMGmain');
	var marginPathLeft = 0;
	var var_allWidth = $('.slideTours .center').width();

if (var_allWidth >= 1390) {
		marginPathLeft = (1390 - var_allWidth) / 2;
	}
	else if (var_allWidth < 1390 && var_allWidth >= 1290) {
		marginPathLeft = (1390 - var_allWidth) / 2;
		
	}
	else if (var_allWidth < 1290 && var_allWidth > 1000) {
		marginPathLeft = (1390 - var_allWidth) / 2;
	}
	else if (var_allWidth <= 1000) {
		marginPathLeft = (1390 - var_allWidth) / 2;
	}
	pathIMG.css('left', '-'+marginPathLeft+'px');
	
	if (HeightAllWindow >= 745) {
		marginPathTop = (745 - HeightAllWindow) / 2;
	}
	else if (HeightAllWindow < 745) {
		marginPathTop = (745 - HeightAllWindow) / 2;
	}
	pathIMG.css('top', '-'+marginPathTop+'px');

}