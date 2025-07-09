mod systeminfo;
mod daemon;
mod core;

fn main() {

    if let Err(e)  = daemon::run_daemon() {
        eprintln!("error running daemon: {:?}", e);
    }
}

