FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

COPY ./start.sh /start.sh

EXPOSE 4000

# CMD ["node", "index.js"]
RUN chmod +x start.sh