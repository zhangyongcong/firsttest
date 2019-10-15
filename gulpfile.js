/* 编写任务 */
const gulp = require('gulp');
const connect = require("gulp-connect");
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task('copy-html',function(){
    return gulp.src("*.html")
    .pipe(gulp.dest('item'))
    .pipe(connect.reload());
})

gulp.task('copy-php',function(){
    return gulp.src("*.php")
    .pipe(gulp.dest('item'))
    .pipe(connect.reload());
})

gulp.task('copy-html1',function(){
    return gulp.src("html/*.html")
    .pipe(gulp.dest('item/html'))
    .pipe(connect.reload());
})

gulp.task('copy-file',function(){
    return gulp.src("iconfont*/*")
    .pipe(gulp.dest('item'))
    .pipe(connect.reload());
})

gulp.task("scss", function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("item/css"))
    .pipe(gulp.dest("item/css"))
    .pipe(connect.reload());
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("item/js"))
    .pipe(connect.reload());
})

gulp.task("images", function(){
    return gulp.src("img/*.{jpg,png,gif}")
    .pipe(gulp.dest("item/images"))
    .pipe(connect.reload());
})

gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("item/data"))
    .pipe(connect.reload());
})

/* 
    一次性执行多个任务
*/
gulp.task("build", ["scripts", 'images', 'data','copy-html','copy-html1','copy-php','copy-file','scss'], function(){
    console.log("项目建立成功");
})

/* 监听 */
gulp.task("watch", function(){
    gulp.watch("*.html", ['copy-html']);
    gulp.watch("*.php", ['copy-php']);
    gulp.watch("iconfont*/*", ['copy-file']);
    gulp.watch("html/*.html", ['copy-html1']);
    gulp.watch("stylesheet/*.scss", ['scss']);
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch("img/*.{jpg,png,gif}", ["images"]);
    gulp.watch(["*.json", "!package.json"], ['data']);

})

gulp.task("server", function(){
    connect.server({
        root: "item",
        port: 8888,
        livereload: true
    })
})

gulp.task("default", ['watch', 'server']);

