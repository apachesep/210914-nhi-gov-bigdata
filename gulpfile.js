'use strict';
// node.js Packages / Dependencies
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gulpautoprefixer = require('gulp-autoprefixer');
const inject = require('gulp-inject');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const purgecss = require("@fullhuman/postcss-purgecss");
const tailwindcss = require("tailwindcss");
const atimport = require("postcss-import");
const del = require("del");
const replace = require('gulp-replace');
const handlebars = require('gulp-compile-handlebars');
const gulpif = require('gulp-if');
// const gulpIgnore = require('gulp-ignore');
// const run = require('gulp-run');

// const imagemin = require('gulp-imagemin');
// import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';

//Mode
// const mode = require('gulp-mode')(); //last '()' means a function must be needed or get err
const mode = require('gulp-mode')({
  modes: ["production", "development", "purge"],
  default: "development",
  verbose: false
});

var favicon = true, uk = true, fonts = true, fa = true, tw = true, script = true, colors = true, editor = false, aa = false, chartjs = true, fullcalendar = false, othercolors = false, separatecolors = false, style2 = false, moreStyle = false, vendorscss = false, vendorsjs = false
var bs = false, bs4 = false, bs3 = false, jq = false
var injectothercolors = false, separateinjectcolors = false, jqueryBody = false, bootstrapBody = false, jqueryHead = false

var siteTitle = '健保署'
var scriptjs = 'script.js'
var editorcss = 'editor*.css'
var editorscss = 'editor.scss'
var color1val = 'ncu', color2val = 'nthu', color3val = 'nycu'
var othercolorscss = 'colors-*.css'
var othercolorsscss = 'colors-*.scss'
var vdjs = 'xx*.js'
var vdcss = 'xx*.css'
var vdminjs = 'xx*.min.js'
var vdmincss = 'xx*.min.css'
var chjs = 'chart*.js'
var fcjs = 'fullcalendar*.js'
var fcminjs = 'fullcalendar*.min.js'
var fccss =  'fullcalendar*.css'

if (othercolors == true) {
  injectothercolors = true
}
if (separatecolors == true) {
  colors = false
  injectothercolors = false // othercolors will 'not' be all injected
  separateinjectcolors = true // othercolors will be separately injected
}
if (bs3 == true | bs4 == true) {
  jq = true
  jqueryBody = true
}
if (bs == true | bs3 == true | bs4 == true) {
  uk = false
  bootstrapBody = true
}
if (jq == true) {
  jqueryHead = true
}
// if (script == false) {
//   scriptjs = ''
// }
// if (fullcalendar == false) {
//   fcjs = ''
// }

