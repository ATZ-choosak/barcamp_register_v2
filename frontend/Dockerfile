FROM nginx

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration
COPY ./conf.d/nginx.conf /etc/nginx/conf.d/

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy your application files to the container
COPY . .

# Reload NGINX to apply the new configuration
CMD ["nginx", "-g", "daemon off;"]
