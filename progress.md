### 24/01
Развернул проект на Angular (ng new web-studio)

Перенес backend и выполнил миграцию базы данных:

#Steps to run the project:
1. Run `npm i`
2. Run `npm install -g migrate-mongo`
3. Run `migrate-mongo up`
4. To start the project run `npm start`

Импортировал и протестировал запросы в postman и swagger. Бэкенд готов

Создал компоненты Header и Footer в папке shared/layout.

Создал компонент Main в папке views.

Настроил лэйзи лоадинг в app-routing.module.ts:

>const routes: Routes = [
>{
>path: '',
>component: LayoutComponent,
>children: [
>{path: '', component: MainComponent}
>]
>}
>];

Перенес картинки в assets/images

Скопировал шрифты в assets/fonts

Перенес styles.scss в assets/styles (исправил путь в angular.json)

Добавил _fonts.scss и _variables.sscs



### 26/01
Сверстал хедер

Урок 1. 1ч 05м





