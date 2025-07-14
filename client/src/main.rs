use std::thread::sleep;
use std::time::Duration;
use log::error;

mod core;
//mod daemon;
mod systeminfo;

#[tokio::main]
async fn main() {
  // Initialisiere Logging
    /*
    if let Err(e) = core::init_logging() {
        eprintln!("Failed to initialize logging: {}", e);
        std::process::exit(1);
    }
     */

    // Prozess soll erst als Daemon laufen wenn grundlegende Funktionalitäten gegeben sind...
    // Starte den Daemon
    /*
    if let Err(e) = run_daemon() {
        error!("Daemon failed: {}", e);
        std::process::exit(1);
    }
*/
    loop {

        if let Err(e) = systeminfo::run().await{
            error!("{}", e);
            std::process::exit(1);
        }
        sleep(Duration::from_secs(5));
    }


}