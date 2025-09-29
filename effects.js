// ========== 复杂背景特效JavaScript ==========

class BackgroundEffects {
    constructor() {
        this.currentTheme = 'default';
        this.effectsContainer = null;
        this.animationFrame = null;
        this.particles = [];
        this.effects = {
            cyberpunk: null,
            magic: null,
            disco: null
        };

        this.init();
    }

    init() {
        this.createEffectsContainer();
        this.loadThemeFromStorage();
        this.bindEvents();
    }

    createEffectsContainer() {
        // 创建特效容器
        this.effectsContainer = document.createElement('div');
        this.effectsContainer.id = 'background-effects';
        document.body.appendChild(this.effectsContainer);
    }

    loadThemeFromStorage() {
        const savedTheme = localStorage.getItem('selectedTheme') || 'default';
        this.switchTheme(savedTheme);
    }

    bindEvents() {
        // 监听主题切换事件
        document.addEventListener('themeChange', (e) => {
            this.switchTheme(e.detail.theme);
        });

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });

      }

    switchTheme(theme) {
        // 清理当前特效
        this.clearCurrentEffects();

        this.currentTheme = theme;

        // 根据主题创建对应的特效
        switch (theme) {
            case 'cyberpunk':
                this.createCyberpunkEffects();
                break;
            case 'magic':
                this.createMagicEffects();
                break;
            case 'disco':
                this.createDiscoEffects();
                break;
            default:
                this.clearCurrentEffects();
                break;
        }
    }

    clearCurrentEffects() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // 清理所有粒子
        this.particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particles = [];

        // 清理特效容器
        if (this.effectsContainer) {
            this.effectsContainer.innerHTML = '';
        }

        // 清理主题特效
        Object.keys(this.effects).forEach(key => {
            this.effects[key] = null;
        });
    }

    // ========== 赛博朋克特效 ==========
    createCyberpunkEffects() {
        const container = this.createEffectContainer('cyberpunk-effects');

        // 创建网格背景
        const grid = this.createElement('div', 'cyberpunk-grid');
        container.appendChild(grid);

        // 创建激光扫描
        for (let i = 0; i < 3; i++) {
            const laser = this.createElement('div', 'laser-scan');
            container.appendChild(laser);
        }

        // 创建数据流
        this.createDataStreams(container);

        // 创建数字雨
        this.createDigitalRain(container);

        // 创建全息故障效果
        const glitch = this.createElement('div', 'holographic-glitch');
        container.appendChild(glitch);

        this.effects.cyberpunk = {
            container,
            grid,
            glitch
        };

        // 启动动画循环
        this.startCyberpunkAnimation();
    }

    createDataStreams(container) {
        // 清理旧的数据流元素
        const oldStreams = container.querySelectorAll('.data-stream');
        oldStreams.forEach(stream => stream.remove());

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const stream = this.createElement('div', 'data-stream');
                stream.style.left = Math.random() * 100 + '%';
                stream.style.animationDelay = Math.random() * 3 + 's';
                stream.style.animationDuration = (2 + Math.random() * 2) + 's';
                container.appendChild(stream);

                // 循环创建
                setTimeout(() => {
                    if (this.currentTheme === 'cyberpunk') {
                        this.createDataStreams(container);
                    }
                }, 3000);
            }, i * 400);
        }
    }

    createDigitalRain(container) {
        // 清理旧的数字雨元素
        const oldRain = container.querySelectorAll('.digital-rain');
        oldRain.forEach(rain => rain.remove());

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const rain = this.createElement('div', 'digital-rain');
                rain.style.left = Math.random() * 100 + '%';
                rain.textContent = characters[Math.floor(Math.random() * characters.length)];
                rain.style.animationDuration = (3 + Math.random() * 2) + 's';
                rain.style.fontSize = (10 + Math.random() * 10) + 'px';
                container.appendChild(rain);

                // 循环创建
                setTimeout(() => {
                    if (this.currentTheme === 'cyberpunk') {
                        this.createDigitalRain(container);
                    }
                }, 4000);
            }, i * 200);
        }
    }

    startCyberpunkAnimation() {
        if (this.currentTheme !== 'cyberpunk') return;

        // 添加随机闪烁效果
        if (Math.random() < 0.1) {
            const glitch = this.effects.cyberpunk?.glitch;
            if (glitch) {
                glitch.style.opacity = Math.random() * 0.5 + 0.1;
                setTimeout(() => {
                    if (glitch) {
                        glitch.style.opacity = '1';
                    }
                }, 100);
            }
        }

        this.animationFrame = requestAnimationFrame(() => this.startCyberpunkAnimation());
    }

    // ========== 魔法特效 ==========
    createMagicEffects() {
        const container = this.createEffectContainer('magic-effects');

        // 创建星空背景
        const starfield = this.createElement('div', 'magic-starfield');
        container.appendChild(starfield);

        // 创建星星
        this.createMagicStars(starfield);

        // 创建魔法光圈
        this.createMagicCircles(container);

        // 创建魔法符文
        this.createMagicRunes(container);

        // 创建流星
        this.createMagicMeteors(container);

        // 创建魔法雾气
        this.createMagicFog(container);

        this.effects.magic = {
            container,
            starfield
        };

        // 启动动画循环
        this.startMagicAnimation();
    }

    createMagicStars(starfield) {
        for (let i = 0; i < 50; i++) {
            const star = this.createElement('div', 'magic-star');
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (2 + Math.random() * 2) + 's';
            starfield.appendChild(star);
        }
    }

    createMagicCircles(container) {
        for (let i = 0; i < 3; i++) {
            const circle = this.createElement('div', 'magic-circle');
            circle.style.left = '50%';
            circle.style.top = '50%';
            circle.style.transform = 'translate(-50%, -50%)';
            container.appendChild(circle);
        }
    }

    createMagicRunes(container) {
        const runes = ['◈', '◉', '◎', '○', '●', '◐', '◑', '◒', '◓'];

        for (let i = 0; i < 6; i++) {
            const rune = this.createElement('div', 'magic-rune');
            rune.style.left = Math.random() * 80 + 10 + '%';
            rune.style.top = Math.random() * 80 + 10 + '%';
            rune.textContent = runes[Math.floor(Math.random() * runes.length)];
            rune.style.animationDelay = Math.random() * 6 + 's';
            rune.style.animationDuration = (4 + Math.random() * 4) + 's';
            container.appendChild(rune);
        }
    }

    createMagicMeteors(container) {
        // 清理旧的流星元素
        const oldMeteors = container.querySelectorAll('.magic-meteor');
        oldMeteors.forEach(meteor => meteor.remove());

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const meteor = this.createElement('div', 'magic-meteor');
                meteor.style.left = Math.random() * 100 + '%';
                meteor.style.top = '-100px';
                meteor.style.animationDuration = (2 + Math.random() * 2) + 's';
                container.appendChild(meteor);

                // 循环创建
                setTimeout(() => {
                    if (this.currentTheme === 'magic') {
                        this.createMagicMeteors(container);
                    }
                }, 3000);
            }, i * 1000);
        }
    }

    createMagicFog(container) {
        for (let i = 0; i < 4; i++) {
            const fog = this.createElement('div', 'magic-fog');
            fog.style.left = Math.random() * 80 + 10 + '%';
            fog.style.top = Math.random() * 80 + 10 + '%';
            fog.style.animationDelay = Math.random() * 8 + 's';
            fog.style.animationDuration = (6 + Math.random() * 4) + 's';
            container.appendChild(fog);
        }
    }

    startMagicAnimation() {
        if (this.currentTheme !== 'magic') return;

        // 添加随机星星闪烁
        const stars = this.effects.magic?.starfield?.querySelectorAll('.magic-star');
        if (stars && Math.random() < 0.2) {
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            if (randomStar) {
                randomStar.style.transform = 'scale(' + (1 + Math.random() * 2) + ')';
                setTimeout(() => {
                    randomStar.style.transform = 'scale(1)';
                }, 300);
            }
        }

        this.animationFrame = requestAnimationFrame(() => this.startMagicAnimation());
    }

    // ========== 迪斯科特效 ==========
    createDiscoEffects() {
        const container = this.createEffectContainer('disco-effects');

        // 创建迪斯科球
        const discoBall = this.createElement('div', 'disco-ball');
        container.appendChild(discoBall);

        // 创建光束
        this.createDiscoBeams(container);

        // 创建地板光斑
        this.createDiscoFloorSpots(container);

        // 创建彩色烟雾
        this.createDiscoSmoke(container);

        // 创建脉冲光圈
        this.createDiscoPulses(container);

        this.effects.disco = {
            container,
            discoBall
        };

        // 启动动画循环
        this.startDiscoAnimation();
    }

    createDiscoBeams(container) {
        for (let i = 0; i < 8; i++) {
            const beam = this.createElement('div', 'disco-beam');
            container.appendChild(beam);
        }
    }

    createDiscoFloorSpots(container) {
        const colors = [
            'rgba(240, 147, 251, 0.6)',
            'rgba(245, 87, 108, 0.6)',
            'rgba(79, 172, 254, 0.6)',
            'rgba(0, 242, 254, 0.6)',
            'rgba(255, 215, 0, 0.6)',
            'rgba(255, 0, 110, 0.6)'
        ];

        for (let i = 0; i < 12; i++) {
            const spot = this.createElement('div', 'disco-floor-spot');
            spot.style.left = Math.random() * 100 + '%';
            spot.style.background = colors[i % colors.length];
            spot.style.animationDelay = Math.random() * 2 + 's';
            spot.style.animationDuration = (1 + Math.random() * 2) + 's';
            container.appendChild(spot);
        }
    }

    createDiscoSmoke(container) {
        const colors = [
            'rgba(240, 147, 251, 0.4)',
            'rgba(245, 87, 108, 0.4)',
            'rgba(79, 172, 254, 0.4)',
            'rgba(0, 242, 254, 0.4)'
        ];

        for (let i = 0; i < 6; i++) {
            const smoke = this.createElement('div', 'disco-smoke');
            smoke.style.left = Math.random() * 80 + 10 + '%';
            smoke.style.bottom = '0';
            smoke.style.background = `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`;
            smoke.style.animationDelay = Math.random() * 6 + 's';
            smoke.style.animationDuration = (4 + Math.random() * 4) + 's';
            container.appendChild(smoke);
        }
    }

    createDiscoPulses(container) {
        for (let i = 0; i < 2; i++) {
            const pulse = this.createElement('div', 'disco-pulse');
            pulse.style.animationDelay = i * 1.5 + 's';
            container.appendChild(pulse);
        }
    }

    startDiscoAnimation() {
        if (this.currentTheme !== 'disco') return;

        // 添加随机光斑闪烁
        const spots = this.effects.disco?.container?.querySelectorAll('.disco-floor-spot');
        if (spots && Math.random() < 0.3) {
            const randomSpot = spots[Math.floor(Math.random() * spots.length)];
            if (randomSpot) {
                randomSpot.style.transform = 'scale(' + (1.2 + Math.random() * 0.5) + ')';
                setTimeout(() => {
                    randomSpot.style.transform = 'scale(1)';
                }, 200);
            }
        }

        this.animationFrame = requestAnimationFrame(() => this.startDiscoAnimation());
    }

    // ========== 工具方法 ==========
    createEffectContainer(className) {
        const container = this.createElement('div', className);
        this.effectsContainer.appendChild(container);
        return container;
    }

    createElement(tagName, className) {
        const element = document.createElement(tagName);
        element.className = className;
        return element;
    }

    handleResize() {
        // 重新计算特效位置
        if (this.currentTheme !== 'default') {
            this.switchTheme(this.currentTheme);
        }
    }
}

// ========== 初始化和事件绑定 ==========
document.addEventListener('DOMContentLoaded', () => {
    // 创建背景特效管理器
    window.backgroundEffects = new BackgroundEffects();

    // 重写主题切换函数以触发特效
    const originalSwitchTheme = window.switchTheme || function() {};
    window.switchTheme = function(theme) {
        // 调用原始函数
        originalSwitchTheme(theme);

        // 触发特效切换事件
        const event = new CustomEvent('themeChange', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    };
});


// ========== 导出 ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundEffects;
}