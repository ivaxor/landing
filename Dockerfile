FROM node:latest AS build

ARG BUILD_NUMBER
RUN test -n "${BUILD_NUMBER}" || (echo "BUILD_NUMBER argument not provided" && false)

WORKDIR /app
COPY . ./
RUN npm version "${BUILD_NUMBER}" --no-git-tag-version
RUN npm install
RUN npm run ng build -- -c=production

FROM nginx:latest
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/docker/dockerEntryPoint.sh /
RUN chmod +x dockerEntryPoint.sh

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/landing ./

ENTRYPOINT ["/dockerEntryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]