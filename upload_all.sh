#!/bin/sh
USER=root
TARGET=18.141.239.186
FRONTEND_PATH=/var/www/register
CONFIG_PATH=/etc/nginx/sites-available
BACKEND_PATH=/root/barcamp8/server
BARCAMP_PATH=/root/barcamp8

echo "Build frontend"
cd frontend
yarn build
ssh ${USER}@${TARGET} "rm -rf ${FRONTEND_PATH}/*"
echo "Upload frontend"
scp -r dist/* ${USER}@${TARGET}:${FRONTEND_PATH}/
scp -r conf.d/register.conf ${USER}@${TARGET}:${CONFIG_PATH}/
ssh ${USER}@${TARGET} "rm -rf /var/www/public_relations/assets/*"
ssh ${USER}@${TARGET} "cp -r /var/www/register/assets /var/www/public_relations"

# # cd ..
# mkdir server_init
# cp -r server/* server_init/
# cd server_init
# rm -rf node_modules

# echo "Upload backend"
# scp -r . ${USER}@${TARGET}:${BACKEND_PATH}/
# cd ..
# rm -rf server_init
# scp -r docker-compose.yml ${USER}@${TARGET}:${BARCAMP_PATH}/