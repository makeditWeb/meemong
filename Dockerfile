FROM nginx:alpine

# Remove default configuration files
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom nginx.conf to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the specific server configuration to the Nginx conf.d directory
COPY meemong.conf /etc/nginx/conf.d/default.conf

# Copy your HTML/CSS/JS files to the Nginx serve directory
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

