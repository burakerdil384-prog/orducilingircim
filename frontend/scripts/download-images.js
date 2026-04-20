const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJUZE28LalSIsmwRkkkEnzKgr1XFHrBYqyOke1g_CwYdH7N727oP8DJfGmnCQVuUrcO9lwhIkjQkTwGLwVtXCBQBX69tWOhfRecMTubFZNz55fhHVU8giCH_DAerxoqAHNF6K3-QJKc66hOWTvRmjsoaoM5oqTstXQy_cWRBlcD2YclZTl7wdYGVqCHkmAqrVXN7Wv7GbyDL96kKSyihiiLBl60yuAZLp5jRGcz3HtH9eMMKUzpWsTEiijvD8d3Mp6geDZn4wd0jlB",
    filename: "hero-door.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB12p3AJxWgVbJczYePgkk6fH-w1PuumLEKpzJ3JtZWle_KqXPCdXNPAEmVRg4DAlCrG4Pu3dys9j_SGvf47PzaRxfoyJb5FJc0nM0pPZxMe3lYy_wIeHQuCMIxpk7IFBgwnrGzra0cnrl3ILkwTXwYNVot81nzqP76SxFQcoHmeAN3-O11ayKyweWH8evx28DIl1eA_9q-rDHu7Yko90qmJKSaBFZ-oc8IrYT4v6IrtI2prvjZcRbFr_MVFo4ygRJQxSWWaK4Q_Jf0",
    filename: "professional-locksmith.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMjoR8OL0wBCx39WLKD5cIF9_9SKyuZY10nI4i0U2H6l-hf6E3cXZHpw39teHC0Hnwnx2VYQBKgz1ZMCQPPW_0aWzmhPp7n9D-i56aQxzJUyY-51tLRzWFyPbl9t7kA9ePrN71gzE67EGpboqUAYdZ-SMbqXtJY-S8XJVcVJ_xCcyZpZpKj3FYdA_cu4963QuH_ObfyGTn6Afs1gwWEt-krtVzpvXzE5azlUq_0wpYeNutLmbO3pI_CT31WbhVwTonfkisbozMVy0N",
    filename: "aerial-map.jpg"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxTYTVUzA3CrcHYf97Ls_gCR0rKpYw3ZSw7jvhGpGXJUt7-uiOy2Lo13SM__Ta2PMNabokwBpU0BoXI9FEt9xZNbx17JrYXbiOZeqIxpPsidudoMaX_of1uRbsndJe1j_OyIVF4upeyNR-rCcw6yQPsh9RJGn12F9TpWUZ6Zlv1fxNCMKdPPgcufZ3PmcmIn1RbyuZguh4Pc9piFaMTcrBTKcseWIkROUwfLWASrPIViF5zZxC1WGLk1LMTsRkATseHIv_KsznEANq",
    filename: "location-map.jpg"
  }
];

const targetDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, filename);
    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download this image: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} to public/images/`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(targetDir);
      reject(err);
    });
  });
}

async function run() {
  console.log("Downloading static images from Google...");
  for (const img of images) {
    try {
      await downloadImage(img.url, img.filename);
    } catch (err) {
      console.error(`Failed downloading ${img.filename}: `, err);
    }
  }
  console.log("All image downloads completed!");
}

run();
