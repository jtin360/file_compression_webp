import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "/images/converted/");
console.log(dirPath);

const dimensions = [
  { width: 2237, height: 2153 },
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
];

Promise.all(
  dimensions.map(({ width, height }) => {
    return imagemin(["images/*.{jpg,png}"], {
      destination: path.join(dirPath, `${width}x${height}`),
      plugins: [
        imageminWebp({
          quality: 100,
          resize: {
            width: width,
            height: height,
          },
        }),
      ],
    }).then(() => {
      console.log(`Images optimized for width=${width}, height=${height}`);
    });
  })
)
  .then(() => {
    console.log("All images optimized");
  })
  .catch((err) => {
    console.error(err);
  });

// import imagemin from 'imagemin';
// import imageminWebp from 'imagemin-webp';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dirPath = path.join(__dirname, '/images/converted/');
// console.log(dirPath);
// imagemin(['images/*.{jpg,png}'], {
//   destination: dirPath,
//   plugins: [
//     imageminWebp({
//       quality: 100,
//       resize: {
//         width: 2237,
//         height: 2153
//       }
//     })
//   ]
// }).then(() => {
//   console.log('Images optimized');
// });
