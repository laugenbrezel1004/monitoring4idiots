use log::error;
use std::process;
mod systeminfo;
use systeminfo::run;

#[tokio::main]
async fn main() {
    // Initialisiere Logging
    /*
    if let Err(e) = core::init_logging() {
        eprintln!("Failed to initialize logging: {}", e);
        process::exit(1);
    }
    */

    // Rufe die run-Funktion auf
    if let Err(e) = run().await {
        error!("Error in systeminfo::run: {}", e);
        process::exit(1);
    }
}