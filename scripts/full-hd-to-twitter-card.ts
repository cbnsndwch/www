import sharp from 'sharp';

const inputImage = process.argv[2] || 'input.png';
const outputImage = process.argv[3] || 'output.png';

sharp(inputImage)
    .extract({ left: 0, top: 38, width: 1920, height: 1005 })
    .resize(1200, 628)
    .toFile(outputImage)
    .then(() => {
        console.log('Image processed successfully');
    })
    .catch(err => {
        console.error('Error processing image:', err);
    });
