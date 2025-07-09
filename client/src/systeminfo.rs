use json::object;
use std::fs;
use std::fs::OpenOptions;
use std::io::Write;
use std::thread::sleep;
use std::time::Duration;
use log::warn;
use sysinfo::{Components, Disks, Networks, System};
pub fn run() -> Result<(), String> {
    loop {
        let mut sys = System::new();

        sys.refresh_all();

        // Display processes ID, name and disk usage:
        //for (pid, process) in sys.processes() {
        //  println!("[{pid}] {:?} {:?}", process.name(), process.disk_usage());
        //}

        let payload_systeminfo = object! {
          "system_name":  System::name(),
        "system_kernel_version": System::kernel_version(),
          "system_os_version": System::os_version(),
          "system_host_name": System::host_name(),
        "cpus": sys.cpus().len(),
        };

        let payload_ram = object! {
        "total_memory": sys.total_memory(),
        "used_memory": sys.used_memory(),
        "total_swap": sys.total_swap(),
        "used_swap": sys.used_swap(),
        };

        //TODO: Disks in array für json packen?
        //        let disks = Disks::new_with_refreshed_list();
        //        for disk in &disks {
        //            println!("{disk:?}");
        //        }
        //        let payload_disks = object! {
        //       }
        //  let payload_networks = object! {

        // Network interfaces name, total data received and total data transmitted:
        // let networks = Networks::new_with_refreshed_list();
        // println!("=> networks:");
        // for (interface_name, data) in &networks {
        //   println!(
        //     "{interface_name}: {} B (down) / {} B (up)",
        //   data.total_received(),
        // data.total_transmitted(),
        //  );
        // If you want the amount of data received/transmitted since last call
        // to `Networks::refresh`, use `received`/`transmitted`.
        //  }
        //  }

        let mut stdout_file = OpenOptions::new()
            .write(true) // Enable write mode
            .create(true) // Create the file if it doesn't exist
            .append(true) // Append instead of overwriting (optional, remove if you want to truncate)
            .open("/tmp/daemon.out")
            .map_err(|e| e.to_string())?;
        stdout_file.write(payload_systeminfo.to_string().as_bytes()).map_err(|e| e.to_string())?;
        sleep(Duration::from_secs(5));
    }
}
