const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const image = require("gulp-image");
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const del = require("del");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const gulpif = require("gulp-if");
const yargs = require("yargs");
const env = yargs.argv._[0];
const sass = require("gulp-sass")(require("sass"));

const clean = () => {
  return del("dist");
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist"));
};

const fonts = () => {
  return src(["src/fonts/**/*.woff", "src/fonts/**/*.woff2"]).pipe(dest("dist/fonts"));
};

const styles = () => {
  return src(["src/styles/**/*.css", "src/styles/**/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env !== "build", sourcemaps.init()))
    .pipe(concat("main.css"))
    .pipe(gulpif(env === 'build',
      autoprefixer({
        cascade: false,
      })
    ))
    .pipe(gulpif(env === 'build',
      cleanCSS({
        level: 2,
      }))
    )
    .pipe(gulpif(env !== "build", sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      gulpif(
        env === "build",
        htmlMin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/img/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/images"));
};

const scripts = () => {
  return src(["src/js/components/**/*.js", "src/js/*.js"])
    .pipe(gulpif(env !== "build", sourcemaps.init()))
    .pipe(
      gulpif(
        env === "build",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(concat("app.js"))
    .pipe(
      gulpif(
        env === "build",
        uglify({ toplevel: true }).on("error", notify.onError())
      )
    )
    .pipe(gulpif(env !== "build", sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

const images = () => {
  return src([
    "src/img/**/*.jpg",
    "src/img/**/*.png",
    "src/img/*.svg",
    "src/img/**/*.jpeg",
  ])
    .pipe(image())
    .pipe(dest("dist/images"));
};

watch("src/**/*.html", htmlMinify);
watch("src/styles/**/*.scss", styles);
watch("src/img/svg/**/*.svg", svgSprites);
watch("src/js/**/*.js", scripts);
watch("src/resources/**", resources);
watch("src/fonts/**", fonts);

exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.default = series(
  clean,
  resources,
  htmlMinify,
  styles,
  svgSprites,
  images,
  scripts,
  fonts,
  watchFiles
);
exports.build = series(
  clean,
  resources,
  htmlMinify,
  styles,
  svgSprites,
  images,
  scripts,
  fonts
);
