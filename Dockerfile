FROM node:16.12-alpine as build
WORKDIR /home/app
COPY . .
RUN yarn
RUN yarn run build

FROM nginx:1.21.3-alpine
COPY --from=build /home/app/dist /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
