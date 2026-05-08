const canvas = document.getElementById('threadCanvas');
const ctx = canvas.getContext('2d');
let animationFrame;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawThread();
}

function getBallCoords() {
    const ball = document.getElementById('admin-trigger');
    if (!ball) return { x: window.innerWidth - 50, y: 70 };
    const rect = ball.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function drawThread() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollPercent));
    
    ctx.beginPath();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#F5D9B0';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    
    const start = getBallCoords();
    let x = start.x;
    let y = start.y;
    ctx.moveTo(x, y);
    
    let angle = 0;
    const stepY = 18;
    const maxLength = (canvas.height + 250) * progress;
    let traveled = 0;
    let amplitude = 90;
    
    while (traveled < maxLength && y < canvas.height + 200) {
        let nextY = y + stepY;
        let waveX = amplitude * Math.sin(angle * 0.7);
        let nextX = Math.min(canvas.width - 50, Math.max(50, start.x + waveX));
        ctx.lineTo(nextX, nextY);
        x = nextX;
        y = nextY;
        angle += 0.45;
        traveled += stepY;
        
        // длинная петля
        if (Math.random() < 0.04 && progress > 0.15 && traveled < maxLength - 120) {
            const cpX = (Math.random() > 0.5) ? canvas.width - 70 : 70;
            const cpY = y - 30;
            const endX = (cpX > canvas.width/2) ? canvas.width - 100 : 100;
            const endY = y + 20;
            ctx.quadraticCurveTo(cpX, cpY, endX, endY);
            x = endX;
            y = endY;
            traveled += 40;
            angle += 0.3;
        }
        if (Math.random() < 0.02) amplitude = 60 + Math.random() * 90;
    }
    ctx.stroke();
    
    // узелки
    if (progress > 0.05) {
        ctx.fillStyle = '#F5D9B0';
        for (let i = 0; i < traveled / 45; i++) {
            let t = i / (traveled / 45);
            let approxY = start.y + t * traveled;
            let approxX = start.x + amplitude * 0.8 * Math.sin(t * 14);
            ctx.beginPath();
            ctx.arc(approxX, approxY, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

window.addEventListener('resize', () => { resizeCanvas(); drawThread(); });
window.addEventListener('scroll', () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(drawThread);
});
window.addEventListener('load', () => { resizeCanvas(); drawThread(); });