const { loadImage, createCanvas } = require("canvas");
const { createWriteStream } = require("fs");
const { applyFilter } = require("./xbrz");

loadImage('input.png')
	.then(async (image) => {
		const newCanvas = createCanvas(image.width*4, image.height*4)
		const newImage = createCanvas(image.width, image.height)
		const newCtx = newImage.getContext('2d')
		newCtx.drawImage(image, 0, 0)
		await applyFilter(newImage, newCanvas)
		outputImage(newCanvas)
	})

function outputImage(newCanvas) {
	const outStream = createWriteStream(__dirname + "/output.png")
	const stream = newCanvas.createPNGStream()
	stream.pipe(outStream)
	outStream.on('finish', () => console.log("Image created"))
}