use crate::core;
use crate::systeminfo;
use daemonize::Daemonize;
use log::{error, info};
use std::fs::File;
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DaemonError {
    #[error("Daemon initialization failed: {0}")]
    InitError(String),
    #[error("System info collection failed: {0}")]
    SystemInfoError(#[from] systeminfo::SystemInfoError),
}

pub fn run_daemon() -> Result<(), DaemonError> {
    // Erstelle Ausgabedateien
    let stdout_file = File::create(core::STDOUT_FILE)
        .map_err(|e| DaemonError::InitError(format!("Failed to create stdout file: {}", e)))?;
    let stderr_file = File::create(core::STDERR_FILE)
        .map_err(|e| DaemonError::InitError(format!("Failed to create stderr file: {}", e)))?;

    // Konfiguriere Daemon
    let daemonize = Daemonize::new()
        .pid_file(core::PID_FILE)
        .chown_pid_file(true)
        .working_directory("/tmp")
        .user("monitoring4idiots")
        .group("monitoring4idiots")
        .umask(0o027)
        .stdout(stdout_file)
        .stderr(stderr_file)
        .privileged_action(|| info!("Executed before dropping privileges"));

    // Starte Daemon
    daemonize
        .start()
        .map_err(|e| DaemonError::InitError(format!("Failed to start daemon: {}", e)))?;

    info!("Daemon started successfully");

    // Signalhandling
    let term = Arc::new(AtomicBool::new(false));
    signal_hook::flag::register(signal_hook::consts::SIGTERM, Arc::clone(&term))
        .map_err(|e| DaemonError::InitError(format!("Failed to register SIGTERM: {}", e)))?;
    signal_hook::flag::register(signal_hook::consts::SIGHUP, Arc::clone(&term))
        .map_err(|e| DaemonError::InitError(format!("Failed to register SIGHUP: {}", e)))?;

    // Hauptlogik
    while !term.load(Ordering::Relaxed) {
        systeminfo::run();
    }

    info!("Daemon shutting down");
    Ok(())
}
