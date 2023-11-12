#!/bin/sh
USER=root
TARGET=52.221.179.8
FRONTEND_PATH=/root/barcamp8/frontend
BACKEND_PATH=/root/barcamp8/server
BARCAMP_PATH=/root/barcamp8

echo "Build frontend"
cd frontend
yarn build
ssh ${USER}@${TARGET} "rm -rf ${FRONTEND_PATH}/*"
echo "Upload frontend"
scp -r dist/* ${USER}@${TARGET}:${FRONTEND_PATH}/
scp -r Dockerfile ${USER}@${TARGET}:${FRONTEND_PATH}/
scp -r conf.d ${USER}@${TARGET}:${FRONTEND_PATH}/
scp -r .dockerignore ${USER}@${TARGET}:${FRONTEND_PATH}/

cd ..
mkdir server_init
cp -r server/* server_init/
cd server_init
rm -rf node_modules
ssh ${USER}@${TARGET} "rm -rf ${BACKEND_PATH}/*"

echo "Upload backend"
scp -r . ${USER}@${TARGET}:${BACKEND_PATH}/
cd ..
rm -rf server_init
scp -r docker-compose.yml ${USER}@${TARGET}:${BARCAMP_PATH}/