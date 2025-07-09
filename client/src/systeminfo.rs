use log::info;
use serde_json::json;
use std::thread::sleep;
use std::time::Duration;
use sysinfo::{Disks, Networks, System};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum SystemInfoError {
    #[error("Failed to write system info: {0}")]
    WriteError(String),
}

pub fn run() -> Result<(), SystemInfoError> {
    let mut sys = System::new_all();
    sys.refresh_all();

    let disks = Disks::new_with_refreshed_list();
    let disk_info: Vec<_> = disks
        .iter()
        .map(|disk| {
            json!({
                "name": disk.name().to_string_lossy(),
                "mount_point": disk.mount_point().to_string_lossy(),
                "total_space": disk.total_space(),
                "available_space": disk.available_space(),
            })
        })
        .collect();

    let networks = Networks::new_with_refreshed_list();
    let network_info: Vec<_> = networks
        .iter()
        .map(|(name, data)| {
            json!({
                "interface": name,
                "received": data.total_received(),
                "transmitted": data.total_transmitted(),
            })
        })
        .collect();

    let payload = json!({
        "system": {
            "name": System::name().unwrap_or_default(),
            "kernel_version": System::kernel_version().unwrap_or_default(),
            "os_version": System::os_version().unwrap_or_default(),
            "host_name": System::host_name().unwrap_or_default(),
            "cpus": sys.cpus().len(),
        },
        "memory": {
            "total_memory": sys.total_memory(),
            "used_memory": sys.used_memory(),
            "total_swap": sys.total_swap(),
            "used_swap": sys.used_swap(),
        },
        "disks": disk_info,
        "networks": network_info,
    });

    // Schreibe JSON in Log
    info!(
        "System info: {}",
        serde_json::to_string_pretty(&payload)
            .map_err(|e| SystemInfoError::WriteError(format!("Failed to serialize JSON: {}", e)))?
    );

    sleep(Duration::from_secs(5));
    Ok(())
}