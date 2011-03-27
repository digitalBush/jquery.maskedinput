sys = require 'sys'
fs = require 'fs'
path = require 'path'
uglify = require 'uglify-js'
distPath='dist/'

plugin = JSON.parse(fs.readFileSync('plugin.json','utf8'))
plugin.Year=new Date().getFullYear()


task 'clean','clean dist/', ->
	fs.rmdir distPath


minify = (js)->
	uglify = require 'uglify-js'
	ast = uglify.parser.parse(js)
	process = uglify.uglify	
	ast = process.ast_mangle(ast)
	ast = process.ast_squeeze(ast)	
	comment = uglify.parser.tokenizer(js)().comments_before[0].value;
	'/*'+comment+'*/\n'+process.gen_code(ast)

replaceTokens = (js,tokens)->
	js.replace(
		/@(\w+)/g,
		(match,p)-> tokens[p]
	)
		
task 'compress', 'compress javascript', ->
	invoke 'clean'
	fs.mkdir(distPath,0755)
	compressed = minify(fs.readFileSync('src/jquery.maskedinput.js','utf8'))
	final=replaceTokens(compressed,plugin)
	fs.writeFileSync(path.join(distPath,'jquery.maskedinput.min.js'), final)

