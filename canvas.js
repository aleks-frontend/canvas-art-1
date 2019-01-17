const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let circleArray = [];
const numOfCircles = 1000;

const maxRadius = 200;

const colorsArray = [
    '#1F2226',
    '#D6231E',
    '#F8B500',
    '#FFF4E0',
    '#2E94B5'
];

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    resizeCanvas();
    init();
});

window.dispatchEvent(new Event('resize'));

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Circle(x, y, dx, dy, radius, mouse) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        const colissionRight = (this.x > canvas.width - this.radius);
        const colissionLeft = (this.x <= this.radius);

        const colissionTop = (this.y > canvas.height - this.radius);
        const colissionBottom = (this.y <= this.radius);

        const horizontalClash = mouse.x - this.x < 50 && mouse.x - this.x > - 50;
        const verticalClash = mouse.y - this.y < 50 && mouse.y - this.y > - 50;

        if ( colissionLeft || colissionRight ) {
            this.dx = -this.dx;
        }

        if ( colissionTop || colissionBottom ) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity

        if ( horizontalClash && verticalClash ) {
            if ( this.radius < maxRadius ) {
                this.radius += 1;
            }
        } else if ( this.radius > this.minRadius ) {
            this.radius -= 1;
        }

        this.draw();
    };
}

function init() {
    circleArray = [];

    for ( let i = 0; i < numOfCircles; i++ ) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;

        circleArray.push(new Circle(x, y, dx, dy, radius, mouse));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);

    circleArray.forEach(circle => {
        circle.update();
    });
}

animate();
