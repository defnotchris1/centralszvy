var iframe = document.getElementById("iframe");
    
function fullscreen() {
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
}

document.getElementById("reloadbtn").onclick = function() { 
    iframe.src = iframe.src; 
};

function getUrlParameter(name) {
    var regex = new RegExp('[?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
}

async function fetchGameData() {
    try {
        const urlValue = getUrlParameter('url');
        if (!urlValue) return;

        let response = await fetch('/json/gg.json');
        let data = await response.json();
        let game = data.find(game => game.url === urlValue);

        if (!game) {
            response = await fetch('/json/tstststststststststststststststststststststststs.json');
            data = await response.json();
            game = data.find(game => game.url === urlValue);
        }

        if (game && game.alt) {
            document.getElementById("titletext").textContent = game.alt;
        }
    } catch (error) {
        console.error("Error fetching JSON:", error);
    }
}

const currentDomain = window.location.hostname;
var url = getUrlParameter('url');
if (url) {
    url = url.replace(/^https?:\/\/[^\/]+/, '');
    url = url.replace(/%2F/g, "/");
    iframe.src = `${url}`;
    fetchGameData();
}

document.getElementById("downloadbtn").addEventListener("click", function() {
    let path = "";

    const urlParam = getUrlParameter('url');
    if (urlParam) {
        path = urlParam.replace(/^https?:\/\/[^\/]+/, '');
        path = path.replace(/%2F/g, "/");
    }

    const htmlContent = `<!DOCTYPE html>
<html style="height: 100%;">
<head>
<title></title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
    color: #333;
}

iframe {
    border: none;
    width: 100%;
    height: 100%;
    display: block;
}

.button-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
}

.button {
    padding: 12px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Poppins', sans-serif;
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.button:active {
    transform: translateY(0);
}

.settings-btn {
    background-color: #4CAF50;
    color: white;
}

.discord-btn {
    background-color: #7289DA;
    color: white;
    text-decoration: none;
    text-align: center;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.active {
    display: flex;
    opacity: 1;
}

.modal-content {
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-20px);
    transition: transform 0.3s ease;
}

.modal.active .modal-content {
    transform: translateY(0);
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    font-family: 'Poppins', sans-serif;
}

.modal-body {
    padding: 20px;
}

.setting-item {
    margin-bottom: 20px;
}

.setting-title {
    font-weight: 600;
    margin-bottom: 10px;
    display: block;
    color: #2c3e50;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #4CAF50;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

select, input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-top: 5px;
    font-family: inherit;
}

select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 1em;
}

.tab-cloak-preview {
    margin-top: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 6px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.tab-cloak-preview img {
    width: 16px;
    height: 16px;
}

.save-btn {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    margin-top: 20px;
    transition: background-color 0.3s;
    font-family: 'Poppins', sans-serif;
}

.save-btn:hover {
    background-color: #3e8e41;
}

@media (max-width: 600px) {
    .modal-content {
        width: 95%;
    }
    
    .button {
        padding: 10px 15px;
        font-size: 13px;
    }
}

#szvycentral {
    color: white;
    background-color: black;
}
</style>
</head>
<body>
<iframe src="https://${currentDomain}${path}"></iframe>

<div class="button-container">
<a href="https://${currentDomain}">
    <button class="button" id="szvycentral">
        Powered By Szvy Central
    </button>
</a>
<button class="button settings-btn" id="settingsButton">
    ⚙️ Settings
</button>
<a href="https://discord.gg/szvy" target="_blank" class="button discord-btn">
    💬 Site Blocked? Join our Discord for more links - discord.gg/szvy
</a>
</div>

<div class="modal" id="settingsModal">
<div class="modal-content">
    <div class="modal-header">
        <h2 class="modal-title">Settings</h2>
        <button class="close-btn" id="closeModal">&times;</button>
    </div>
    <div class="modal-body">
        <div class="setting-item">
            <span class="setting-title">Anti Leave</span>
            <label class="toggle-switch">
                <input type="checkbox" id="antiLeave">
                <span class="slider"></span>
            </label>
            <p style="margin-top: 5px; font-size: 0.9rem; color: #666;">Prevents teachers from closing your tab</p>
        </div>
        
        <div class="setting-item">
            <span class="setting-title">Tab Cloak</span>
            <select id="tabCloak">
                <option value="none">None (Default)</option>
                <option value="google">Google</option>
                <option value="youtube">YouTube</option>
                <option value="docs">Google Docs</option>
            </select>
            <div class="tab-cloak-preview" id="tabCloakPreview">
                <img id="cloakFavicon" src="" alt="">
                <span id="cloakTitle">Current tab title</span>
            </div>
        </div>
        
        <button class="save-btn" id="saveSettings">Save Settings</button>
    </div>
</div>
</div>

<script>
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const saveSettings = document.getElementById('saveSettings');

const antiLeave = document.getElementById('antiLeave');
const tabCloak = document.getElementById('tabCloak');
const tabCloakPreview = document.getElementById('tabCloakPreview');
const cloakFavicon = document.getElementById('cloakFavicon');
const cloakTitle = document.getElementById('cloakTitle');

const originalTitle = document.title;
const originalFavicon = document.querySelector("link[rel*='icon']")?.href || '';

const cloakPresets = {
    none: { title: originalTitle, icon: originalFavicon },
    google: { 
        title: 'calculator - Google Search', 
        icon: 'https://www.google.com/favicon.ico' 
    },
    youtube: { 
        title: 'YouTube', 
        icon: 'https://www.youtube.com/favicon.ico' 
    },
    docs: { 
        title: 'My Drive - Google Drive', 
        icon: 'https://docs.google.com/favicon.ico' 
    }
};

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('iframeSettings')) || {};
    
    if (settings.antiLeave !== undefined) {
        antiLeave.checked = settings.antiLeave;
    }
    
    if (settings.tabCloak) {
        tabCloak.value = settings.tabCloak;
        updateTabCloakPreview(settings.tabCloak);
    }
    
    if (antiLeave.checked) {
        enableAntiLeave();
    }
    
    if (settings.tabCloak && settings.tabCloak !== 'none') {
        applyTabCloak(settings.tabCloak);
    }
}

function saveSettingsToStorage() {
    const settings = {
        antiLeave: antiLeave.checked,
        tabCloak: tabCloak.value
    };
    
    localStorage.setItem('iframeSettings', JSON.stringify(settings));
    
    if (antiLeave.checked) {
        enableAntiLeave();
    } else {
        disableAntiLeave();
    }
    
    applyTabCloak(tabCloak.value);
    
    const originalText = saveSettings.textContent;
    saveSettings.textContent = 'Saved!';
    setTimeout(() => {
        saveSettings.textContent = originalText;
    }, 2000);
}

function enableAntiLeave() {
    window.onbeforeunload = function() {
        return 'Are you sure you want to leave?';
    };
}

function disableAntiLeave() {
    window.onbeforeunload = null;
}

function updateTabCloakPreview(value) {
    const preset = cloakPresets[value];
    if (preset) {
        if (preset.icon) {
            cloakFavicon.src = preset.icon;
            cloakFavicon.style.display = 'block';
        } else {
            cloakFavicon.style.display = 'none';
        }
        cloakTitle.textContent = preset.title;
    }
}

function applyTabCloak(value) {
    const preset = cloakPresets[value];
    if (preset) {
        document.title = preset.title;
        let link = document.querySelector("link[rel*='icon']");
        
        if (preset.icon) {
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = preset.icon;
        } else if (link) {
            link.remove();
        }
    }
}

settingsButton.addEventListener('click', () => {
    settingsModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    settingsModal.classList.remove('active');
});

saveSettings.addEventListener('click', () => {
    saveSettingsToStorage();
    setTimeout(() => {
        settingsModal.classList.remove('active');
    }, 2000);
});

tabCloak.addEventListener('change', () => {
    updateTabCloakPreview(tabCloak.value);
});

settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
    }
});

loadSettings();
updateTabCloakPreview(tabCloak.value);
</script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'szvy_central_local' + (path ? '_' + path.replace(/\//g, '_') : '') + '.html';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    }, 100);
});