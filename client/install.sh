#!/bin/bash

# Installationsskript für den monitoring4idiots-Daemon
# Muss als root ausgeführt werden

set -e

# Variablen
DAEMON_USER="monitoring4idiots"
DAEMON_GROUP="monitoring4idiots"
DAEMON_BINARY="/usr/bin/monitoring4idiots"
LOG_DIR="/var/log/monitoring4idiots"
PID_DIR="/var/run/monitoring4idiots"
SYSTEMD_UNIT="/etc/systemd/system/monitoring4idiots.service"
BINARY_SRC="./target/release/monitoring4idiots"
SYSTEMD_SRC="./monitoring4idiots.service"

# Prüfe, ob das Skript als root ausgeführt wird
if [ "$(id -u)" != "0" ]; then
    echo "Dieses Skript muss als root ausgeführt werden!" >&2
    exit 1
fi

# Schritt 1: Gruppe erstellen, falls sie nicht existiert
if ! getent group "$DAEMON_GROUP" >/dev/null; then
    echo "Erstelle Gruppe $DAEMON_GROUP..."
    groupadd --system "$DAEMON_GROUP"
else
    echo "Gruppe $DAEMON_GROUP existiert bereits."
fi

# Schritt 2: Benutzer erstellen, falls er nicht existiert
if ! id "$DAEMON_USER" >/dev/null 2>&1; then
    echo "Erstelle Benutzer $DAEMON_USER..."
    useradd --system --gid "$DAEMON_GROUP" --no-create-home \
        --shell /usr/sbin/nologin "$DAEMON_USER"
else
    echo "Benutzer $DAEMON_USER existiert bereits."
fi

# Schritt 3: Verzeichnisse erstellen und Berechtigungen setzen
echo "Erstelle Verzeichnisse..."
mkdir -p "$LOG_DIR" "$PID_DIR"
chown "$DAEMON_USER:$DAEMON_GROUP" "$LOG_DIR" "$PID_DIR"
chmod 750 "$LOG_DIR" "$PID_DIR"

# Schritt 4: Binärdatei kopieren
if [ -f "$BINARY_SRC" ]; then
    echo "Kopiere Binärdatei nach $DAEMON_BINARY..."
    cp "$BINARY_SRC" "$DAEMON_BINARY"
    chown root:root "$DAEMON_BINARY"
    chmod 755 "$DAEMON_BINARY"
else
    echo "Fehler: Binärdatei $BINARY_SRC nicht gefunden!" >&2
    exit 1
fi
#!/bin/bash

# Installationsskript für den monitoring4idiots-Daemon
# Muss als root ausgeführt werden

set -e

# Variablen
DAEMON_USER="monitoring4idiots"
DAEMON_GROUP="monitoring4idiots"
DAEMON_BINARY="/usr/bin/monitoring4idiots"
LOG_DIR="/var/log/monitoring4idiots"
PID_DIR="/var/run/monitoring4idiots"
SYSTEMD_UNIT="/etc/systemd/system/monitoring4idiots.service"
BINARY_SRC="./target/release/monitoring4idiots"
SYSTEMD_SRC="./monitoring4idiots.service"

# Prüfe, ob das Skript als root ausgeführt wird
if [ "$(id -u)" != "0" ]; then
    echo "Dieses Skript muss als root ausgeführt werden!" >&2
    exit 1
fi

# Schritt 1: Gruppe erstellen, falls sie nicht existiert
if ! getent group "$DAEMON_GROUP" >/dev/null; then
    echo "Erstelle Gruppe $DAEMON_GROUP..."
    groupadd --system "$DAEMON_GROUP"
else
    echo "Gruppe $DAEMON_GROUP existiert bereits."
fi

# Schritt 2: Benutzer erstellen, falls er nicht existiert
if ! id "$DAEMON_USER" >/dev/null 2>&1; then
    echo "Erstelle Benutzer $DAEMON_USER..."
    useradd --system --gid "$DAEMON_GROUP" --no-create-home \
        --shell /usr/sbin/nologin "$DAEMON_USER"
else
    echo "Benutzer $DAEMON_USER existiert bereits."
fi

# Schritt 3: Verzeichnisse erstellen und Berechtigungen setzen
echo "Erstelle Verzeichnisse..."
mkdir -p "$LOG_DIR" "$PID_DIR"
chown "$DAEMON_USER:$DAEMON_GROUP" "$LOG_DIR" "$PID_DIR"
chmod 750 "$LOG_DIR" "$PID_DIR"

# Schritt 4: Binärdatei kopieren
if [ -f "$BINARY_SRC" ]; then
    echo "Kopiere Binärdatei nach $DAEMON_BINARY..."
    cp "$BINARY_SRC" "$DAEMON_BINARY"
    chown root:root "$DAEMON_BINARY"
    chmod 755 "$DAEMON_BINARY"
else
    echo "Fehler: Binärdatei $BINARY_SRC nicht gefunden!" >&2
    exit 1
fi

