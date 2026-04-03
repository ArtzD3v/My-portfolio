const { Jimp } = require('jimp');
const fs = require('fs');

async function processImage(inputPath, outputPath) {
    console.log(`Processing ${inputPath}...`);
    try {
        const image = await Jimp.read(inputPath);
        
        image.scan((x, y, idx) => {
            const r = image.bitmap.data[idx + 0];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];
            
            // Background is usually around (12, 4, 4), or darker/slightly brighter.
            const maxVal = Math.max(r, g, b);
            
            if (maxVal < 35) {
                if (maxVal <= 18) {
                    // Fully transparent for darkest background
                    image.bitmap.data[idx + 3] = 0; 
                } else {
                    // Soft gradient to transparent for anti-aliasing edges
                    const alpha = Math.floor(((maxVal - 18) / 17) * 255);
                    image.bitmap.data[idx + 3] = alpha;
                }
            }
        });
        
        await image.write(outputPath);
        console.log(`Saved to ${outputPath}`);
    } catch (e) {
        console.error("Error processing", inputPath, e);
    }
}

async function main() {
    await processImage('../assets/img/sakura-top-left.png', '../assets/img/sakura-top-left-nobg.png');
    await processImage('../assets/img/sakura-bottom-right.png', '../assets/img/sakura-bottom-right-nobg.png');
}

main();