// Paths
var paths = {
  root: {
    www: './src'
  },
  vendors: {
    ukjs: ['node_modules/uikit/dist/js/uikit.min.js', 'node_modules/uikit/dist/js/uikit-icons.min.js'],
    ukcss: ['node_modules/uikit/dist/css/uikit.min.css'],
    facss: ['node_modules/@fortawesome/fontawesome-free/css/all.min.css'],
    fafonts: ['node_modules/@fortawesome/fontawesome-free/webfonts/*'],
    bsjs: ['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'],
    bscss: ['node_modules/bootstrap-icons/font/bootstrap-icons.css'],
    bsfonts: ['node_modules/bootstrap-icons/font/fonts/*'],
    bs3js: ['node_modules/bootstrap/dist/js/bootstrap.min.js'],
    bs3css: ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
    bs3fonts: ['node_modules/bootstrap/dist/fonts/*'],
    chartjs: ['node_modules/chart.js/dist/chart.min.js'],
    jq: ['node_modules/jquery/dist/jquery.min.js'],
    fullcalendarjs: ['node_modules/fullcalendar/main.min.js'],
    fullcalendarlocales: ['node_modules/fullcalendar/locales-all.min.js'],
    fullcalendarcss: ['node_modules/fullcalendar/main.min.css'],
    fullcalendarjsi: ['src/vendors/' + fcjs],
    vendorsjs: ['src/vendors/' + vdjs],
    vendorscss: ['src/vendors/' + vdcss],
    fonts: ['src/fonts/**/*.*'],
  },
  // template: '',
  src: {
    root: './src/',
    templates: 'src/templates/*.hbs',
    html: 'src/*.html',
    css: 'src/css/*.css',
    js: 'src/js/*.js',
    vendors: 'src/libs/**/*.*',
    img: 'src/img/**/*.+(png|jpg|gif|svg)',
    scss: 'src/scss/*.scss',
    minjs: ['src/js/*.js', '!src/js/uikit*.js', '!src/js/*.min.js', '!src/js/*-i.js', '!src/js/*-bak.js', '!src/js/*-old.js', '!src/js/*複製.js', '!src/js/' + fcminjs, '!src/js/' + vdminjs],
    // excludeminjs: "'!src/js/*.min.js', '!src/js/*-i.js', '!src/js/*-bak.js', '!src/js/*-old.js'",
    // // [...] will get errors. The variable array cannot be included in a array of [paths.src.js, paths.src.excludeminjs]
    deljs: ['src/js/*.js', '!src/js/*-i.js', '!src/js/*-bak.js', '!src/js/*-new.js', '!src/js/*-old.js', '!src/js/*複製.js', script ? '!src/js/' + scriptjs : '-', vendorsjs ? '!src/js/' + vdjs : '-', fullcalendar ? '!src/js/' + fcjs : '-', chartjs ? '!src/js/' + chjs : '-'],
    delcss: ['src/css/*.css', vendorscss ? '!src/css/' + vdcss : '-', fullcalendar ? '!src/css/' + fccss : '-'],
    injectjs: ['src/js/*.js', '!src/js/jquery*.js', '!src/js/bootstrap*.js', '!src/js/ui*.js', '!src/js/*-i.js', script ? '!src/js/' + scriptjs : '-', vendorsjs ? '!src/js/' + vdjs : '-', fullcalendar ? '!src/js/' + fcjs : '-', chartjs ? '!src/js/' + chjs : '-'],
    injectcss: ['src/css/*.css', '!src/css/bootstrap*.css', '!src/css/ui*.css', '!src/css/ta*.css', '!src/css/font*.css', '!src/css/main*.css', '!src/css/colors*.css', '!src/css/style*.css', vendorscss ? '!src/css/' + vdcss : '-', fullcalendar ? '!src/css/' + fccss : '-'],
    sasstoscss: ['src/scss/*.scss', '!src/scss/*-full.scss', '!src/scss/*-i.scss', '!src/scss/*-bak.scss', '!src/scss/*-old.scss', '!src/scss/*複製.scss', colors ? '-' : '!src/scss/colors.scss', editor ? '-' : '!src/scss/' + editorscss, othercolors ? '-' : '!src/scss/' + othercolorsscss],
    minicss: ['src/css/*.css', '!src/css/ui*.css', '!src/css/ta*.css', '!src/css/font*.css', bs ? '-' : '!src/css/bootstrap*.css', vendorscss ? '!src/css/' + vdmincss : '-', fullcalendar ? '!src/css/' + fccss : '-'],
    mincss: ['src/css/*.min.css'],
    color1html: 'src/' + color1val + '-*.html', // 'src/ncu-*.html'
    color2html: 'src/' + color2val + '-*.html', // 'src/nthu-*.html'
    color3html: 'src/' + color3val + '-*.html', // 'src/nthu-*.html'
    color1css: ['src/css/colors-' + color1val + '*.css'], // 'src/css/colors-ncu*.css'
    color2css: ['src/css/colors-' + color2val + '*.css'], // 'src/css/colors-nthu*.css'
    color3css: ['src/css/colors-' + color3val + '*.css'], // 'src/css/colors-nthu*.css'
  },
  dist: {
    root: './dist/',
    templates: 'templates',
    html: 'dist/*.html',
    scss: 'scss',
    css: 'css',
    js: 'js',
    img: 'img',
    fonts: 'fonts',
    fafonts: 'webfonts',
    bsfonts: 'fonts',
    vendors: 'libs',
    injectjs: ['dist/js/*.js', '!dist/js/jquery*.js', '!dist/js/bootstrap*.js', '!dist/js/ui*.js', script ? '!dist/js/' + scriptjs : '-', vendorsjs ? '!dist/js/' + vdjs : '-', fullcalendar ? '!dist/js/' + fcjs : '-', chartjs ? '!dist/js/' + chjs : '-'],
    injectcss: ['dist/css/*.css', '!dist/css/bootstrap*.css', '!dist/css/ui*.css', '!dist/css/ta*.css', '!dist/css/font*.css', '!dist/css/main*.css', '!dist/css/colors*.css', '!dist/css/style*.css', vendorscss ? '!dist/css/' + vdcss : '-', fullcalendar ? '!dist/css/' + fccss : '-'],
    color1html: 'dist/' + color1val + '-*.html',
    color2html: 'dist/' + color2val + '-*.html',
    color3html: 'dist/' + color3val + '-*.html',
    color1css: ['dist/css/colors-' + color1val + '*.css'],
    color2css: ['dist/css/colors-' + color2val + '*.css'],
    color3css: ['dist/css/colors-' + color3val + '*.css'],
  }
}

