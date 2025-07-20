#!/bin/bash

# Claude Code command to manage the development server
# Usage: ./scripts/dev-server.sh [start|stop|restart|status]

DEV_COMMAND="bun run dev"
PID_FILE=".dev-server.pid"
LOG_FILE=".dev-server.log"

# Function to get the PID of the running dev server
get_dev_pid() {
    # Look for bun process running "dev" command
    pgrep -f "bun.*dev" | head -1
}

# Function to kill existing dev server
kill_dev_server() {
    local pid=$(get_dev_pid)
    if [ -n "$pid" ]; then
        echo "🔄 Stopping existing dev server (PID: $pid)..."
        kill $pid 2>/dev/null
        sleep 2
        
        # Force kill if still running
        if kill -0 $pid 2>/dev/null; then
            echo "⚠️  Force killing dev server..."
            kill -9 $pid 2>/dev/null
        fi
        
        # Clean up PID file
        [ -f "$PID_FILE" ] && rm "$PID_FILE"
        echo "✅ Dev server stopped"
        return 0
    else
        echo "ℹ️  No dev server running"
        return 1
    fi
}

# Function to start dev server
start_dev_server() {
    local existing_pid=$(get_dev_pid)
    if [ -n "$existing_pid" ]; then
        echo "⚠️  Dev server already running (PID: $existing_pid)"
        echo "📍 Use 'restart' to restart or 'stop' to stop"
        return 1
    fi
    
    echo "🚀 Starting development server..."
    echo "📝 Logs will be written to $LOG_FILE"
    
    # Start the dev server in background
    nohup $DEV_COMMAND > "$LOG_FILE" 2>&1 &
    local new_pid=$!
    
    # Save PID
    echo $new_pid > "$PID_FILE"
    
    # Wait a moment to check if it started successfully
    sleep 3
    
    if kill -0 $new_pid 2>/dev/null; then
        echo "✅ Dev server started successfully (PID: $new_pid)"
        echo "🌐 Application should be available at http://localhost:3000"
        echo "📊 View logs: tail -f $LOG_FILE"
        return 0
    else
        echo "❌ Failed to start dev server"
        [ -f "$PID_FILE" ] && rm "$PID_FILE"
        return 1
    fi
}

# Function to show status
show_status() {
    local pid=$(get_dev_pid)
    if [ -n "$pid" ]; then
        echo "✅ Dev server is running (PID: $pid)"
        echo "🌐 Application: http://localhost:3000"
        echo "📊 Logs: tail -f $LOG_FILE"
        return 0
    else
        echo "❌ Dev server is not running"
        return 1
    fi
}

# Function to restart dev server
restart_dev_server() {
    echo "🔄 Restarting development server..."
    kill_dev_server
    sleep 1
    start_dev_server
}

# Main command handling
case "${1:-start}" in
    start)
        start_dev_server
        ;;
    stop)
        kill_dev_server
        ;;
    restart)
        restart_dev_server
        ;;
    status)
        show_status
        ;;
    *)
        echo "Usage: $0 [start|stop|restart|status]"
        echo ""
        echo "Commands:"
        echo "  start   - Start the development server (default)"
        echo "  stop    - Stop the development server"
        echo "  restart - Restart the development server"
        echo "  status  - Show current server status"
        echo ""
        echo "Examples:"
        echo "  $0        # Start server"
        echo "  $0 start  # Start server"
        echo "  $0 stop   # Stop server"
        echo "  $0 restart # Restart server"
        exit 1
        ;;
esac