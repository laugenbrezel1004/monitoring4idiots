use log::LevelFilter;
use simplelog::{Config, CombinedLogger, WriteLogger};
use std::fs::{self, OpenOptions};
use std::path::Path;

pub const PID_FILE: &str = "/var/run/monitoring4idiots.pid";
pub const LOG_FILE: &str = "/var/log/monitoring4idiots.log";
pub const STDOUT_FILE: &str = "/var/log/monitoring4idiots.out";
pub const STDERR_FILE: &str = "/var/log/monitoring4idiots.err";

pub fn init_logging() -> Result<(), String> {
    // Erstelle das Verzeichnis für Logdateien, falls es nicht existiert
    if let Some(parent) = Path::new(LOG_FILE).parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create log directory: {}", e))?;
    }

    // Erstelle die Logdatei
    let log_file = OpenOptions::new()
        .write(true)
        .create(true)
        .append(true)
        .open(LOG_FILE)
        .map_err(|e| format!("Failed to open log file: {}", e))?;

    // Initialisiere Logger
    CombinedLogger::init(vec![WriteLogger::new(
        LevelFilter::Info,
        Config::default(),
        log_file,
    )])
        .map_err(|e| format!("Failed to initialize logger: {}", e))?;

    Ok(())
}