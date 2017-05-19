
function homeButton(evt) {
	EventRegister.EventListener.trigger('INIT_INDEX_PAGE', evt);
}

function videoButton(evt) {
	EventRegister.EventListener.trigger('INIT_VIDEO_PAGE', evt);
}

function experimentButton(evt) {
	EventRegister.EventListener.trigger('INIT_EXPERIMENT_PAGE', evt);
}

function loadAssetPage(evt) {
	EventRegister.EventListener.trigger('CREATE_MODAL', evt);
	//var AssetPage = window.require("views/threeDView");
	//this.appview = new AssetPage;
    //$("#content").html(this.appview.render().el);      
}

function loadVideoPage(evt) {
	var VideoPage = require("views/videoView");
	this.appview = new VideoPage();
	$("#content").html(this.appview.render().el);
}

function loadExperimentPage(evt) {
	var ExperimentPage = require("views/experimentView");
	this.appview = new ExperimentPage();
	$("#content").html(this.appview.render().el);
}