#!/bin/bash
# parallel-generate.sh — Wrapper for easy usage

# Default values
VERTICAL="logistics"
BATCH="1"
PAGES_PER_WORKER="1000"
WORKERS="8"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --vertical)
      VERTICAL="$2"
      shift 2
      ;;
    --batch)
      BATCH="$2"
      shift 2
      ;;
    --pages)
      PAGES_PER_WORKER="$2"
      shift 2
      ;;
    --workers)
      WORKERS="$2"
      shift 2
      ;;
    --help)
      echo "Usage: ./parallel-generate.sh [options]"
      echo ""
      echo "Options:"
      echo "  --vertical     Vertical name (logistics|legal|real-estate|accounting)"
      echo "  --batch        Batch number (1, 2, 3...)"
      echo "  --pages        Pages per worker (default: 1000)"
      echo "  --workers      Number of workers (default: 8)"
      echo ""
      echo "Examples:"
      echo "  ./parallel-generate.sh --vertical=logistics --batch=1 --pages=1250"
      echo "  ./parallel-generate.sh --vertical=legal --batch=1 --workers=4"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Run with --help for usage"
      exit 1
      ;;
  esac
done

echo "🚀 Starting Parallel Generation"
echo "   Vertical: $VERTICAL"
echo "   Batch: $BATCH"
echo "   Workers: $WORKERS"
echo "   Pages per worker: $PAGES_PER_WORKER"
echo "   Total pages: $((WORKERS * PAGES_PER_WORKER))"
echo ""

# Run generator
node scripts/parallel-generator.js \
  --vertical="$VERTICAL" \
  --batch="$BATCH" \
  --pages-per-worker="$PAGES_PER_WORKER" \
  --workers="$WORKERS" \
  --output="./generated"
