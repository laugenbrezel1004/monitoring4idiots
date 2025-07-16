# API Endpoints Documentation

This document provides a detailed overview of the API endpoints for managing system, memory, disk, and network interface information. Each endpoint is implemented using SvelteKit's server-side routing and interacts with a Prisma database. The endpoints handle POST requests to store data about hosts and their associated system metrics.

---

## General Information

- **Base URL**: `/api/data`
- **HTTP Method**: POST
- **Content-Type**: `application/json`
- **Authentication**: Not Implemented yet!
- **Common Parameters**:
    - `id` (string, required): Unique identifier for the host (hostname).
- **Response Format**:
    - Success: `{ type: 'success', data: {...} }` with HTTP status 200.
    - Error: `{ type: 'error', message: string }` with HTTP status 500.

Each endpoint follows a similar pattern:
1. Validates and extracts JSON data from the request body.
2. Upserts a `Host` record using the provided `id` (hostname).
3. Creates a new record in the respective table (`SystemInfo`, `MemoryInfo`, `DiskInfo`, or `InterfaceInfo`) linked to the host.
4. Returns the created record or an error response.

---

## Endpoints

### 1. System Information Endpoint

#### Overview
Stores system information (kernel and OS version) for a specific host.

- **Endpoint**: `/api/data/system`
- **Method**: POST

#### Parameters
- **Request Body** (JSON, required):
    - `id` (string, required): Unique identifier for the host (hostname).
    - `kernelVersion` (string, required): The kernel version of the system.
    - `osVersion` (string, required): The operating system version.

#### Response
- **Success** (HTTP 200):
  ```json
  {
    "type": "success",
    "data": {
      "hostId": string (uuid),
      "kernelVersion": string,
      "osVersion": string,
      "createdAt": string (ISO 8601),
      "updatedAt": string (ISO 8601)
    }
  }
  ```
- **Error** (HTTP 500):
    - `{ "type": "error", "message": "Couldn't upsert host!" }`: If the host upsert operation fails.
    - `{ "type": "error", "message": "Couldn't save data!" }`: If the system info creation fails (e.g., database error).

#### Example
**Request**:
```bash
curl -X POST http://localhost:3000/api/data/system \
-H "Content-Type: application/json" \
-d '{
  "id": "ubuntu",
  "kernelVersion": "5.15.0-73-generic",
  "osVersion": "Ubuntu 22.04 LTS"
}'
```

**Response (Success)**:
```json
{
  "type": "success",
  "data": {
    "hostId": "1ac0a2f4-785a-448a-998a-5c076d94b32d",
    "kernelVersion": "5.15.0-73-generic",
    "osVersion": "Ubuntu 22.04 LTS",
    "createdAt": "2025-07-16T14:01:00.000Z",
    "updatedAt": "2025-07-16T14:01:00.000Z"
  }
}
```

**Response (Error)**:
```json
{
  "type": "error",
  "message": "Couldn't save data!"
}
```

---
### 2. Processor Information Endpoint

#### Overview
Stores memory and swap usage information for a specific host.

- **Endpoint**: `/api/data/processor`
- **Method**: POST

#### Parameters
- **Request Body** (JSON, required):
  - `id` (string, required): Unique identifier for the host (hostname).
  - `cores` (number, required): Total amount of cores.
  - `usage` (number, required): Total cpu usage.

#### Response
- **Success** (HTTP 200):
  ```json
  {
    "type": "success",
    "data": {
      "hostId": string (uuid),
      "cores": number,
      "usage": number,
      "createdAt": string (ISO 8601),
      "updatedAt": string (ISO 8601)
    }
  }
  ```
- **Error** (HTTP 500):
  - `{ "type": "error", "message": "Couldn't upsert host!" }`: If the host upsert operation fails.
  - `{ "type": "error", "message": "Couldn't save data!" }`: If the memory info creation fails (e.g., database error).

#### Example
**Request**:
```bash
curl -X POST http://localhost:3000/api/data/processor \
-H "Content-Type: application/json" \
-d '{
  "id": "ubuntu",
  "cores": 32,
  "usage": 80,
}'
```

**Response (Success)**:
```json
{
  "type": "success",
  "data": {
    "hostId": "1ac0a2f4-785a-448a-998a-5c076d94b32d",
    "cores": 32,
    "usage": 80,
    "createdAt": "2025-07-16T14:01:00.000Z",
    "updatedAt": "2025-07-16T14:01:00.000Z"
  }
}
```

**Response (Error)**:
```json
{
  "type": "error",
  "message": "Couldn't save data!"
}
```

---

### 3. Memory Information Endpoint

#### Overview
Stores memory and swap usage information for a specific host.

- **Endpoint**: `/api/data/memory`
- **Method**: POST

#### Parameters
- **Request Body** (JSON, required):
    - `id` (string, required): Unique identifier for the host (hostname).
    - `totalMemory` (number, required): Total memory in bytes.
    - `usedMemory` (number, required): Used memory in bytes.
    - `totalSwap` (number, required): Total swap space in bytes.
    - `usedSwap` (number, required): Used swap space in bytes.

#### Response
- **Success** (HTTP 200):
  ```json
  {
    "type": "success",
    "data": {
      "hostId": string (uuid),
      "totalMemory": number,
      "usedMemory": number,
      "availableMemory": number,
      "totalSwap": number,
      "usedSwap": number,
      "availableSwap": number,
      "createdAt": string (ISO 8601),
      "updatedAt": string (ISO 8601)
    }
  }
  ```
