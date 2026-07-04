(function () {
    const container = document.querySelector('.product-footer');
    const canvas = document.getElementById('about-custom');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let running = true; // 用于 IntersectionObserver 暂停/恢复
    let deviceRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // 限 2 以内

    // 颜色 & 参数（可按需微调）
    const COLOR_RGB = getComputedStyle(container)
        .getPropertyValue('--particle-color').trim() || '140,85,31';

    // 鼠标（转换为 canvas 内坐标）
    const mouse = { x: undefined, y: undefined, radius: 60 };

    // ====== 尺寸 & 自适应 ======
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        // 逻辑像素尺寸
        const cssW = Math.max(1, Math.floor(rect.width));
        const cssH = Math.max(1, Math.floor(rect.height));
        // 物理像素尺寸（防糊）
        canvas.width = Math.floor(cssW * deviceRatio);
        canvas.height = Math.floor(cssH * deviceRatio);
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
        ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

        // 根据面积动态调整粒子数量并设上限
        const area = cssW * cssH;
        const base = Math.ceil(area / 5000);       // 你原来的密度
        const capped = Math.min(
            parseInt(getComputedStyle(container).getPropertyValue('--particle-max')) || 220,
            base
        );
        mouse.radius = Math.max(40, Math.min(120, Math.sqrt(area) / 6));
        createParticles(capped, cssW, cssH);
    }

    // ResizeObserver 比 window.resize 更精准（容器变高也能捕捉）
    const ro = new ResizeObserver(() => {
        resizeCanvas();
    });
    ro.observe(container);

    // ====== 鼠标事件（换算到 canvas 局部坐标）======
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left);
        mouse.y = (e.clientY - rect.top);
    });
    window.addEventListener('mouseout', () => {
        mouse.x = undefined; mouse.y = undefined;
    });

    // ====== 粒子类 ======
    class Particle {
        constructor(x, y, velX, velY, size) {
            this.x = x; this.y = y;
            this.vx = velX; this.vy = velY;
            this.size = size;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(${COLOR_RGB}, var(--particle-dot-alpha, 1))`;
            ctx.fill();
        }
        update(w, h) {
            if (this.x > w || this.x < 0) this.vx *= -1;
            if (this.y > h || this.y < 0) this.vy *= -1;

            // 鼠标排斥
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);
                if (dist < mouse.radius + this.size) {
                    const force = (mouse.radius - dist) / mouse.radius; // 0~1
                    // 加一个柔和的推力
                    this.x -= (dx / (dist || 1)) * force * 8;
                    this.y -= (dy / (dist || 1)) * force * 8;
                }
            }

            this.x += this.vx;
            this.y += this.vy;
            this.draw();
        }
    }

    // ====== 生成粒子 ======
    function createParticles(count, w, h) {
        particlesArray = [];
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 2.5 + 0.7; // 更细腻
            const x = Math.random() * (w - 2 * size) + size;
            const y = Math.random() * (h - 2 * size) + size;
            const vx = (Math.random() * 1.5 - 0.75); // 降速更优雅
            const vy = (Math.random() * 1.5 - 0.75);
            particlesArray.push(new Particle(x, y, vx, vy, size));
        }
    }

    // ====== 连线 ======
    function connect(w, h) {
        const vicinityDist = (w * h) / 80; // 容器面积的函数
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distanceSq = dx * dx + dy * dy;
                if (distanceSq < vicinityDist) {
                    // 透明度随距离衰减
                    const opacity = Math.max(0, 1 - distanceSq / (vicinityDist * 1.2));
                    ctx.strokeStyle = `rgba(${COLOR_RGB}, ${opacity * (parseFloat(getComputedStyle(container).getPropertyValue('--particle-line-alpha')) || 0.6)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // ====== 动画循环 ======
    function animate() {
        if (!running) { requestAnimationFrame(animate); return; }
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update(w, h);
        }
        connect(w, h);
        requestAnimationFrame(animate);
    }

    // 如果区域不可见，就暂停动画
    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            running = e.isIntersecting;
        }
    }, { threshold: 0 });
    io.observe(container);

    // 初始化
    resizeCanvas();
    animate();

    // 可选：窗口缩放时轻量更新 DPR（用户切换屏幕缩放）
    let dprTimer;
    window.addEventListener('resize', () => {
        clearTimeout(dprTimer);
        dprTimer = setTimeout(() => {
            const newRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            if (Math.abs(newRatio - deviceRatio) > 0.01) {
                deviceRatio = newRatio;
                resizeCanvas();
            }
        }, 120);
    });
})();
