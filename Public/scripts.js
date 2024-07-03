function openApp(appName) {
    fetch(`/openApp?name=${appName}`)
        .then(response => {
            if (response.ok) {
                console.log(`${appName} opened successfully`);
            } else {
                console.error(`Failed to open ${appName}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const day = now.getDate();
    const dayWithSuffix = day + getOrdinalSuffix(day);
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const weekday = now.toLocaleString('default', { weekday: 'long' });
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const dateString = `${weekday} ${dayWithSuffix} ${month} ${year}`;

    document.getElementById('time').innerText = timeString;
    document.getElementById('date').innerText = dateString;

    if ((hours >= 4 && hours < 8) || (hours === 8 && minutes <= 45)) {
        document.body.style.backgroundImage = 'url("https://www.civitatis.com/blog/wp-content/uploads/2022/07/portada-atardecer-nueva-york-scaled.jpg")';
    } else if (hours >= 8 && hours < 21) {
        document.body.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/e/e5/NYC_Manhattan_Skyline.JPG")';
    } else if ((hours === 20 && minutes >= 0) || (hours >= 21 && hours < 22)) {
        document.body.style.backgroundImage = 'url("https://www.civitatis.com/blog/wp-content/uploads/2022/07/portada-atardecer-nueva-york-scaled.jpg")';
    } else {
        document.body.style.backgroundImage = 'url("https://hdqwalls.com/wallpapers/new-york-city-night-7p.jpg")';
    }
}

// Function to power down the computer
function powerDown() {
    fetch('/shutdown', { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to shut down');
            }
            console.log('Shutting down...');
            // Optionally, update UI or display message
        })
        .catch(error => {
            console.error('Error shutting down:', error);
            // Handle error, update UI, display message, etc.
        });
}

// Function to restart the computer
function restart() {
    fetch('/restart', { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to restart');
            }
            console.log('Restarting...');
            // Optionally, update UI or display message
        })
        .catch(error => {
            console.error('Error restarting:', error);
            // Handle error, update UI, display message, etc.
        });
}

// Function to lock the computer
function lock() {
    fetch('/lock', { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to lock the computer');
            }
            console.log('Locking computer...');
            // Optionally, update UI or display message
        })
        .catch(error => {
            console.error('Error locking computer:', error);
            // Handle error, update UI, display message, etc.
        });
}

// Function to open Microsoft Edge and load ChatGPT
function openChatGPT() {
    fetch('/open-chatgpt', { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to open Microsoft Edge');
            }
            console.log('Opening Microsoft Edge...');
            // Optionally, update UI or display message
        })
        .catch(error => {
            console.error('Error opening Microsoft Edge:', error);
            // Handle error, update UI, display message, etc.
        });
}

function fetchWeather() {
    fetch('https://wttr.in/Bolton?format=%C+%t')
        .then(response => response.text())
        .then(data => {
            document.getElementById('weather').innerText = data;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerText = 'Error fetching weather';
        });
}

fetchWeather();

// Initial update of time and date
setInterval(updateDateTime, 1000);

// Update weather data every 10 minutes
setInterval(fetchWeather, 600000); // Fetch every 10 minutes

updateDateTime();
