use json::object;
use std::thread::sleep;
use std::time::Duration;
use sysinfo::{Components, Disks, Networks, System};
pub fn run() {
    loop {
        let mut sys = System::new();

        sys.refresh_all();

        // Display processes ID, name and disk usage:
        //for (pid, process) in sys.processes() {
        //  println!("[{pid}] {:?} {:?}", process.name(), process.disk_usage());
        //}

        // We display all disks' information:
        println!("=> disks:");
        let disks = Disks::new_with_refreshed_list();
        for disk in &disks {
            println!("{disk:?}");
        }

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

        let payload_disks = object! {

        }
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

        sleep(Duration::from_secs(5));
    }
}
