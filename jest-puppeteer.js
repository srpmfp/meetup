module.exports = {
    launch: {
        headless: process.env.HEADLESS !== "false",
        dumpio: true, // Show browser console logs
    },
    browserContext: "default", // Use "incognito" if you want isolated sessions per test
    server: {
        command: "node server.js",
        port: 4444,
        launchTimeout: 10000,
        debug: true,
    },
};