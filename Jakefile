var Handlebars=require("handlebars"),
	fs = require("fs"),
	path = require ("path"),
	UglifyJS = require("uglify-js"),
	distPath='dist/';

Handlebars.registerHelper('include', function(context) {
  return fs.readFileSync(context,'utf8');
});

function keepComment(node,comment){	
	return comment.type === "comment2";
}

task('clean',function(){
	fs.rmdir(distPath)
});

task('default',['clean'], function (params) {
	fs.mkdir(distPath,0755);

	var options = JSON.parse(fs.readFileSync('plugin.json','utf8'))
	options.Year=new Date().getFullYear()

	var template = Handlebars.compile(fs.readFileSync('templates/jquery.maskedinput.template','utf8'));
	var debugFile = path.join(distPath,'jquery.maskedinput.js');
	fs.writeFileSync(debugFile,template(options));

	compressed = UglifyJS.minify(debugFile,{output:{comments:keepComment}});
	fs.writeFileSync(path.join(distPath,'jquery.maskedinput.min.js'), compressed.code);
});