#!/bin/sh
USER=root
TARGET=18.141.239.186
FRONTEND_PATH=/var/www/check_in
CONFIG_PATH=/etc/nginx/sites-available
BACKEND_PATH=/root/barcamp8/server
BARCAMP_PATH=/root/barcamp8

echo "Build frontend check_in"
cd checkIn
yarn build
ssh ${USER}@${TARGET} "rm -rf ${FRONTEND_PATH}/*"
echo "Upload frontend check_in"
scp -r dist/* ${USER}@${TARGET}:${FRONTEND_PATH}/
ssh ${USER}@${TARGET} "cp -r /var/www/check_in/assets/* /var/www/public_relations/assets"
