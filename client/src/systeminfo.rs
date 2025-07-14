use log::info;
use reqwest::Client;
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

pub async fn run() -> Result<(), String> {
    #[deprecated(since = "0.1.0", note = "Please use Client::builder()")]
    let client = Client::new();
    loop {
        let mut sys = System::new_all();
        sys.refresh_all();


        let payload_system = json!({
            "id": System::host_name(),
            "kernelVersion": System::kernel_version(),
            "osVersion": System::os_version(),
            });
        println!("{}", payload_system);


        let response = client
            .post("http://localhost:3000/api/data/system")
            .json(&payload_system)
            .send()
            .await.map_err(|e| e.to_string())?;

        // Überprüfe den Statuscode
        if response.status().is_success() {
            println!("Antwort: {:?}", response);
        } else {
            println!("Fehler: {:?}", response.text().await);
        }


        //TODO: Mehr umgebungsvarialben/ env file arbeiten in zukunft


       // sleep(Duration::from_secs(5));
    }
}
