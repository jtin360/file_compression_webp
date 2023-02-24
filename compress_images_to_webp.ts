import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "/images/converted/");

const dimensions = [
  { width: 3840, height: 2560 },
  { width: 3833, height: 2555 },
  { width: 3745, height: 2497 },
  { width: 3556, height: 2371 },
  { width: 3437, height: 2291 },
  { width: 3378, height: 2252 },
  { width: 3310, height: 2207 },
  { width: 3278, height: 2185 },
  { width: 3144, height: 2096 },
  { width: 3101, height: 2067 },
  { width: 2827, height: 1885 },
  { width: 2475, height: 1650 },
  { width: 2512, height: 1675 },
  { width: 2506, height: 1671 },
  { width: 1722, height: 1148 },
  { width: 1471, height: 981 },
  { width: 1177, height: 785 },
  { width: 806, height: 537 },
  { width: 190, height: 127 },
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
    console.log("All images optimized and saved locally");
    //TODO: SAVE TO GOOGLE CLOUD AND UPDATE DB WITH URL
  })
  .then(() => {
    console.log("Delete images from local after done compression and resizing");
    //TODO: CLEAN UP
  })
  .catch((err) => {
    console.error(err);
    //TODO: ERROR CHECKING
  });
