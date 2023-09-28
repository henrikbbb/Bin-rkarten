let images = []
let cards = []
let imageWidth, imageHeight
let offsetDecimal, offsetBinary
let radio
let slider

function preload() {
	images.push(loadImage('1.png'))
	images.push(loadImage('2.png'))
	images.push(loadImage('4.png'))
	images.push(loadImage('8.png'))
	images.push(loadImage('16.png'))
	images.push(loadImage('32.png'))
}

function setup() {
	createCanvas(1200, 500)
	imageWidth = 200
	imageHeight = imageWidth*1.41

	offsetDecimal = 20
	offsetBinary = 50

	for (let i = 0; i < images.length; i++) {
		cards.push(new Card(images[i], width - (1+i)*imageWidth, 2**i))
	}

	radio = createRadio()
	radio.option('aus')
	radio.option('Dezimalzahlen')
	radio.option('Binärzahlen')
	radio.selected('aus')

	slider = createSlider(0, 6, 3)
}

function draw() {
	background(255)

	for (let i = 0; i < slider.value(); i++) {
		cards[i].show()
	}
}

function mouseClicked() {
	for (let card of cards) {
		if (card.mouseOver()) {
			card.active = !card.active
		}
	}
}

class Card {
	constructor(img, x, n) {
		this.img = img
		this.x = x
		this.n = n
		this.activ = true
	}

	show() {
		if (this.active) {
			image(this.img, this.x, 0, imageWidth, imageHeight)
			noFill()
			stroke(0)
			strokeWeight(5)
			rect(this.x, 0, imageWidth, imageHeight)

			noStroke()
			fill(0)
			textAlign(CENTER, TOP)
			textSize(50)

			if (radio.value() == 'Dezimalzahlen') {
				text(this.n, this.x + imageWidth/2, imageHeight + offsetDecimal)
			}

			if (radio.value() == 'Binärzahlen') {
				text(1, this.x + imageWidth/2, imageHeight + offsetBinary)
			}
		} else {
			fill(255)
			stroke(0)
			strokeWeight(5)
			rect(this.x, 0, imageWidth, imageHeight)

			noStroke()
			fill(0)
			textAlign(CENTER, TOP)
			textSize(50)

			if (radio.value() == 'Binärzahlen') {
				text(0, this.x + imageWidth/2, imageHeight + offsetBinary)
			}
		}
	}

	mouseOver() {
		return (this.x < mouseX && mouseX < this.x + imageWidth && 0 < mouseY && mouseY < imageHeight)
	}
}