#!/bin/bash
cd /home/kavia/workspace/code-generation/arogyamitr-chennai-95826-98ca6180/arogyamitr_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

