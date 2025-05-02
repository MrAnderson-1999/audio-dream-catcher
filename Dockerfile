
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the built app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Make sure the GPT Engineer script is included for the "Select" feature
RUN grep -q "cdn.gpteng.co/gptengineer.js" /usr/share/nginx/html/index.html || \
    sed -i 's|<script type="module" src="/src/main.tsx"></script>|<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>\n    <script type="module" src="/src/main.tsx"></script>|' /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
