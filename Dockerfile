# Use the Nginx image
FROM nginx:alpine

# Remove the default Nginx HTML file to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets to Nginx server
COPY ./ /usr/share/nginx/html/
