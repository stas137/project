cd ~/../production-project
npm run build:prod apiUrl=https://lk-drx.ru/api
cd ~/../

rm -rf ~/../var/www/production-project/html
mv ~/../production-project/build ~/../var/www/production-project/html