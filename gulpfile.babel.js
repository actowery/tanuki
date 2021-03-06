const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')

// Build JS
gulp.task('build', () =>
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'))
)
 
// Build styles
gulp.task('sass', () => {
    gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
})

// Minify views
gulp.task('html', () => {
    gulp.src('src/views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'))
})

// Move files
gulp.task('copy', () => {
    gulp.src('src/index.min.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
    
    gulp.src(['src/favicon.ico'])
        .pipe(gulp.dest('dist'))

    gulp.src('src/lib/**/*').pipe(gulp.dest('dist/lib'))
})

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('default', ['build', 'html', 'sass', 'copy'], () => {})