//Handlebars templates
//gulp.task('templates', async function(){}): It must need the 'async' or get error 'Did you forget to signal async completion?'
gulp.task('templates', async function() {
  var templateData = {
      title: siteTitle,
      favicon: favicon ? true : false,
      bootstrap: bs ? true : false,
      chartjs: chartjs ?  true : false,
      fullcalendar: fullcalendar ?  true : false,
      vendorscss: vendorscss ? true : false,
      colors: colors ? true : false,
      othercolors: othercolors ? true : false,
      style2: style2 ? true : false,
      moreStyle: moreStyle ? true : false,
      jqueryHead: jqueryHead ? true : false,
      vendorsjs: vendorsjs ? true : false,
      script: script ? true : false,
      focusForAA: aa ? true : false,
      hrefForAA: aa ? true : false,
      bootstrapBody: bootstrapBody ? true : false,
      jqueryBody: jqueryBody ? true : false,
    },
    options = {
      batch: [paths.src.root + paths.dist.templates + '/partials'],
    }
  gulp.src([paths.src.templates, '!' + paths.src.root + paths.dist.templates + '/*-i.hbs'])
    .pipe(handlebars(templateData, options))
    // .pipe(rename('hello.html'))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(paths.src.root))
    .pipe(gulp.dest(paths.dist.root))
});

