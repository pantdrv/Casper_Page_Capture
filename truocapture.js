	phantom.casperTest = true;
var webPage = require('webpage');
var page = webPage.create();
var casper = require('casper').create({   
 viewportSize: {
        width: 1720,
        height: 1080
    },
    verbose: true, 
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
      loadImages:  true,         // The WebPage instance used by Casper will
      loadPlugins: true         // use these settings
    }
});

//casper.options.waitTimeout = 10000;

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'page url';

casper.start(url, function() {
    console.log("page loaded");
    this.test.assertExists('form#loginForm', 'form is found');
    this.fill('form#loginForm', { 
        j_username: 'superadmin', 
        j_password:  'pass'
    }, true);
});
casper.then(function(){
	 casper.page.injectJs('jquery.min.js');
    casper.page.evaluate(function () {

        console.log($('#moduleHeaderId').text());
		console.log($('moduleHeaderId').text());

    });
});
casper.then(function(){
	this.wait(30000,function(){//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 30 seconds)
//casper.page.render('snap.png');	//this.capture('AfterLogin.pdf');
});
	window.setTimeout(function () {
		casper.page.render('snap1.png');
          //casper.page.render('snap1.pdf');
          phantom.exit();
        }, 30000);
	
});

casper.then(function(){
    console.log("Make a screenshot and save it as AfterLogin.png");
	this.wait(30000,function(){//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 30 seconds)
    this.capture('AfterLogin.png');
	//this.capture('AfterLogin.pdf');
});
});
casper.run();