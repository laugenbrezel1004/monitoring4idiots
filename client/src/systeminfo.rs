use log::info;
use reqwest::{Client, Response};
use serde_json::json;
use std::time::Duration;
use sysinfo::{Disks, Networks, System};
use thiserror::Error;
use tokio::time::sleep; // Verwende tokio::time::sleep statt std::thread::sleep

#[derive(Error, Debug)]
pub enum SystemInfoError {
    #[error("Failed to write system info: {0}")]
    WriteError(String),
}

pub async fn run() -> Result<(), String> {
    let api_data: String = String::from("http://localhost:3000/api/data");
    //TODO: api/hosts/register???
    loop {
        build_response(
            json!({
                "id": System::host_name().unwrap_or_default(),
                "kernelVersion": System::kernel_version().unwrap_or_default(),
                "osVersion": System::os_version().unwrap_or_default(),
            }),
            format!("{api_data}/system"),
        )
        .await;

        let mut sys = System::new_all();
        sys.refresh_all();

        build_response(
            json!({
                "id": System::host_name().unwrap_or_default(),
                "totalMemory": sys.total_memory(),
                "usedMemory": sys.used_memory(),
                "totalSwap": sys.total_swap(),
                "usedSwap": sys.used_swap(),
            }),
            format!("{api_data}/memory"),
        )
        .await;
        /*
                build_response(
                    json!({
                        "id": System::host_name().unwrap_or_default(),
                        "name":
                    }),
                    format!("{api_data}/interface"),
                ).await;

        */
        // Warte 5 Sekunden (asynchron)
        sleep(Duration::from_secs(5)).await;
    }

    // Unerreichbar wegen der unendlichen Schleife, aber für die Typenkorrektheit
    Ok(())
}

async fn build_response(payload: serde_json::Value, api: String) {
    let client = Client::new();

    match client
        .post(api)
        .json(&payload)
        .send()
        .await
        .map_err(|e| e.to_string())
    {
        Ok(response) => {
            println!("Response: {:?}", response);
        }
        Err(e) => {
            eprintln!("Error: {}", e);
        }
    }
}
