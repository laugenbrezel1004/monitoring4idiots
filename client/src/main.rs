use crate::daemon::run_daemon;
use log::error;

mod core;
mod daemon;
mod systeminfo;

fn main() {
    // Initialisiere Logging
    if let Err(e) = core::init_logging() {
        eprintln!("Failed to initialize logging: {}", e);
        std::process::exit(1);
    }

    // Starte den Daemon
    if let Err(e) = run_daemon() {
        error!("Daemon failed: {}", e);
        std::process::exit(1);
    }
}