module.exports = {
    apps: [
        {
            name: "emaquis",
            script: "./bin/www",
            instances: 1,
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
                PORT: 3000,
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3000,
            },
            // Redémarrage automatique
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",

            // Gestion des erreurs et logs
            error_file: "./logs/err.log",
            out_file: "./logs/out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",

            // Stratégie de redémarrage
            max_restarts: 10,
            min_uptime: "10s",

            // Graceful shutdown
            kill_timeout: 5000,
            wait_ready: true,
            listen_timeout: 3000,

            // Événements
            events: {
                restart: "echo 'App restarted'",
                reload: "echo 'App reloaded'",
                stop: "echo 'App stopped'",
                exit: "echo 'App exited'",
                "restart overlimit": "echo 'PM2 restart overlimit'",
            },
        },
    ],

    deploy: {
        production: {
            user: "node",
            host: "your-host",
            ref: "origin/main",
            repo: "your-repo-url",
            path: "/var/www/emaquis",
            "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
        },
    },
};
