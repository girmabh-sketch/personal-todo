# Stage 1: Build the Angular application
FROM node:alpine AS build

# Setup the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy other files and folders to the working directory
COPY . .


# Build Angular application in PROD mode
RUN npm run build --prod

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy built Angular app files to Nginx HTML folder
COPY --from=build /app/dist/angular-frontend/browser /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

#USER nginx

# Expose port 80
EXPOSE 80

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]

# Start Nginx server
#CMD ["nginx", "-g", "daemon off;"]

## =========================================
## Stage 1: Development - Angular Application
## =========================================
#
## Define the Node.js version to use (Alpine for a small footprint)
#ARG NODE_VERSION=20.20.1-alpine
#
## Set the base image for development
#FROM node:${NODE_VERSION} AS dev
#
## Set environment variable to indicate development mode
#ENV NODE_ENV=development
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy only the dependency files first to optimize Docker caching
#COPY package.json package-lock.json* ./
#
## Install dependencies using npm with caching to speed up subsequent builds
#RUN --mount=type=cache,target=/root/.npm npm install
#
## Copy all application source files into the container
#COPY . .
#
## Expose the port Angular uses for the dev server (default is 4200)
#EXPOSE 4200
#
## Start the Angular dev server and bind it to all network interfaces
#CMD ["npm", "start", "--", "--host=0.0.0.0"]
#
#FROM node:alpine
#
#WORKDIR /usr/src/app
#
#COPY . /usr/src/app
#
#RUN npm install -g @angular/cli
#
#RUN npm install
#
#CMD ["ng", "serve", "--host", "0.0.0.0"]

