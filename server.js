const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const si = require('systeminformation');
const os = require('os');
const homeDir = os.homedir();
const app = express();
const port = 2828;




const apps = {
    google: 'start chrome',
    discord: `start "" "${homeDir}\\AppData\\Local\\Discord\\Update.exe"`,
    rockstar: `start "" "C:\\Program Files\\Rockstar Games\\Launcher\\LauncherPatcher.exe"`,
    steam: `start "" "C:\\Program Files (x86)\\Steam\\steam.exe"`,
    epic: `start "" "C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win32\\EpicGamesLauncher.exe"`,
    ubisoft: `start "" "C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\UbisoftConnect.exe"`,
    spotify: `start "" "${homeDir}\\AppData\\Roaming\\Spotify\\Spotify.exe"`,
    edge: `start "" "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`,
    youtube: 'start "" "https://www.youtube.com/"',
    twitch: 'start "" "https://www.twitch.tv/"'
};


app.use(express.static(path.join(__dirname, 'public')));

// Route to shutdown the computer
app.post('/shutdown', (req, res) => {
    exec('shutdown /s /t 0', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error shutting down: ${error.message}`);
            return res.status(500).send('Error shutting down the computer');
        }
        res.send('Shutting down...');
    });
});

// Route to restart the computer
app.post('/restart', (req, res) => {
    exec('shutdown /r /t 0', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error restarting: ${error.message}`);
            return res.status(500).send('Error restarting the computer');
        }
        res.send('Restarting...');
    });
});

// Route to lock the computer
app.post('/lock', (req, res) => {
    exec('rundll32.exe user32.dll,LockWorkStation', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error locking computer: ${error.message}`);
            return res.status(500).send('Error locking the computer');
        }
        res.send('Locking computer...');
    });
});

// Route to open Microsoft Edge and load ChatGPT
app.post('/open-chatgpt', (req, res) => {
    exec('start msedge "https://chat.openai.com"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening Microsoft Edge: ${error.message}`);
            return res.status(500).send('Error opening Microsoft Edge');
        }
        res.send('Opening Microsoft Edge to ChatGPT...');
    });
});



app.get('/openApp', (req, res) => {
    const appName = req.query.name;
    const command = apps[appName];
   

    if (command) {
        exec(command, (err) => {
            if (err) {
                console.error(`Failed to open ${appName}:`, err);
                res.status(500).send('Failed to open app');
            } else {
                console.log(`${appName} opened successfully`);
                res.send('App opened successfully');
            }
        });
    } else {
        res.status(400).send('Unknown app');
    }
});

// Function to get local IPv4 address
function getLocalIPv4() {
    const ifaces = os.networkInterfaces();

    // Iterate over interfaces
    for (const ifaceName in ifaces) {
        const iface = ifaces[ifaceName];

        // Iterate over addresses for the interface
        for (let i = 0; i < iface.length; i++) {
            const { address, family, internal } = iface[i];
            
            // Check for IPv4 address and non-internal (external) address
            if (family === 'IPv4' && !internal) {
                return address;
            }
        }
    }

    return 'Unable to find IPv4 address';
}

app.listen(port, () => {
    const localIPv4 = getLocalIPv4();
    console.log(`Server is running`);
    console.log(`you can now access the IDeck Interface on any device connected to your local network @ http://${localIPv4}:${port}`);
    console.log(`\x1b[31mOpening the port ${port} exposes this application to the internet, potentially allowing unauthorized users or malicious actors to access this application we are not responsible for any damages due to negligence of this information\x1b[0m`);
});

