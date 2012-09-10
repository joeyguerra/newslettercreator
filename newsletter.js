(function(){
	var scripts = document.getElementsByTagName('script');
	scripts=Array.prototype.slice.call(scripts);
	var script = scripts.pop();
	var rootUrl = null;
	var h = false;
	while(script!=null){
		if(script.src!=undefined){
			if(script.src.indexOf('/gi/newsletter.js') > -1){
				rootUrl = script.src.replace('/gi/newsletter.js', '').split('?')[0];
			}
		}
		script = scripts.pop();
	}
	var mvc = document.createElement("script");
	mvc.src = "http://www.gameinformer.com/js/mvc.js";
	mvc.addEventListener("load", function(e){
		load(e);
	}, true);
	document.getElementsByTagName('head')[0].appendChild(mvc);

	var c = document.createElement('link');
	c.href = rootUrl + '/gi/newsletter.css?'+Math.floor((new Date)/864e5);
	c.rel = 'stylesheet';
	c.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(c);	
	var articles = null;
	var app = {
		init: function(){
			var articlesController = new controller.articles(app, articles);
			console.log('newsletter has loader');
			articles =  new model.list();
			articlesController.load_view();
		}
	};	
	function load(e){
		model.article = function(){
			var self = model.apply(this, []);
			var title;
			Object.defineProperty(this, 'title', {
				get: function(){return title;}
				, set: function(v){
					var old = title;
					title = v;
					this.changed('title', old, v, this);
				}
			});
			var link;
			Object.defineProperty(this, 'link', {
				get: function(){return link;}
				, set: function(v){
					var old = link;
					link = v;
					this.changed('link', old, v, this);
				}
			});
			var image;
			Object.defineProperty(this, 'image', {
				get: function(){return image;}
				, set: function(v){
					var old = image;
					image = v;
					this.changed('image', old, v, this);
				}
			});
			var summary;
			Object.defineProperty(this, 'summary', {
				get: function(){return summary;}
				, set: function(v){
					var old = summary;
					summary = v;
					this.changed('summary', old, v, this);
				}
			});
			var author;
			Object.defineProperty(this, 'author', {
				get: function(){return author;}
				, set: function(v){
					var old = author;
					author = v;
					this.changed('author', old, v, this);
				}
			});
			var postDate;
			Object.defineProperty(this, 'postDate', {
				get: function(){return postDate;}
				, set: function(v){
					var old = postDate;
					postDate = v;
					this.changed('postDate', old, v, this);
				}
			});
			return this;
		};
		view.articles = function(id, c, m, options){
			var self = view.apply(this, [id, c, m, options]);
			
			return this;
		};
		controller.articles = function(d, m){
			var self = controller.apply(this, [d, m]);
			var documentClickedDelegate = function(e){self.documentClicked(e);};
			this.load_view = function(){
				var div = $("<div />").append($("<header />").append($("<h1 />").text("Newsletter"))).addClass("newsletter");
				document.body.appendChild(div[0]);
				this.view = new view.articles(div[0], this, this.model, {});
				this.view.hidden = false;
				document.body.addEventListener("click", documentClickedDelegate, true);
			};
			this.documentClicked = function(e){
				e.preventDefault();
				console.log(e.target);
			};
			return this;
		};
		app.init();
	}
})();