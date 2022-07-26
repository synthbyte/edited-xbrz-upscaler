const { loadImage, createCanvas } = require("canvas");
const { createWriteStream } = require("fs");
const { applyFilter } = require("./xbrz");
const scale = 6

loadImage('input.png')
	.then(async (image) => {
		const newCanvas = createCanvas(image.width*scale - scale*2, image.height*scale - scale*2)
		const newImage = createCanvas(image.width, image.height)
		const newCtx = newImage.getContext('2d')
		newCtx.drawImage(image, 0, 0)
		await applyFilter(newImage, newCanvas, scale)
		outputImage(newCanvas)
	})

function outputImage(newCanvas) {
	const outStream = createWriteStream(__dirname + "/output.png")
	const stream = newCanvas.createPNGStream()
	stream.pipe(outStream)
	outStream.on('finish', () => console.log("Image created"))
}