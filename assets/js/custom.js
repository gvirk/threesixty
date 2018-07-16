"use strict";

jQuery(document).ready(function ($) {

	//get template root path

	var cbx_path = '';
	var pathArray = '';
	var i = 1;

	cbx_path = window.location.protocol + '//' + window.location.host;
	pathArray = window.location.pathname.split('/');

	for (i = 1; i < (pathArray.length - 1); i++) {
		cbx_path += '/';
		cbx_path += pathArray[i];

	}





	/*MENU SCROLL TO TOP*/

	var s = $("#sticker");
	var s1 = $("#sticker2");
	var pos = s.position();
	$(window).scroll(function () {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top) {
			s.addClass("stick");
			s1.addClass("stick2");

		} else {
			s.removeClass("stick");
			s1.removeClass("stick2");

		}
	});


	/*MENU SCROLL TO TOP END*/


	/*OWL Main Slider*/
	if ($("#cbx-main-slider").length > 0) {
		$("#cbx-main-slider").owlCarousel({
			navigation     : true, // Show next and prev buttons
			slideSpeed     : 900,
			rewindSpeed    : 1000,
			paginationSpeed: 400,
			navigationText : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			pagination     : false,
			autoPlay       : true,
			stopOnHover    : false,
			singleItem     : true,
			addClassActive : true
		});
	}
	/*OWL Main Slider*/


	//date picker

    if($('#datetimepicker2').length > 0){
        $('#datetimepicker2').datetimepicker({
            locale: 'en',
            format: 'MM-DD-YYYY'
        });
    }



    // -------------------------------------------------------------
    // COUNTER
    // -------------------------------------------------------------
    $('.cbx-counter').counterUp({
        delay: 10,
        time: 5000
    });

    // -------------------------------------------------------------
    // COUNTER END
    // -------------------------------------------------------------


	/*********************************************************
	 *** Start Validation ** SUBSCRIBE AND SEND MAIL
	 *********************************************************/
	jQuery.validator.setDefaults({
		debug  : true,
		success: "valid"
	});

	/********************************************
	 *** Email Subscription Validation And Ajax Submission
	 *********************************************/

	var isEmail = function (email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	$('form.subscribe-form-action').on('submit', function (evnt) {
		evnt.preventDefault();

		var $form = $(this);

		//var emailInput = $( 'form.subscribe-form' ).find( 'input#subscribe' );
		var emailInput = $form.find('input#subscribe');

		if (isEmail(emailInput.val())) {
			//console.log('ok');
			$.ajax({
				url         : cbx_path + '/php/subscribe.php',
				type        : 'post',
				data        : {'email': emailInput.val().toLowerCase()},
				beforeSubmit: function (argument) {
					// body...
				},
				success     : function (ajaxResponse) {
					try {
						var ajaxResponse = $.parseJSON(ajaxResponse);
						alert(ajaxResponse.message);
					} catch (e) {
						//e.message;
						alert(e.message);
					}
				},
				error       : function (argument) {
					// body...
				}
			});
			$form[0].reset();
		} else {
			emailInput.css('color', '#f00');
			return false;
		}
	});



    //subscribe form validation and check if email is valid
	/*
	$('form.subscribe-form-action input#subscribe').on('keyup', function (evnt) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//this.style.color = (isEmail($(this).val())) ? '#f5832b' : '#f00';
	});
	*/

	/********************************************
	 *** End Email Subscription Validation And Ajax Submission
	 *********************************************/


	/********************************************
	 *** Start Contact Form Validation And Ajax Submission
	 *********************************************/

	var $contactForm = $('form.cbx-contactform');

	$contactForm.validate({
		submitHandler: function (form) {

			//form.submit();
			var $form = $(form);
			$.ajax({
				url         : cbx_path + '/php/contact.php',
				type        : 'post',
				data        : $form.serialize(),
				beforeSubmit: function (argument) {
					// body...
				},
				success     : function (ajaxResponse) {
					try {
						var ajaxResponse = $.parseJSON(ajaxResponse);


						if (ajaxResponse.error) {
							//for field error
							$.each(ajaxResponse.error_field, function (i) {
								$form.find('label#' + ajaxResponse.error_field[i] + '-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
							});
						} else if (ajaxResponse.successmessage) {

							alert(ajaxResponse.successmessage);
							$form[0].reset();
						}
					} catch (e) {
						//consoe.log(e.message );
						//alert(ajaxResponse.message);
					}

					$form.reset;
				},
				error       : function (argument) {
					// body...
					//console.log('error');
					alert('Sorry, Mail could not be sent. Please try again later.');
					$form.reset;
				}
			});

			return false;

		},

		rules: {
			'cbxname' : {
				required: true
			},
			'cbxemail': {
				required: true,
				email: true
			},
			'cbxsubject': {
				required: true
			},

			'cbxmessage': {
				required: true
			}
		}
	});

	/********************************************
	 *** End Contact Form Validation And Ajax Submission
	 *********************************************/


    /********************************************
     *** Start Booking Form Validation And Ajax Submission
     *********************************************/

    if($('form#foodiebooking').length > 0){

        var $bookingForm = $('form#foodiebooking');

        $bookingForm.validate({
            submitHandler: function (form) {

                //form.submit();
                var $form = $(form);
                $.ajax({
                    url         : cbx_path + '/php/booking.php',
                    type        : 'post',
                    data        : $form.serialize() + '&action=booking',
                    beforeSubmit: function (argument) {
                        // body...
                    },
                    success     : function (ajaxResponse) {
                        try {
                            var ajaxResponse = $.parseJSON(ajaxResponse);


                            if (ajaxResponse.error) {
                                //for field error
                                $.each(ajaxResponse.error_field, function (i) {
                                    $form.find('label#' + ajaxResponse.error_field[i] + '-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
                                });
                            } else if (ajaxResponse.successmessage) {

                                alert(ajaxResponse.successmessage);
                                $form[0].reset();
                            }
                        } catch (e) {
                            //consoe.log(e.message );
                            //alert(ajaxResponse.message);
                        }

                        $form.reset;
                    },
                    error       : function (argument) {

                        alert('Sorry, Mail could not be sent. Please contact server admin.');
                        $form.reset;
                    }
                });

                return false;

            },

            rules: {
                'fb_name' : {
                    required: true
                },
                'fb_email': {
                    required: true,
                    email:true
                },
                'fb_time':{
                    required:true
                },
                'fb_date' : {
                    required : false
                },
                'fb_person' : {
                    required : false
                }

            }
        });
    }

    /********************************************
     *** End Booking Form Validation And Ajax Submission
     *********************************************/


	/********************************************
	 *** Simple Google Maps Plugin
	 *********************************************/

		//Defining CbMaps Maps Plugins
	$.fn.CbMaps = function (options) {

		var $lz_map_selector = this;
		var settings = $.extend(true, {}, $.fn.CbMaps.defaults, options);
		google.maps.event.addDomListener(window, 'load', function () {

			$lz_map_selector.each(function (index) {
				//Create Jquery Object of Current Item
				var elem = $($lz_map_selector);
				//console.log(elem);
				var gmOptions = {};//GoogleMapOptions

				if ($.isArray(settings.mapOptions.center)) {
					var center = (settings.mapOptions.center.hasOwnProperty(index)) ? settings.mapOptions.center[index] : false;
				} else {
					var center = (settings.mapOptions.center === true) ? true : false;
				}

				if (center) {
					var cbNewLat = ($.isArray(settings.mapOptions.latitude) && settings.mapOptions.latitude.hasOwnProperty(index)) ? settings.mapOptions.latitude[index] : settings.mapOptions.latitude;


					var cbNewLong = ($.isArray(settings.mapOptions.longitude) && settings.mapOptions.longitude.hasOwnProperty(index)) ? settings.mapOptions.longitude[index] : settings.longitude;
					gmOptions.center = new google.maps.LatLng(cbNewLat, cbNewLong);
				}

				if ($.isArray(settings.mapOptions.zoom)) {
					gmOptions.zoom = (settings.mapOptions.zoom.hasOwnProperty(index)) ? settings.mapOptions.zoom[index] : 8;
				} else {
					gmOptions.zoom = settings.mapOptions.zoom;
					;
				}

				if ($.isArray(settings.mapOptions.mapType)) {
					gmOptions.mapTypeId = (settings.mapOptions.mapType.hasOwnProperty(index)) ? settings.mapOptions.mapType[index] : google.maps.MapTypeId.ROADMAP;
				} else {
					gmOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
				}

				if ($.isArray(settings.mapOptions.icon)) {
					gmOptions.markerIcon = (settings.mapOptions.icon.hasOwnProperty(index)) ? settings.mapOptions.icon[index] : null;
				} else {
					gmOptions.markerIcon = (typeof settings.mapOptions.icon == 'undefined') ? null : settings.mapOptions.icon;
				}

				if ($.isArray(settings.mapOptions.scrollwheel)) {
					gmOptions.scrollwheel = (settings.mapOptions.scrollwheel.hasOwnProperty(index)) ? settings.mapOptions.scrollwheel[index] : false;
				} else {
					gmOptions.scrollwheel = (typeof settings.mapOptions.scrollwheel == 'undefined') ? false : settings.mapOptions.scrollwheel;
				}

				if ($.isArray(settings.mapOptions.infoWindow) && settings.mapOptions.infoWindow.length > 0) {
					gmOptions.title = (settings.mapOptions.infoWindow.hasOwnProperty(index)) ? settings.mapOptions.infoWindow[index].title : null;
					gmOptions.content = (settings.mapOptions.infoWindow.hasOwnProperty(index)) ? settings.mapOptions.infoWindow[index].content : null;
				} else {
					gmOptions.title = settings.mapOptions.infoWindowTitle;
					gmOptions.content = settings.mapOptions.infoWindowContent;
				}

				var contentString = '<div id="content"><h3 id="firstHeading" class="firstHeading">' + gmOptions.title + '</h3><div id="bodyContent"><p>' + gmOptions.content + '</p></div></div>';
				var CbMap = new google.maps.Map(elem[0], gmOptions);

				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});

				var CbMarker = new google.maps.Marker({
					position: gmOptions.center,
					map     : CbMap,
					title   : gmOptions.title,
					icon    : gmOptions.markerIcon
				});

				google.maps.event.addListener(CbMarker, 'click', function () {
					infowindow.open(CbMap, CbMarker);
				});

			});
		});

		function toggleBounce() {

			if (CbMarker.getAnimation() != null) {
				CbMarker.setAnimation(null);
			} else {
				CbMarker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}

		//return this;
	};


	//map section
	$('.cbxmapcanvas').each(function (index, element) {

		var $mapref = $(element);
		var maptitle = $mapref.data('title');
		var maplat = $mapref.data('lat');
		var maplng = $mapref.data('lng');
		var mapcontent = $mapref.data('content');

		var boxText = "<div class='cbx-map-text'>";
		boxText += mapcontent;
		boxText += "</div>";


		// Show google Maps
		$mapref.CbMaps({
			mapOptions: {
				latitude   : [maplat],
				longitude  : [maplng],
				center     : true,
				scrollwheel: false,
				zoom       : 17,
				mapType    : 'satellite', //google.maps.MapTypeId.ROADMAP
				icon       : cbx_path + '/assets/img/mapicon.png',
				infoWindow : [{
					title  : maptitle,
					content: boxText

				}]
			}
		});
	});


	/********************************************
	 *** End Simple Codeboxr Google Maps Plugin
	 *********************************************/


	//smooth scroll
	$('.gotome').smoothScroll(
		{
			speed: 1000
		}
	);


	//adding twitter feed, dependency js location siteroot/tweetie/tweetie.js
	if ($("#tweetiefeed").length > 0) {

		$('#tweetiefeed').twittie(
			{
				'username'   : 'codeboxr',
				'hideReplies': true,
				'count'      : 10,
				'apiPath'    : 'tweetie/api/tweet.php',
				'dateFormat' : '%b-%d-%Y',
				'template'   : '{{tweet}}-<span class="cbx-date"><a href="{{url}}" target="_blank">{{date}}</a></span>'
			}, function () {
				//using owl carousel
				$("#tweetiefeed ul").owlCarousel({
					navigation     : false, // Show next and prev buttons
					slideSpeed     : 900,
					rewindSpeed    : 1000,
					paginationSpeed: 400,
					navigationText : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
					pagination     : false,
					autoPlay       : true,
					stopOnHover    : false,
					singleItem     : true,
					addClassActive : true
				});
				//tweet sliding using owl carousel ends
			}
		);
	}
	//twitter feed done.


});





