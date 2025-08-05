// Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupParallaxEffect();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupParallaxEffect() {
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                heroVisual.style.transform = `translateY(${rate}px)`;
            });
        }
    }
}

// Download Manager
class DownloadManager {
    constructor() {
        this.files = {
            'Kaerlin.discord.theme.zip': {
                url: 'https://github.com/Demon675/Kaerlin.discordtheme/releases/download/v.1.0.0/Kaerlin.discord.theme.zip',
                filename: 'Kaerlin.discord.theme.zip',
                size: '15 KB'
            }
        };
    }

    async downloadFile(filename) {
        const file = this.files[filename];
        if (!file) {
            console.error('File not found:', filename);
            return;
        }

        this.showDownloadProgress();
        
        try {
            // Simulate download progress
            await this.simulateDownload();
            
            // Create download link
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.filename;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.hideDownloadProgress();
            this.showSuccessMessage(filename);
            
        } catch (error) {
            console.error('Download failed:', error);
            this.hideDownloadProgress();
            this.showErrorMessage();
        }
    }

    async simulateDownload() {
        const progressBar = document.querySelector('.progress-fill');
        const duration = 2000; // 2 seconds
        const steps = 100;
        const stepDuration = duration / steps;

        for (let i = 0; i <= steps; i++) {
            await new Promise(resolve => setTimeout(resolve, stepDuration));
            if (progressBar) {
                progressBar.style.width = `${i}%`;
            }
        }
    }

    showDownloadProgress() {
        const progress = document.getElementById('downloadProgress');
        if (progress) {
            progress.style.display = 'block';
        }
    }

    hideDownloadProgress() {
        const progress = document.getElementById('downloadProgress');
        if (progress) {
            progress.style.display = 'none';
        }
    }

    showSuccessMessage(filename) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="message-content">
                <h3>✓ Download successful!</h3>
                <p>${filename} has been downloaded.</p>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.innerHTML = `
            <div class="message-content">
                <h3>✗ Download failed</h3>
                <p>Please try again.</p>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    previewTheme() {
        // Create modal for theme preview
        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Kaerlin Theme Preview</h3>
                <div class="preview-container">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMTExIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI3MiIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iNzIiIHk9IjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTgxODE4Ii8+CjxyZWN0IHg9IjgwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzAwZmY0MSIgcng9IjgiLz4KPHJlY3QgeD0iODAiIHk9IjEwMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzMzMzMyIgcng9IjQiLz4KPHJlY3QgeD0iODAiIHk9IjEzMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzMzMzMyIgcng9IjQiLz4KPHJlY3QgeD0iODAiIHk9IjE2MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzMzMzMyIgcng9IjQiLz4KPC9zdmc+" alt="Kaerlin Theme Preview" class="preview-image">
                    <p>The Kaerlin Theme uses a dark color scheme with green accents for a modern, minimalist appearance. The theme optimizes the Discord interface with clean lines and a professional look.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
}

// Utility Functions
function scrollToPreview() {
    const previewSection = document.getElementById('preview');
    if (previewSection) {
        previewSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    window.downloadManager = new DownloadManager();
    
    // Add CSS for success/error messages and modal
    const style = document.createElement('style');
    style.textContent = `
        .success-message, .error-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        }
        
        .success-message {
            background: linear-gradient(135deg, #00ff41, #00cc33);
            color: #000;
            border: 1px solid #00ff41;
        }
        
        .error-message {
            background: linear-gradient(135deg, #ff4444, #cc0000);
            color: white;
            border: 1px solid #ff4444;
        }
        
        .preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: #111;
            border: 1px solid #00ff41;
            border-radius: 16px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            color: #e0e0e0;
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            cursor: pointer;
            color: #00ff41;
        }
        
        .preview-image {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #00ff41;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Global functions for HTML onclick handlers
window.downloadFile = (filename) => {
    if (window.downloadManager) {
        window.downloadManager.downloadFile(filename);
    }
};

window.previewTheme = () => {
    if (window.downloadManager) {
        window.downloadManager.previewTheme();
    }
};

window.scrollToPreview = scrollToPreview;
window.scrollToFeatures = scrollToFeatures;