# Schritt 5: Systemd-Unit-Datei kopiere#!/bin/bash

# Installationsskript für den monitoring4idiots-Daemon
# Muss als root ausgeführt werden

set -e

# Variablen
DAEMON_USER="monitoring4idiots"
DAEMON_GROUP="monitoring4idiots"
DAEMON_BINARY="/usr/bin/monitoring4idiots"
LOG_DIR="/var/log/monitoring4idiots"
PID_DIR="/var/run/monitoring4idiots"
SYSTEMD_UNIT="/etc/systemd/system/monitoring4idiots.service"
BINARY_SRC="./target/release/monitoring4idiots"
SYSTEMD_SRC="./monitoring4idiots.service"

# Prüfe, ob das Skript als root ausgeführt wird
if [ "$(id -u)" != "0" ]; then
    echo "Dieses Skript muss als root ausgeführt werden!" >&2
    exit 1
fi

# Schritt 1: Gruppe erstellen, falls sie nicht existiert
if ! getent group "$DAEMON_GROUP" >/dev/null; then
    echo "Erstelle Gruppe $DAEMON_GROUP..."
    groupadd --system "$DAEMON_GROUP"
else
    echo "Gruppe $DAEMON_GROUP existiert bereits."
fi

# Schritt 2: Benutzer erstellen, falls er nicht existiert
if ! id "$DAEMON_USER" >/dev/null 2>&1; then
    echo "Erstelle Benutzer $DAEMON_USER..."
    useradd --system --gid "$DAEMON_GROUP" --no-create-home \
        --shell /usr/sbin/nologin "$DAEMON_USER"
else
    echo "Benutzer $DAEMON_USER existiert bereits."
fi

# Schritt 3: Verzeichnisse erstellen und Berechtigungen setzen
echo "Erstelle Verzeichnisse..."
mkdir -p "$LOG_DIR" "$PID_DIR"
chown "$DAEMON_USER:$DAEMON_GROUP" "$LOG_DIR" "$PID_DIR"
chmod 750 "$LOG_DIR" "$PID_DIR"

# Schritt 4: Binärdatei kopieren
if [ -f "$BINARY_SRC" ]; then
    echo "Kopiere Binärdatei nach $DAEMON_BINARY..."
    cp "$BINARY_SRC" "$DAEMON_BINARY"
    chown root:root "$DAEMON_BINARY"
    chmod 755 "$DAEMON_BINARY"
else
    echo "Fehler: Binärdatei $BINARY_SRC nicht gefunden!" >&2
    exit 1
fi

# Schritt 5: Systemd-Unit-Datei kopieren
if [ -f "$SYSTEMD_SRC" ]; then
    echo "Kopiere systemd-Unit-Datei nach $SYSTEMD_UNIT..."
    cp "$SYSTEMD_SRC" "$SYSTEMD_UNIT"
    chown root:root "$SYSTEMD_UNIT"
    chmod 644 "$SYSTEMD_UNIT"
else
    echo "Fehler: Systemd-Unit-Datei $SYSTEMD_SRC nicht gefunden!" >&2
    exit 1
fi

# Schritt 6: Systemd-Dienst aktivieren und starten
echo "Aktiviere und starte den monitoring4idiots-Dienst..."
systemctl daemon-reload
systemctl enable monitoring4idiots.service
systemctl start monitoring4idiots.service

echo "Installation abgeschlossen!"
exit 0n
if [ -f "$SYSTEMD_SRC" ]; then
    echo "Kopiere systemd-Unit-Datei nach $SYSTEMD_UNIT..."
    cp "$SYSTEMD_SRC" "$SYSTEMD_UNIT"
    chown root:root "$SYSTEMD_UNIT"
    chmod 644 "$SYSTEMD_UNIT"
else
    echo "Fehler: Systemd-Unit-Datei $SYSTEMD_SRC nicht gefunden!" >&2
    exit 1
fi

# Schritt 6: Systemd-Dienst aktivieren und starten
echo "Aktiviere und starte den monitoring4idiots-Dienst..."
systemctl daemon-reload
systemctl enable monitoring4idiots.service
systemctl start monitoring4idiots.service

echo "Installation abgeschlossen!"
exit 0
# Schritt 5: Systemd-Unit-Datei kopieren
if [ -f "$SYSTEMD_SRC" ]; then
    echo "Kopiere systemd-Unit-Datei nach $SYSTEMD_UNIT..."
    cp "$SYSTEMD_SRC" "$SYSTEMD_UNIT"
    chown root:root "$SYSTEMD_UNIT"
    chmod 644 "$SYSTEMD_UNIT"
else
    echo "Fehler: Systemd-Unit-Datei $SYSTEMD_SRC nicht gefunden!" >&2
    exit 1
fi

# Schritt 6: Systemd-Dienst aktivieren und starten
echo "Aktiviere und starte den monitoring4idiots-Dienst..."
systemctl daemon-reload
systemctl enable monitoring4idiots.service
systemctl start monitoring4idiots.service

echo "Installation abgeschlossen!"
exit 0