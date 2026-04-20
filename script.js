const browserData = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenRes: `${window.screen.width}x${window.screen.height}`
};
localStorage.setItem('os_info', JSON.stringify(browserData));

window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    const storedData = JSON.parse(localStorage.getItem('os_info'));
    if (storedData) {
        const infoDiv = document.createElement('div');
        infoDiv.style.fontSize = '11px';
        infoDiv.style.marginTop = '15px';
        infoDiv.style.opacity = '0.6';
        infoDiv.innerText = `Інфо: ${storedData.userAgent} | Платформа: ${storedData.platform}`;
        footer.appendChild(infoDiv);
    }
});

async function loadComments() {
    const variant = 18;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`);
        const comments = await response.json();
        const section = document.createElement('section');
        section.innerHTML = '<h2>Відгуки роботодавців</h2>';
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.style.marginBottom = '20px';
            commentEl.style.padding = '15px';
            commentEl.style.background = 'rgba(255,255,255,0.05)';
            commentEl.style.borderRadius = '10px';
            commentEl.innerHTML = `<strong>${comment.name}</strong><br><small>${comment.email}</small><p style="margin-top:10px; font-style: italic;">${comment.body}</p>`;
            section.appendChild(commentEl);
        });
        document.getElementById('main-content').appendChild(section);
    } catch (error) {
        console.error('API Error:', error);
    }
}
loadComments();

setTimeout(() => {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'block';
}, 60000);

function updateTheme() {
    const hour = new Date().getHours();
    const isNight = hour < 7 || hour >= 21; 
    if (isNight) {
        document.body.classList.add('night-theme');
    } else {
        document.body.classList.remove('night-theme');
    }
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('night-theme');
});

updateTheme();