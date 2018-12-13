/*  ☆
    /\ 
   /  \ 
  .∧＿∧ 
 ( ･ω･｡)つ━☆・*。 
 ⊂　 ノ 　　　・゜+. 
 しーＪ　　　°。+ * 
 */

//commande d'installation
/*
npm install
*/
// pour souvenir
/*
npm install --save-dev gulp 
gulp-regex-rename 
gulp-babel 
babel-core  
babel-preset-env 
gulp-sass 
gulp-sourcemaps 
gulp-autoprefixer 
gulp-notify 
gulp-plumber 
gulp-svg-sprite 
gulp-svgmin 
gulp-concat gulp-uglify
ou
npm i -D gulp 
gulp-regex-rename 
gulp-sass 
gulp-babel 
babel-core  
babel-preset-env  
gulp-sourcemaps 
gulp-autoprefixer 
gulp-notify 
gulp-plumber 
gulp-svg-sprite 
gulp-svgmin 
gulp-concat 
gulp-uglify
 */

//Requires
let gulp = require('gulp');

// Include plugins
let sass         = require('gulp-sass');
let sourcemaps   = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let notify       = require("gulp-notify");
let plumber      = require('gulp-plumber');
let concat       = require('gulp-concat');
let uglify       = require('gulp-uglify');
const babel      = require('gulp-babel');
let rename       = require('gulp-regex-rename');
let cleanCSS 	 = require('gulp-clean-css');
let svgSprite    = require('gulp-svg-sprite');
let svgmin 		 = require('gulp-svgmin');

/*-----------------------------WATCHER-----------------------------*/
// Watcher
gulp.task('watch', () => {
	//SCSS to CSS convert on watch
  	gulp.watch(['./css/**/*.scss'], ['css'])
	.on('change',  () => {
        notify("CSS -> SCSS ==> OK").write('');
	});
	//minify JS on watch
	gulp.watch(['./js/minify/*.js'], ['concat_minif'])
	.on('change',  () => {
        notify("JS (concat)  ==> OK").write('');
	});
	//minify CSS on watch
  	gulp.watch(['./css/**/*.scss'], ['minify-css'])
	.on('change',  () => {
        notify("CSS mini ==> OK").write('');
	});
	//JS babel convert on watch
  	gulp.watch(['./js/**/*es6.js'], ['js_babel'])
	.on('change',  () => {
        notify("JS (babel)  ==> OK").write('');
	});
});


/*-----------------------------CSS MAP-----------------------------*/
// tache CSS = compile vers css/main.css et ajoute css/main.css.map
gulp.task('css', () => {
	let onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "Problème!",
			message:  "Erreur CSS: <%= error.message %>",
			sound:    "Beep"
		})(err);
		this.emit('end');
	};
  return gulp.src('./css/*.scss')
    .pipe(plumber({errorHandler: onError}))
	.pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded' // CSS non minifiée plus lisible ('}' à la ligne)
    }))
    .pipe(autoprefixer())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./css'));
});

/*-----------------------------MINIFY CSS-----------------------------*/
// tache CSS = compile vers styles/main.css
gulp.task('minify-css', () => {
	return gulp.src('css/*.css')
	  .pipe(cleanCSS({compatibility: 'ie8'}))
	  .pipe(gulp.dest('styles'));
  });

/*-----------------------------JS CONCAT-----------------------------*/
// Concatener
gulp.task('concat_minif', () => {
	let onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "Problème!",
			message:  "Erreur JS: <%= error.message %>",
			sound:    "Beep"
		})(err);
		this.emit('end');
	};
	return gulp.src(['./js/minify/*.js'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('main.min.js', {newLine: ';'}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./js'));
});

/*-----------------------------JS BABEL-----------------------------*/
//babel compatible JS
gulp.task('js_babel', () => {
	let onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "Problème!",
			message:  "Erreur JS babel: <%= error.message %>",
			sound:    "Beep"
		})(err);
		this.emit('end');
	};
	return gulp.src(['js/**/*.es6.js'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(rename(/\.es6/, ''))
		.pipe(gulp.dest('./js'));
});

/*-----------------------------SVG CREATE-----------------------------*/
let baseDir      = './svg';   // <-- Set to your SVG base directory
let svgGlob      = '**/*.svg';       // <-- Glob to match your SVG files
let outDir       = './img/';     // <-- Main output directory
let config       = {
	"shape": {
		"spacing": {
			"box": "icon"
		}
	},
	"mode": {
/*		"view": {
			"dest": ".",
			"sprite": "sprite_css_pictos.svg",
			"bust": false
		},
*/
		"symbol": {
			"dest": ".",
			"sprite": "sprite.svg",
		}
	}
};
//create sprite.svg
gulp.task('svgsprite', () => {
    return gulp.src(svgGlob, {cwd: baseDir})
        .pipe(plumber())
        .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest(outDir));
});

/*-----------------------------SVG MINIFY-----------------------------*/
//minify SVG
gulp.task('svgmin', () => {
    return gulp.src('./svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./svgmin'));
});