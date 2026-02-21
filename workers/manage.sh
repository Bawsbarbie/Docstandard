#!/bin/bash
# ClawTeam Worker Manager
# Keeps Dex (and eventually Nova) running automatically

WORKERS_DIR="/Users/bawsbarbie/clawd/workers"
LOG_DIR="/Users/bawsbarbie/clawd/workers/logs"
PID_DIR="/Users/bawsbarbie/clawd/workers/pids"

# Create directories
mkdir -p "$LOG_DIR"
mkdir -p "$PID_DIR"

start_worker() {
    local worker_name=$1
    local pid_file="$PID_DIR/$worker_name.pid"
    local log_file="$LOG_DIR/$worker_name.log"
    
    # Check if already running
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo "[$worker_name] Already running (PID: $pid)"
            return
        fi
    fi
    
    # Start the worker
    echo "[$worker_name] Starting..."
    cd "$WORKERS_DIR"
    
    if [ "$worker_name" = "dex" ]; then
        nohup node research-worker.js > "$log_file" 2>&1 &
    elif [ "$worker_name" = "nova" ]; then
        nohup node observer-worker.js > "$log_file" 2>&1 &
    fi
    
    local new_pid=$!
    echo $new_pid > "$pid_file"
    echo "[$worker_name] Started with PID: $new_pid"
}

stop_worker() {
    local worker_name=$1
    local pid_file="$PID_DIR/$worker_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo "[$worker_name] Stopping (PID: $pid)..."
            kill "$pid"
            rm "$pid_file"
            echo "[$worker_name] Stopped"
        else
            echo "[$worker_name] Not running (stale PID file)"
            rm "$pid_file"
        fi
    else
        echo "[$worker_name] Not running"
    fi
}

status_worker() {
    local worker_name=$1
    local pid_file="$PID_DIR/$worker_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo "[$worker_name] ✅ Running (PID: $pid)"
            return 0
        else
            echo "[$worker_name] ❌ Dead (stale PID file)"
            return 1
        fi
    else
        echo "[$worker_name] ❌ Not running"
        return 1
    fi
}

restart_worker() {
    local worker_name=$1
    stop_worker "$worker_name"
    sleep 2
    start_worker "$worker_name"
}

check_and_restart() {
    # Called by cron - checks if workers are alive, restarts if not
    for worker in dex nova; do
        if ! status_worker "$worker" > /dev/null 2>&1; then
            echo "[$(date)] $worker was down, restarting..." >> "$LOG_DIR/manager.log"
            start_worker "$worker"
        fi
    done
}

# Main command handler
case "$1" in
    start)
        start_worker "$2"
        ;;
    stop)
        stop_worker "$2"
        ;;
    restart)
        restart_worker "$2"
        ;;
    status)
        status_worker "$2"
        ;;
    check)
        check_and_restart
        ;;
    start-all)
        start_worker "dex"
        start_worker "nova"
        echo "All workers started!"
        ;;
    stop-all)
        stop_worker "dex"
        stop_worker "nova"
        echo "All workers stopped!"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|check} {worker-name}"
        echo "       $0 {start-all|stop-all}"
        echo ""
        echo "Workers: dex, nova"
        echo ""
        echo "Examples:"
        echo "  $0 start dex        # Start Dex worker"
        echo "  $0 status dex       # Check if Dex is running"
        echo "  $0 stop-all         # Stop all workers"
        echo "  $0 check            # Cron check (auto-restart dead workers)"
        ;;
esac