// Output tailwind css
gulp.task('tailwind', function() {
  return gulp.src('tailwind.css')
    .pipe(gulpif(tw, postcss([
      atimport(),
      tailwindcss("tailwind.config.js"),
      autoprefixer()
      ])
    ))
    .pipe(gulpif(tw, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(tw, gulp.dest(paths.src.root + paths.dist.css)))
})

gulp.task('tailwind-build', function() {
  return gulp.src('tailwind.css')
    .pipe(gulpif(tw, postcss([
      atimport(),
      tailwindcss("tailwind.config.js"),
      autoprefixer()
      ])
    ))
    .pipe(gulpif(tw, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(tw, gulp.dest(paths.src.root + paths.dist.css)))

    //Minify css
    .pipe(gulpif(tw, cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(gulpif(tw, rename({
        suffix: '.min'
      })
    ))
    .pipe(gulpif(tw, gulp.dest(paths.dist.root + paths.dist.css)))
})

gulp.task('tailwind-purge', function() {
  return gulp.src('tailwind.css')
    .pipe(gulpif(tw, postcss([
        atimport(),
        tailwindcss("tailwind.config.js"),
        purgecss({ // Using '@fullhuman/postcss-purgecss'
          content: [paths.src.html, paths.src.js], // Must be necessary with 'tailwind.config.js'
          // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          defaultExtractor: content => content.match(/[\w-/:!@]+(?<!:)/g) || []
        }),
        autoprefixer()
      ])
    ))
    .pipe(gulpif(tw, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))

    //Minify css
    .pipe(gulpif(tw, cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(gulpif(tw, rename({
        suffix: '.min'
      })
    ))
    .pipe(gulpif(tw, gulp.dest(paths.dist.root + paths.dist.css)))
});

gulp.task('fontsize', function() {
  return gulp.src('./css/**/*.css', {allowEmpty: true})
    .pipe(replace('@charset "UTF-8";', ''))
    // Find digits between "font-size:" and "px" in Visual Studio Code using: "font-size:(\s*\d+\.*\d*)px" or "font-size:\s*\d+\.*\d*px"
    //'\s*': none or any spaces, '\d+': one or more digits, '\.*': none or any dots,  '\d*': none or any digit numbers
    // (\s*\d+\.*\d*) will find out any integer number or floating point number
    .pipe(replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    }))
    .pipe(gulp.dest('./css/'))
})
gulp.task('ukjs', function() {
  return gulp.src(paths.vendors.ukjs, {allowEmpty: true})
    .pipe(gulpif(uk, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(uk, gulp.dest(paths.dist.root + paths.dist.js)))

    // .pipe(gulp.dest(paths.src.root + paths.dist.js))
    // .pipe(gulp.dest(paths.dist.root + paths.dist.js))
    // .pipe(mode.production(gulp.dest(paths.dist.vendors)))
})
gulp.task('ukcss', function() {
  return gulp.src(paths.vendors.ukcss, {allowEmpty: true})
    .pipe(gulpif(uk, replace('@charset "UTF-8";', '')))
    // Find digits between "font-size:" and "px" in Visual Studio Code using: "font-size:(\s*\d+\.*\d*)px" or "font-size:\s*\d+\.*\d*px"
    //'\s*': none or any spaces, '\d+': one or more digits, '\.*': none or any dots,  '\d*': none or any digit numbers
    // (\s*\d+\.*\d*) will find out any integer number or floating point number
    .pipe(gulpif(uk, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(uk, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(uk, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('chartjs', function() {
  return gulp.src(paths.vendors.chartjs, {allowEmpty: true})
    .pipe(gulpif(chartjs, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(chartjs, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('fullcalendarjsi', function() {
  return gulp.src(paths.vendors.fullcalendarjsi, {allowEmpty: true})
    .pipe(gulpif(fullcalendar, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('fullcalendarjs', function() {
  return gulp.src(paths.vendors.fullcalendarjs, {allowEmpty: true})
    .pipe(gulpif(fullcalendar, rename("fullcalendar-main.min.js")))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('fullcalendarlocales', function() {
    return gulp.src(paths.vendors.fullcalendarlocales, {allowEmpty: true})
    .pipe(gulpif(fullcalendar, replace(/code:"zh-tw",buttonText:{prev:"上月",next:"下月"/g, function(match) {
      return 'code:"zh-tw",buttonText:{prev:"上月",next:"下月",prevYear:"上一年",nextYear:"下一年"'
    })))
    .pipe(gulpif(fullcalendar, rename("fullcalendar-locales.min.js")))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('fullcalendarcss', function() {
  return gulp.src(paths.vendors.fullcalendarcss, {allowEmpty: true})
    .pipe(gulpif(fullcalendar, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(fullcalendar, rename("fullcalendar-main.min.css")))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(fullcalendar, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('vendorsjs', function() {
  return gulp.src(paths.vendors.vendorsjs, {allowEmpty: true})
    .pipe(gulpif(vendorsjs, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(vendorsjs, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('vendorscss', function() {
  // return gulp.src([paths.vendors.vendorscss]) // [paths.vendors.vendorscss] will get errors. The variable array cannot be included in a array
  return gulp.src(paths.vendors.vendorscss, {allowEmpty: true})
    .pipe(gulpif(vendorscss, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(vendorscss, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('fonts', function() {
  return gulp.src(paths.vendors.fonts, {allowEmpty: true})
    .pipe(gulpif(fonts, gulp.dest(paths.src.root + paths.dist.fonts)))
    .pipe(gulpif(fonts, gulp.dest(paths.dist.root + paths.dist.fonts)))
})
gulp.task('facss', function() {
  return gulp.src(paths.vendors.facss, {allowEmpty: true})
    .pipe(gulpif(fa, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(fa, rename("fontawesome.min.css")))
    .pipe(gulpif(fa, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(fa, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('fafonts', function() {
  return gulp.src(paths.vendors.fafonts, {allowEmpty: true})
    .pipe(gulpif(fa, gulp.dest(paths.src.root + paths.dist.fafonts)))
    .pipe(gulpif(fa, gulp.dest(paths.dist.root + paths.dist.fafonts)))
})
gulp.task('bsjs', function() {
  return gulp.src(paths.vendors.bsjs, {allowEmpty: true})
    .pipe(gulpif(bs, replace('sourceMappingURL=bootstrap.bundle.min.js.map', '')))
    .pipe(gulpif(bs, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(bs, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('bscss', function() {
  return gulp.src('bootstrap.scss', {allowEmpty: true})
    .pipe(gulpif(bs, sass({
      // outputStyle: 'compressed',
      includePaths: ['node_modules/bootstrap/scss/'], // It's necessary or coding not completely
    }).on('error', sass.logError)))
    .pipe(gulpif(bs, gulpautoprefixer())) //Cannot use autoprefixer or get err
    .pipe(gulpif(bs, replace('@charset "UTF-8";', '')))
    .pipe(gulpif(bs, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(bs, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(bs, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('bsfonts', function() {
  return gulp.src(paths.vendors.bsfonts, {allowEmpty: true})
    .pipe(gulpif(bs, gulp.dest(paths.src.root + paths.dist.bsfonts)))
    .pipe(gulpif(bs, gulp.dest(paths.dist.root + paths.dist.bsfonts)))
})
gulp.task('bs3js', function() {
  return gulp.src(paths.vendors.bs3js, {allowEmpty: true})
    .pipe(gulpif(bs3, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(bs3, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('bs3css', function() {
  return gulp.src(paths.vendors.bs3css, {allowEmpty: true})
    .pipe(gulpif(bs3, replace('@charset "UTF-8";', '')))
    .pipe(gulpif(bs3, replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(bs3, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(bs3, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('bs3fonts', function() {
  return gulp.src(paths.vendors.bs3fonts, {allowEmpty: true})
    .pipe(gulpif(bs3, gulp.dest(paths.src.root + paths.dist.bsfonts)))
    .pipe(gulpif(bs3, gulp.dest(paths.dist.root + paths.dist.bsfonts)))
})
gulp.task('jqjs', function() {
  return gulp.src(paths.vendors.jq, {allowEmpty: true})
    .pipe(gulpif(jq, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(jq, gulp.dest(paths.dist.root + paths.dist.js)))
    // .pipe(gulp.dest(paths.src.root + paths.dist.js))
    // .pipe(gulp.dest(paths.dist.root + paths.dist.js))
    // .pipe(mode.production(gulp.dest(paths.dist.vendors)))
})

// clean dist and keep the directory
gulp.task('delhtml', function() {
  return del([paths.src.root + '*.html']);
});

// inject css & js to html - https://www.npmjs.com/package/gulp-inject#method-2-use-gulp-inject-s-name-option
gulp.task('inject', function() {
  return gulp.src(paths.src.html, {allowEmpty: true})
    .pipe(gulpif(bs, inject(gulp.src([paths.src.root + paths.dist.css + '/bootstrap*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.src.root + paths.dist.css + '/uikit*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(tw, inject(gulp.src([paths.src.root + paths.dist.css + '/tailwind*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'tw',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fa, inject(gulp.src([paths.src.root + paths.dist.css + '/font*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fa',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(vendorscss, inject(gulp.src([paths.src.root + paths.dist.css + '/' + vdcss], {allowEmpty: true}, {
      read: false
    }), {
      name: 'vendors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.src.root + paths.dist.css + '/fullcalendar*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/main.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'main',
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(colors, inject(gulp.src([paths.src.root + paths.dist.css + '/colors.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'colors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(injectothercolors, inject(gulp.src([paths.src.root + paths.dist.css + '/colors-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/style.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/style-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style2',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src(paths.src.injectcss, {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(uk, inject(gulp.src([paths.src.root + paths.dist.js + '/uikit.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.src.root + paths.dist.js + '/uikit-icons.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'ukicon',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(jq, inject(gulp.src([paths.src.root + paths.dist.js + '/jquery.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'jq',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(bs, inject(gulp.src([paths.src.root + paths.dist.js + '/bootstrap*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(vendorsjs, inject(gulp.src([paths.src.root + paths.dist.js + '/' + vdjs], {allowEmpty: true}, {
      read: false
    }), {
      name: 'vendors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(chartjs, inject(gulp.src([paths.src.root + paths.dist.js + '/chart*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'chartjs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.src.root + paths.dist.js + '/fullcalendar.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.src.root + paths.dist.js + '/fullcalendar-main*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar-main',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.src.root + paths.dist.js + '/fullcalendar-locales*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar-locales',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.js + '/script.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'head',
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(inject(gulp.src(paths.src.injectjs, {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.src.root))
  // .pipe(gulp.dest(paths.dist.root))
});
gulp.task('inject-color1', function() {
  return gulp.src(paths.src.color1html, {allowEmpty: true})
    .pipe(gulpif(separateinjectcolors, inject(gulp.src(paths.src.color1css, {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.src.root))
});
gulp.task('inject-color2', function() {
  return gulp.src(paths.src.color2html, {allowEmpty: true})
    .pipe(gulpif(separateinjectcolors, inject(gulp.src(paths.src.color2css, {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.src.root))
});
gulp.task('inject-color3', function() {
  return gulp.src(paths.src.color3html, {allowEmpty: true})
    .pipe(gulpif(separateinjectcolors, inject(gulp.src(paths.src.color3css, {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.src.root))
});

gulp.task('build-inject', function() {
  return gulp.src(paths.dist.html, {allowEmpty: true})
    .pipe(gulpif(bs, inject(gulp.src([paths.dist.root + paths.dist.css + '/bootstrap*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.dist.root + paths.dist.css + '/uikit*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(tw, inject(gulp.src([paths.dist.root + paths.dist.css + '/tailwind*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'tw',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fa, inject(gulp.src([paths.dist.root + paths.dist.css + '/font*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fa',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(vendorscss, inject(gulp.src([paths.dist.root + paths.dist.css + '/' + vdcss], {allowEmpty: true}, {
      read: false
    }), {
      name: 'vendors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.dist.root + paths.dist.css + '/fullcalendar*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/main*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'main',
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(colors, inject(gulp.src([paths.dist.root + paths.dist.css + '/colors.min.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'colors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(injectothercolors, inject(gulp.src([paths.dist.root + paths.dist.css + '/colors-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/style.min.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/style-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style2',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src(paths.dist.injectcss, {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(uk, inject(gulp.src([paths.dist.root + paths.dist.js + '/uikit.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.dist.root + paths.dist.js + '/uikit-icons.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'ukicon',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(jq, inject(gulp.src([paths.dist.root + paths.dist.js + '/jquery.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'jq',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(bs, inject(gulp.src([paths.dist.root + paths.dist.js + '/bootstrap*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(vendorsjs, inject(gulp.src([paths.dist.root + paths.dist.js + '/' + vdjs], {allowEmpty: true}, {
      read: false
    }), {
      name: 'vendors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(chartjs, inject(gulp.src([paths.dist.root + paths.dist.js + '/chart.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'chartjs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.dist.root + paths.dist.js + '/fullcalendar.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.dist.root + paths.dist.js + '/fullcalendar-main*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar-main',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fullcalendar, inject(gulp.src([paths.dist.root + paths.dist.js + '/fullcalendar-locales*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fullcalendar-locales',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.js + '/script*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'head',
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(inject(gulp.src(paths.dist.injectjs, {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.dist.root))
});
gulp.task('build-inject-color1', function() {
  return gulp.src(paths.dist.color1html, {allowEmpty: true})
    .pipe(gulpif(separateinjectcolors, inject(gulp.src(paths.dist.color1css, {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.dist.root))
});
gulp.task('build-inject-color2', function() {
  return gulp.src(paths.dist.color2html, {allowEmpty: true})
    .pipe(gulpif(separateinjectcolors, inject(gulp.src(paths.dist.color2css, {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.dist.root))
});
gulp.task('build-inject-color3', function() {
  return gulp.src(paths.dist.color3html, {allowEmpty: true})
    .pipe(gulpif(separateinjectcolors, inject(gulp.src(paths.dist.color3css, {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.dist.root))
});


// Compile SCSS
gulp.task('sass', function() {
  return gulp.src(paths.src.sasstoscss, {allowEmpty: true})
    // .pipe(sass({
    //   outputStyle: 'expanded'  //For old "gulp-sass"
    // }).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpautoprefixer()) //Cannot use autoprefixer or get err
    .pipe(replace('@charset "UTF-8";', ''))
    .pipe(replace(/font-size:(\s*\d+\.*\d*)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    }))
    .pipe(gulp.dest(paths.src.root + paths.dist.css))
    .pipe(browserSync.stream())
});

// Minify + Combine CSS
gulp.task('css', function() {
  return gulp.src(paths.src.minicss, {allowEmpty: true})
    .pipe(mode.development(
      postcss([
        atimport(),
        autoprefixer()
      ])
    ))
    .pipe(mode.production(
      postcss([
        atimport(),
        autoprefixer()
      ])
    ))
    .pipe(mode.production(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(mode.production(
      rename({
        suffix: '.min'
      })
    ))
    .pipe(mode.purge(
      postcss([
        atimport(),
        purgecss({ // Using '@fullhuman/postcss-purgecss'
          content: [paths.src.html, paths.src.js],
          // 'defaultExtractor' Must be necessary here
          defaultExtractor: content => content.match(/[\w-/:!@]+(?<!:)/g) || []
        }),
        autoprefixer()
      ])
    ))
    .pipe(mode.purge(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(mode.purge(
      rename({
        suffix: '.min'
      })
    ))
    // .pipe(
    //   postcss([
    //     atimport(),
    //     // purgecss({
    //     //   content: [paths.src.html, paths.src.js],
    //     //   // whitelist: ['opacity-100'],
    //     //   defaultExtractor: content =>
    //     //     content.match(/[\w-/:!@]+(?<!:)/g) || []
    //     // }),
    //     autoprefixer()
    //   ])
    // )
    // .pipe(cleanCSS({
    //   compatibility: 'ie8'
    // }))
    // // .pipe(concat('app.css'))
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(gulp.dest(paths.dist.root + paths.dist.css))
});
gulp.task('mincss', function() {
  return gulp.src(paths.src.mincss, {allowEmpty: true})
    .pipe(mode.production(
      postcss([
        atimport(),
        autoprefixer()
      ])
    ))
    .pipe(mode.production(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(mode.purge(
      postcss([
        atimport(),
        purgecss({
          content: [paths.src.html, paths.src.js],
          // whitelist: ['opacity-100'],
          defaultExtractor: content =>
            content.match(/[\w-/:!@]+(?<!:)/g) || []
        }),
        autoprefixer()
      ])
    ))
    .pipe(mode.purge(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(gulp.dest(paths.dist.root + paths.dist.css))
});

// Minify + Combine JS
gulp.task('js', function() {
  return gulp.src(paths.src.minjs, {allowEmpty: true})
    // .pipe(mode.production(
    //   autopolyfiller('script_polyfill.js', {
    //     browsers: require('autoprefixer').default
    //   })
    // ))
    // .pipe(autopolyfiller('script-polyfill.js'))
    .pipe(mode.production(
      uglify()
    ))
    .pipe(mode.production(
      rename({
        suffix: '.min'
      })
    ))
    .pipe(mode.purge(
      uglify()
    ))
    .pipe(mode.purge(
      rename({
        suffix: '.min'
      })
    ))
    // .pipe(uglify())
    // // .pipe(concat('app.js'))
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    // .pipe(gulp.dest(paths.dist.root + paths.dist.js))
    .pipe(mode.production(gulp.dest(paths.dist.root + paths.dist.js)))
    .pipe(mode.purge(gulp.dest(paths.dist.root + paths.dist.js)))

    .pipe(browserSync.stream());
});

//It seems not working
// gulp.task('minjs', function() {
//   return gulp.src([paths.src.root + paths.dist.js + '/*.min.js'])
//     .pipe(mode.production(
//       uglify()
//     ))
//     .pipe(mode.purge(
//       uglify()
//     ))
//     .pipe(mode.production(gulp.dest(paths.dist.root + paths.dist.js)))
//     .pipe(mode.purge(gulp.dest(paths.dist.root + paths.dist.js)))

//     .pipe(browserSync.stream());
// });

// Compress (JPEG, PNG, GIF, SVG, JPG)
gulp.task('img', function() {
  return del([paths.dist.root + paths.dist.img]), gulp.src(paths.src.img, {allowEmpty: true})
    // .pipe(imagemin([
    //   gifsicle({interlaced: true}),
    //   mozjpeg({quality: 75, progressive: true}),
    //   optipng({optimizationLevel: 5}),
    //   // svgo got removing ',' prolblem in svg
    //   // svgo({
    //   //     plugins: [
    //   //         {removeViewBox: true},
    //   //         {cleanupIDs: false}
    //   //     ]
    //   // })
    // ]))
    .pipe(gulp.dest(paths.dist.root + paths.dist.img));
});

// ceate dist dir
gulp.task('dist', function() {
  return gulp.src('*.*', {
      read: false
    })
    .pipe(gulp.dest(paths.dist.root))
});

// clean dist and keep the directory
gulp.task('clean', function() {
  return del(['dist/**', '!dist']);
});

// clean css
gulp.task('deletecss', function() {
  return del(paths.src.delcss, {allowEmpty: true});
});

// clean js
gulp.task('deletejs', function() {
  return del(paths.src.deljs, {allowEmpty: true});
});

// Watch (SASS, CSS, JS, and HTML) reload browser on change
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: paths.root.www
    }
  })
  gulp.watch(paths.src.scss, gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch(paths.src.css, gulp.series('css')).on('change', browserSync.reload);
  gulp.watch(paths.src.js).on('change', browserSync.reload);
  // gulp.watch(paths.src.js, gulp.series('js')).on('change', browserSync.reload);
  // gulp.watch(paths.src.templates, gulp.series('templates')).on('change', browserSync.reload);
  gulp.watch(paths.src.root + paths.dist.templates + '/**/*.hbs', gulp.series('delhtml', 'templates')).on('change', browserSync.reload);
  gulp.watch(paths.src.html).on('change', browserSync.reload);
});

//------------------- First run 'gulp start' ---------------------------------------------------------
//First Preset all files
// gulp.task('vendors', gulp.series('tailwind', 'copyjs', 'copycss', 'facss', 'copyfonts'));
// gulp.task('vendors', gulp.series('copyjs', 'copycss', 'facss', 'copyfonts'));
gulp.task('vendors', gulp.series('ukjs', 'ukcss', 'bsjs', 'bscss', 'bsfonts', 'bs3js', 'bs3css', 'bs3fonts', 'fonts', 'facss', 'fafonts', 'jqjs', 'chartjs', 'fullcalendarjsi', 'fullcalendarjs', 'fullcalendarlocales', 'fullcalendarcss', 'vendorsjs', 'vendorscss'));

//Compile Tailwind to CSS and minify css, using 'gulp tailwind' & 'gulp tailwind --production' to purge css on production
gulp.task('tocss', gulp.series('sass', 'css', 'mincss'));
// gulp.task('tocss', gulp.series('tailwind', 'sass', 'css'));

//Compile SCSS to CSS and purge & minify css, needed when modify scss
gulp.task('scss', gulp.series('sass', 'css'));

//------------------- Remember edit 'title' in gulp.task('templates') ---------------------------------------------------------
//********** First Edit title: ' ' **************
//Inject path manually in 'meta.hbs' files, no 'inject' task
gulp.task('temp', gulp.series('templates'));
//Inject path to all html files relative to /src and /dist [NO for different injection in html]
gulp.task('html', gulp.series('delhtml', 'templates', 'deletecss', 'sass', 'js', 'inject'));

//0. Preset
gulp.task('start', gulp.series('deletecss', 'deletejs', 'vendors', 'delhtml', 'templates', 'sass', 'js', 'inject'));

//1. Preset then watch
gulp.task('server', gulp.series('deletecss', 'deletejs', 'vendors', 'tailwind', 'delhtml', 'templates', 'sass', 'inject', 'inject-color1', 'inject-color2', 'watch'));

//2. Prepare all assets for production, run: 'yarn build-nohtml' or 'yarn build'
gulp.task('build-nohtml', gulp.series('deletecss', 'deletejs', 'vendors', 'scss', 'js', 'img'));
gulp.task('build-purge', gulp.series('dist', 'clean', 'deletecss', 'deletejs', 'delhtml', 'vendors', 'tailwind', 'templates', 'img', 'tailwind-purge', 'js', 'scss', 'inject', 'inject-color1', 'inject-color2', 'build-inject', 'build-inject-color1', 'build-inject-color2'));
gulp.task('build', gulp.series('dist', 'clean', 'deletecss', 'deletejs', 'delhtml', 'vendors', 'tailwind', 'templates', 'img', 'tailwind-build', 'js', 'scss', 'inject', 'inject-color1', 'inject-color2', 'build-inject', 'build-inject-color1', 'build-inject-color2'));


//--- 0.First run: 'gulp start'
//--- 1.For development run: 'gulp server' or 'yarn server'
//--- 2.For production only run: 'yarn build'