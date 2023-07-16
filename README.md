## Live Chat using Laravel 9 and Vue 3

A real time chat app built using Laravel 9, Vue 3 and Tailwind CSS.

## Installation

1. Pull from GIT
   git pull

2. run composer
   composer install

3. setup up .env file from env.example

4. run database migration
   php artisan migrate

5. run database seed for generating dummy data
   php artisan db:seed

6. run npm install

7. run npm run dev

To setup users you can use tinker.

## Example for user setup with tinker

> php artisan tinker

You can copy & paste below code:

> `$user = new User();`
> `$user->name = 'Dawlat';`
> `$user->email = 'dawlatzai2006@gmail.com';`
> `$user->password = bcrypt('12345678');`
> `$user->save();`
