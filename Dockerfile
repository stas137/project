# # stage1 as builder
# FROM node:10-alpine as builder

# WORKDIR /production-project

# # copy the package.json to install dependencies
# COPY package.json package-lock.json ./

# # Install the dependencies
# RUN npm install

# COPY . .

# # Build the project
# RUN npm run build:prod


# FROM nginx:alpine

# #!/bin/sh

# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
# COPY --from=builder /production-project/build /usr/share/nginx/html

# EXPOSE 3000 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]