- **Error** (HTTP 500):
    - `{ "type": "error", "message": "Couldn't upsert host!" }`: If the host upsert operation fails.
    - `{ "type": "error", "message": "Couldn't save data!" }`: If the memory info creation fails (e.g., database error).

#### Example
**Request**:
```bash
curl -X POST http://localhost:3000/api/data/memory \
-H "Content-Type: application/json" \
-d '{
  "id": "ubuntu",
  "totalMemory": 8000000000,
  "usedMemory": 4000000000,
  "totalSwap": 2000000000,
  "usedSwap": 500000000
}'
```

**Response (Success)**:
```json
{
  "type": "success",
  "data": {
    "hostId": "1ac0a2f4-785a-448a-998a-5c076d94b32d",
    "totalMemory": 8000000000,
    "usedMemory": 4000000000,
    "availableMemory": 4000000000,
    "totalSwap": 2000000000,
    "usedSwap": 500000000,
    "availableSwap": 1500000000,
    "createdAt": "2025-07-16T14:01:00.000Z",
    "updatedAt": "2025-07-16T14:01:00.000Z"
  }
}
```

**Response (Error)**:
```json
{
  "type": "error",
  "message": "Couldn't save data!"
}
```

---

### 4. Disk Information Endpoint

#### Overview
Stores disk usage information for a specific host.

- **Endpoint**: `/api/data/disk`
- **Method**: POST

#### Parameters
- **Request Body** (JSON, required):
    - `id` (string, required): Unique identifier for the host (hostname).
    - `name` (string, required): Name of the disk (e.g., `/dev/sda1`).
    - `mountPoint` (string, required): Mount point of the disk (e.g., `/`).
    - `totalSpace` (number, required): Total disk space in bytes.
    - `availableSpace` (number, required): Available disk space in bytes.

#### Response
- **Success** (HTTP 200):
  ```json
  {
    "type": "success",
    "data": {
      "hostId": string (uuid),
      "name": string,
      "mountPoint": string,
      "totalSpace": number,
      "availableSpace": number,
      "createdAt": string (ISO 8601),
      "updatedAt": string (ISO 8601)
    }
  }
  ```
- **Error** (HTTP 500):
    - `{ "type": "error", "message": "Couldn't upsert host!" }`: If the host upsert operation fails.
    - `{ "type": "error", "message": "Couldn't save data!" }`: If the disk info creation fails (e.g., database error).

#### Example
**Request**:
```bash
curl -X POST http://localhost:3000/api/data/disk \
-H "Content-Type: application/json" \
-d '{
  "id": "ubuntu",
  "name": "/dev/sda1",
  "mountPoint": "/",
  "totalSpace": 100000000000,
  "availableSpace": 50000000000
}'
```

**Response (Success)**:
```json
{
  "type": "success",
  "data": {
    "hostId": "1ac0a2f4-785a-448a-998a-5c076d94b32d",
    "name": "/dev/sda1",
    "mountPoint": "/",
    "totalSpace": 100000000000,
    "availableSpace": 50000000000,
    "createdAt": "2025-07-16T14:01:00.000Z",
    "updatedAt": "2025-07-16T14:01:00.000Z"
  }
}
```

**Response (Error)**:
```json
{
  "type": "error",
  "message": "Couldn't save data!"
}
```

---

### 5. Network Interface Information Endpoint

#### Overview
Stores network interface data (received and transmitted) for a specific host.

- **Endpoint**: `/api/data/interface`
- **Method**: POST

#### Parameters
- **Request Body** (JSON, required):
    - `id` (string, required): Unique identifier for the host (hostname).
    - `name` (string, required): Name of the network interface (e.g., `eth0`).
    - `dataReceived` (number, required): Data received in bytes.
    - `dataTransmitted` (number, required): Data transmitted in bytes.

#### Response
- **Success** (HTTP 200):
  ```json
  {
    "type": "success",
    "data": {
      "hostId": string (uuid),
      "name": string,
      "dataReceived": number,
      "dataTransmitted": number,
      "createdAt": string (ISO 8601),
      "updatedAt": string (ISO 8601)
    }
  }
  ```
- **Error** (HTTP 500):
    - `{ "type": "error", "message": "Couldn't upsert host!" }`: If the host upsert operation fails.
    - `{ "type": "error", "message": "Couldn't save data!" }`: If the interface info creation fails (e.g., database error).

#### Example
**Request**:
```bash
curl -X POST http://localhost:3000/api/data/interface \
-H "Content-Type: application/json" \
-d '{
  "id": "ubuntu",
  "name": "eth0",
  "dataReceived": 1000000,
  "dataTransmitted": 2000000
}'
```

**Response (Success)**:
```json
{
  "type": "success",
  "data": {
    "hostId": "1ac0a2f4-785a-448a-998a-5c076d94b32d",
    "name": "eth0",
    "dataReceived": 1000000,
    "dataTransmitted": 2000000,
    "createdAt": "2025-07-16T14:01:00.000Z",
    "updatedAt": "2025-07-16T14:01:00.000Z"
  }
}
```

**Response (Error)**:
```json
{
  "type": "error",
  "message": "Couldn't save data!"
}
```