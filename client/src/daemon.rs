use crate::core;
use crate::systeminfo;
use daemonize;
use daemonize::Daemonize;
use std::fs::File;

pub fn run_daemon() -> Result<(), String> {
    let stdout_file = File::create(core::STDOUT_FILE).map_err(|e| e.to_string())?;
    let stderr_file = File::create(core::STDERR_FILE).map_err(|e| e.to_string())?;

    let daemonize = Daemonize::new()
        .pid_file("/var/run/monitoring4idiots.pid") // Every method except `new` and `start`
        .chown_pid_file(true) // is optional, see `Daemonize` documentation
        .working_directory("/tmp") // for default behaviour.
        .user("nobody")
        .group("daemon") // Group name
        .group(2) // or group id.
        .umask(0o777) // Set umask, `0o027` by default.
        .stdout(stdout_file) // Redirect stdout to `/tmp/daemon.out`.
        .stderr(stderr_file) // Redirect stderr to `/tmp/daemon.err`.
        .privileged_action(|| "Executed before drop privileges");

    if let Err(e) = daemonize.start() {
        eprintln!("Error, {}", e);
    }
    systeminfo::run()?;
    Ok(())
}
