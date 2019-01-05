function toggle_ddm() {
	if($("#navBar").css('left') == '0px') {
		$("#ddmMask").fadeOut();
		$("#navBar").animate({left: "-100%"});
	}
	else {
		$("#ddmMask").fadeIn();
		$("#navBar").animate({left: "0"});
	}
}

/* Original credit: https://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices */
function watchForHover() {
    var hasHoverClass = false;
    var lastTouchTime = 0;
	var vocabArray = document.getElementsByClassName('vocab');

	function effectOn() {
		var vocabSiblings = this.parentNode.getElementsByClassName('vocab');
		this.parentNode.style.color = 'grey';
		for (var i = 0; i < vocabSiblings.length; ++i) {
			vocabSiblings[i].style.color = 'grey';
			vocabSiblings[i].style.borderBottom = '1px solid #e0e0e0';
		}

		this.style.color = 'black';
		this.style.borderBottom = '1px solid black';
		this.getElementsByClassName('vocabdef')[0].style.display = 'inline-block';
	}

	function effectOff() {
		var vocabSiblings = this.parentNode.getElementsByClassName('vocab');
		this.parentNode.style.color = 'black';
		for (var i = 0; i < vocabSiblings.length; ++i) {
			vocabSiblings[i].style.color = 'black';
			vocabSiblings[i].style.borderBottom = '1px solid black';
		}

		this.getElementsByClassName('vocabdef')[0].style.display = 'none';
	}

    function enableHover() {
        // filter emulated events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        hasHoverClass = true;
		for (var i = 0; i < vocabArray.length; ++i) {
			vocabArray[i].removeEventListener('touchstart', effectOn);
			vocabArray[i].removeEventListener('touchend', effectOff);
			vocabArray[i].addEventListener('mouseenter', effectOn);
			vocabArray[i].addEventListener('mouseleave', effectOff);
		}
    }

    function disableHover() {
        if (!hasHoverClass) return;

        hasHoverClass = false;
		for (var i = 0; i < vocabArray.length; ++i) {
			vocabArray[i].removeEventListener('mouseenter', effectOn);
			vocabArray[i].removeEventListener('mouseleave', effectOff);
			vocabArray[i].addEventListener('touchstart', effectOn);
			vocabArray[i].addEventListener('touchend', effectOff);
		}
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime);
    document.addEventListener('touchstart', disableHover);
    document.addEventListener('mousemove', enableHover);

    enableHover();
}
