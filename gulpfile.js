import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import imagemin from 'gulp-imagemin';
import gulpWebp from 'gulp-webp';
import terser from 'gulp-terser-js';
import minifyHtml from 'gulp-minify-html';
import gulpClean from 'gulp-clean';
import webpack from 'webpack-stream';

const pathsSrc = {
    css: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.*',
    html: '*.html',
};

const pathsBuild = {
    css: 'dist/css',
    js: 'dist/js',
    img: 'dist/img',
    html: 'dist',
};

const sass = gulpSass(dartSass)

export function clean(done) {
    src('dist/')
        .pipe(gulpClean());

    done()
}

export function html(done) {
    src(pathsSrc.html)
        .pipe(minifyHtml({ conditionals: true, spare: true }))
        .pipe(dest(pathsBuild.html));

    done()
}

export function js(done) {
    src(pathsSrc.js, { sourcemaps: true })
        // .pipe(webpack({
        //     module: {
        //         rules: [
        //             {
        //                 test: /\.css$/i,
        //                 use: ['style-loader', 'css-loader']
        //             }
        //         ]
        //     },
        //     mode: 'production',
        //     watch: true,
        //     entry: './src/js/app.js'
        // }))
        .pipe(terser())
        .pipe(dest(pathsBuild.js, { sourcemaps: '.' }))

    done()
}

export function css(done) {
    src(pathsSrc.css, { sourcemaps: true })
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(pathsBuild.css, { sourcemaps: '.' }));
    
    done()
}

export function img(done) {
    src(pathsSrc.img)
        .pipe(imagemin())
        .pipe(dest(pathsBuild.img));

    done()
}

export async function webp(done) {
    src(pathsSrc.img)
        .pipe(gulpWebp())
        .pipe(dest(pathsBuild.img));

    done();
}

export function dev(done) {
    watch(pathsSrc.html, html)
    watch(pathsSrc.css, css)
    watch(pathsSrc.js, js)
    // watch(pathsSrc.img, img)
    // watch(pathsSrc.img, webp)

    done();
}

export const build = series(html, css, js);
export default series(html, css, js, dev)