# Code-style

<!-- TODO: дописать все пункты -->

<!-- TODO: найти grunt-скрипт для генерации содержания -->

<!-- TODO: расставить верную нумерацию -->

<!-- TODO: хорошо/плохо разбить на колонки. Используй таблицы -->

<!-- TODO: заменить все "мы" на повелительное наклонение -->


## 1. Именование классов

### 1. Название классов только строчными буквами и через дефис.
Не используйте заглавные буквы и camelCase. Слова отделяйте через дефис.

<!-- TODO: написать про название такого нейминга -->

Плохо
```
.accordionMenu {}
```

Хорошо
```
.accordion-menu {}
```


### 1.2. Мы используем именование по принципу БЭМ.
[БЭМ](http://ru.bem.info) - это целая методология, со своими инструментами. Но
мы используем только схему именования по БЭМ. Разбиваем разметку на *блоки*
(компонентный подход), в них выделяем *элементы*. Чтобы изменить состояние
блока или элемента - добавляем *модификаторы*.

Плохо
```
.menu-item-active {}
```

Хорошо
```
.menu__item_active {}
```

### 1.3. Для элемента `__`, для модификатора `_`.
Для выделения *элемента* в имени класса используйте `__` (два подчеркивания).
Для *модификатора - `_` (одно подчеркивание)

Плохо
```
.menu--item-text
.menu__item--text
.menuItem-text
```

Хорошо
```
.menu__item_text
```

### 1.4. Не пишите префиксы вроде `b_`.
В большинстве случаев из названия и так понятен его тип. Однако будет полезно почитать о БЭМ-префиксах

<!-- TODO:ссылка -->

Плохо
```
.b_banner {}
.l_cards {}
```

Хорошо
```
.banner {}
.card-list {}
```


### 1.5. Используйте `&__`, чтобы писать короче.
Не [повторяйтесь](https://ru.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself),
не пишите в каждом элементе или модификаторе название. Используйте оператор `&`
из
[scss](https://sass-scss.ru/documentation/rasshirenie_css/ssilka_na_roditelya_selektora.html),
но не увлекайтесь.  Всегда сокращайте элемент, но не состояние элемента, таким
образом состояние будет проще найти в сотне уже написаннх файлов. Выглядит это,
конечно, не так изящно, но зато в разы удобнее при разработке и поддержке
больших проектов.  Исключением здесь является большое состояние блока или
элемента - его нужно выносить в отдельный раздел и писать название блока и
модификатор полностью.

<!-- TODO: якорная ссылка_на_такое_правило -->

Плохо
```
.menu__item {}
.menu__item_active {}
.menu {
    &_level_1 {
        /* много-много стилей и элементов */
    }
}

.menu {
    &__item {
        &_active {} // Попробуйте найти такое состояние (_active) в большом проекте где >100 файлов стилей
    }
}
```

Хорошо
```
.menu {
    &__item {}
    &__item_active {} // А это уже проще найти по маске __item_active
}

//Выносим большое состояние блока в отдельный раздел и пишем имя блока и модификатор полностью
.menu_level_1 {
    /* много-много стилей и элементов */
}
```

### 1.6. Не пишите в названии класса элемент у элемента.
Очень часто в HTML надо вложить элемент внутрь другого элемента. *Не надо* в
этом случае писать полный путь до этого элемента, описывать всех его
родителей. Внутри CSS структура элементов должна быть плоской.

Плохо
```
.menu__item__link {}
.footer__container__row__column {}
```

Хорошо
```
.menu__link {}
.footer {
    &__container {}
    &__row {} 
    &__column {}
}
```

### 1.7. Не пишите !important.
Код с ними [тоже трудно поддерживать](#18-Нет-каскаду-И-излишней-специфичности-селектора).
Обычно его пишут, когда нужно переопределить правило, но запутались в своих
каскадах и не понимают как работает [специфичность в CSS](https://www.google.ru/search?q=%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C+%D0%B2+css).
Писать !important - это все равно что пытаться перекричать тех, кто говорит. А они
начинают говорить еще громче, и все начинают орать и срывают горло.

Плохо
```
// переопределяем каскад из стилей для WYSYWIG-редактора
.article ul>li { list-style: dots; }
.card {
    li { list-style: none!important; }
    // Плохо. Если в другой теме стили надо отменить?
}
```

Хорошо
```
.card_article {
    ul>li { list-style: none; }
}
```

Исключения из правила;
```
// надо отключить стили, проставленные сторонней js-библиотекой
.carousel_empty {
    .slick { display: none; }
}

// сторонний виджет вставляет асинхронно добавляет стили, а в них
// написан !important
.ya-map { border: 0!important }
```

### 1.8. Нет каскаду! И излишней специфичности селектора.
Код с CSS-каскадом очень сложно, просто *чудовищно сложно* поддерживать.
Приходится учитывать специфичность селектора. например, чтобы
переопределить такой css-селектор `.menu>li>ul>li>a.first` придется написать
такой же длинный селектор `.menu>li>ul>li>a.special`. 

Плохо
```
.form .fieldset .input
```

Хорошо
```
.form {
    &__input {}
}
```

Есть исключения из правила:
```
// внутри блока с модификатором
.card_inverted {
    .card {
        &__title { color: #fff }
    }
}

// когда нужно переопределить стили сторонней js-библиотеки
.carousel {
    .slick-arrow { fill: #000; }
}
)
// если содержимое блока берется из WYSYWIG-редактора (напр. ckeditor.js)
.article {
    h1 { margin: 20px 0 10px; }
}
```


### 1.9. Называйте классы по их назначению, а не по внешнему виду и положению.

Со временем поменяется дизайн, и элемент перенесут в другое место. Или в новой
теме синие кнопки станут красными. Представляете как будет запутывать людей элемент 
`form__left`, который располагается справа?

<!-- TODO ссылка на McFarland -->

Плохо
```
.btn_blue {}
.card__bottom {}
```

Хорошо
```
.btn_primary {}
.card__controls {}
```

### 1.10. Пишите названия полностью, все допустимые сокращения в документации.

Сокращения разные люди могут расшифровать по разному. Понятное вам может быть
непонятно другим. Давайте названия так, чтобы через год вы могли легко понять,
что имели ввиду.

<!-- TODO ссылка на McFarland -->

Плохо
```
.s1 {}
.bl-cr {}
.card__d {}
.f__bl {}
```

Хорошо
```
.section_first {}
.car_primary {}
.card__description {}
```

Исключения
```
// Допустимые сокращения
descr - description
btn - button
anim - animation
```
<!-- TODO: добавить еще примеров -->


## 2. Файловая структура

### 2.1. Индексные файлы. 
<!-- TODO: придумать понятный и красноречивый заголовок для этого пункта -->

Чтобы не было длинной портянки на 6000 строк, мы разбиваем стили на отдельные
файлы. Подключаем их в специальный _индексный файл_ с помощью `@import`. 
В индексном файле нельзя вставлять никакие определения классов, переменных,
миксинов и т.п., только подключение других файлов.  

Плохо
```
// файл main.scss
.header {}
.content {}
/* ...3000 строк кода... */ 
.footer {}
```

Хорошо
```
// файл main.scss
@import "header";
@import "content";
/* ...еще несколько @import... */
@import "footer";
```

### 2.2. Имя вложенного файла должно начинаться с нижнего подчеривания.
Так людям и программам будет легче отличить в _вложенный файл_ от _индексного_.
Название индексного файла не начинайте с подчеркивания.

Плохо
```
// список файлов:
button.scss
content.scss
header.scss
main.scss
pagination.scss
```

Хорошо
```
_button.scss
_content.scss
_header.scss
_pagination.scss
main.scss
```

### 2.3. Все стили блока должны быть в отдельном файле с названием блока.
В одном файле может быть описан только один БЭМ-блок, даже если там будет всего 3 строчки года.
Так будет сразу понятно, что класс `.filter__submit` описан в файле `_filter.scss`.

Плохо
```
// файл _header.scss:
.header { /* стили */ }
.topbar { /* стили */ }
```

Хорошо
```
// файл _header.scss:
.header { /* стили */ }
// файл _topbar.scss:
.topbar { /* стили */ }
```


### 2.4. Все файлы в одной папке.
Чтобы легче искать файлы. Если раскладывать по папкам, то нужно вводить
понятные правила для разделения. 

<!--
Пока мы не нашли подходящие нам правила, однако, вы можете поучаствовать в
обсуждении - в нём будут описаны причины, почему нам не подходят те или иные
правила разделения на папки.
-->

Плохо
```
// Чем плохи эти правила разбиения на папки:
// * по разделам - компоненты могут использоваться в нескольких разделах
main-page
├───banner.scss
├───slider.scss
catalog
└───card.scss

// * по типу - не всем будет понятно, к какому типу относится компонент
layout
├───header.scss   // можно поспорить и отнести шапку к компонентам
├───footer.scss
components
└───card.scss
```

Хорошо
```
styles
├───header.scss
├───footer.scss
└───card.scss
```

### 2.5. Все переменные в одном файле.
Если определять переменные в разных файлах, то велика вероятность
переопределить значение из другого компонента. Отыскать нужное переменную
тоже будет сложнее. Поэтому пишем в один файл.

Плохо
```
// файл button.css
$button-color: #ccc;
.button { color: $button-color; }
// файл input.css
// устанешь искать, где же опредение переменной $button-color
.input { color: $button-color; } 
```
Хорошо
```
// файл _variables.css
$button-color: #ccc;
$input-color: $button-color;
// файл _input.css
.input { color: $input-color; } 
```

### 2.6. Каждый миксин располагайте в отдельном файле

Плохо
```
```

Хорошо
```
```

### 2.7. Нет вендорных префиксов.
С этой задачей куда лучше справится [autoprefixer](https://github.com/postcss/autoprefixer).
С ним легче добавить или убрать нужные префиксы, если изменится список поддерживаемых
браузеров. Да и код будет выглядеть чище.

Плохо
```
.card {
    // старомодные неуклюжие миксины
    @include border-radius(4px); 

    // Некоторые ide автоматически генерируют вендорные префиксы
    background: -webkit-linear-gradient(top, #87e0fd 0%, #05abe0 100%);
    background: -moz-linear-gradient(top, #87e0fd 0%, #05abe0 100%);
    background: linear-gradient(to bottom, #87e0fd 0%, #05abe0 100%);
}
```

Хорошо
```
.card { 
    border-radius: 4px; 
    background: linear-gradient(to bottom, #87e0fd 0%, #05abe0 100%);
}
```

### 2.8. Не создавайте для сокращения кода классы/миксины с одним свойством
Эта ненужная абстракция. Вы сэкономите полсекунды на набор, зато другой человек
будет несколько минут разбираться, ходить по файлам, выясняя что имели ввиду.

Плохо
```
// ненужные сокращения в CSS
.card { @include fl-l; @include bd-def; }
// то же самое в HTML (привет Atomic CSS и одноклассникам.ру)
<div class="card fl-l bd-def"></div>
```

Хорошо
```
.card { float: left; border: 1px solid $border-default; }
<div class="card"></div>
```


## 3. Структура внутри файла

### 3.1. Разбивайте правила на группы: общие, адаптивность и состояния.

<!-- TODO: сформулировать почему и зачем так делать -->

Плохо
```
.card {
    &__title {
        @media (min-width: 480px) {}
        /* ...еще несколько медиа-запросов... */
    }
    &_special { /* описание состояния */ }
    @media (min-width: 768px) {
        /* опять описание адаптивности */
    }
}
```

Хорошо
```
// Общие стили
.card {
    &__title {}
}
// Адаптивность
.card {
    @media (min-width: 480px) {
        &__title {}
    }
    @media (min-width: 768px) {
        &__title {}
    }
}
// Состояния 
.card_special {}
```

### 3.4. Выносите состояния компонента в отдельный подраздел "Состояния".
Состояниями компонента считаются:
* псевдоклассы вроде :hover, :focus, :active, :first-child и т.д.
* модификаторы (&_active, &_special и т.д.)

Состояния описываются после общих стилей и адаптивности, чтобы этот раздел
смог переопределить значения по-умолчанию. 

Плохо
```
.card {
    &__title { /*..*/ }
    &_special {
        &__title { /*..*/ }
        &__media { /*..*/ }
    }
    &__media { /*..*/ }
}
```

Хорошо
```
.card {
    &__title { /*..*/ }
    &__media { /*..*/ }
}

// == Состояния
.card_special {
    &__title { /*..*/ }
    &__media { /*..*/ }
}
```


## 4. Адаптив

### 4.1. Mobile first - верстайте «сначала мобильные» отображения компонентов.

Когда я в первый раз делал мобильную версию сайта из старой десктопной, меня не 
покидала мысль ­ «Проще бы было переписать сайт заново». Эту же боль испытывал 
[Люк Роблевски](http://www.lukew.com/), который придумал 
[Mobile First](http://www.lukew.com/ff/entry.asp?933) - принцип создания интерфейсов,
когда сначала делают для маленьких мобильных экранов, и только потом для мониторов
настольных компьютеров.

Сперва может показаться, что так делать интерфейсы дольше и труднее. Это неправда.
Нарисуйте раскладку для всех размеров экрана, продумайте разметку и стили - и все
получится быстро и легко.

Плохо
```
В 4-й раз переделывать отображение для больших экранов, потому что порядок элементов
не подходит для мобильного вида.
```

Хорошо
```
Работать по такому алгоритму:
1. Нарисовать на бумаге, как будут располагаться "полочки" на разных экранах
2. Придумать, какими css-свойствоми это сверстать
3. Написать разметку и стили
```

### 4.2. Адаптивность: пишите медиа-запросы для всего компонента, а не каждого элемента отдельно.

Мы пишем код в том порядке, в котором будем его тестировать. Например, нам нужно
поправить код для планшетов. Если нужные стили объединить под одним медиа-запросом,
то нужно будет прыгать по всему файлу, они все рядом. Также в результате получится
гораздо меньше кода.
<!--
Тезисы:
-не надо прыгать по файлу
-удобно тестировать
-масштабирование
-mobile first
-меньше кода
-->

Плохо
```
.teaser {
    &__img { 
        @media (min-width: $screen-sm-min) { 
            /* много стилей */
        }

        @media (min-width: $screen-lg-min) { 
            /* много стилей */
        }
    }

    &__text { 
        @media (min-width: $screen-sm-min) { 
            /* много стилей */
        }

        @media (min-width: $screen-lg-min) { 
            /* много стилей */
        }
    }
}
```

Хорошо
```
.teaser {
    @media (min-width: $screen-sm-min) { 
        &__img { /* много стилей */ }

        &__text { /* много стилей */ }
    }

    @media (min-width: $screen-lg-min) { 
        &__img { /* много стилей */ }

        &__text { /* много стилей */ }
    }
}
```


### 4.3. Пишите медиа-запросы через min-width.

Вы сверстали интерфейс для больших экранов и начали переделывать его под
маленькие. Первое, что вам придет в голову: 

- Так, сейчас я напишу max-width:780px для планшетов, потом max-width:480px для
  телефонов. И буду как Лев Толстой.

Уже на стилях для планшетов, вы увидите, что интерфейс настольных компьютеров 
самый большой и самый сложный. В нём всякие вкладки, подписи к иконкам, большие
картинки. Всего этого на планшетах и телефонах быть не должно. И вы начинаете
отменять стили. Было 20 правил, написали еще 20, чтобы их отменить. Может проще
их сразу не писать? Ограничить область видимости этих правил только на большие
экраны? Для этого и был создан min-width для медиа-запросов.

Но запросы с max-width бывают полезными, если их правильно готовить. Подробнее
читайте в [следущем разделе](#44-Изолируйте-стили-для-маленких-экранов)

<!--
TODO: отредактировать
TODO: добавить примеры
-->

<!--
Тезисы
-mobile first
-max-width наслаивается друг на друга
-max-width противоречит принципу mobile first
-max-width только в начале
-удобнее тестировать
-->

Плохо
```
```

Хорошо
```
```


### 4.4. Изолируйте стили для маленких экранов. 

По макету кнопка меню с иконкой сендвича будет только на телефонах. Можем
написать все её стили, а потом скрыть еще одним медиа-запросом с min-width.
Тогда мы напишем лишние стили. Лучше использовать запрос с max-width и
изолировать стили на маленьких экранах.

Плохо
```
.sandwich { /* стили */ }

@media (min-width: $screen-md-min) {
    .sandwich { display: none; }
}
```

Хорошо
```
@media (max-width: $screen-sm-max) {
    .sandwich { /* стили */ }
}
```

### 4.5. Пишите медиа-запросы с max-width перед запросами с min-width.

Запросы с max-width описывают маленькие экраны. Мы пишем запросы в порядке
возрастания размеров экрана, поэтому лучше написать сначала все запросы с max-width, 
а уже потом все с min-width.

Плохо
```
.credit-form {
    @media (min-width: $screen-sm-min) { /* стили */ }

    @media (min-width: $screen-xs-max) { /* стили */ }
    
    @media (min-width: $screen-md-min) { /* стили */ }

    @media (min-width: $screen-sm-max) { /* стили */ }
}
```

Хорошо
```
.credit-form {
    @media (min-width: $screen-xs-max) { /* стили */ }

    @media (min-width: $screen-sm-max) { /* стили */ }
    
    @media (min-width: $screen-sm-min) { /* стили */ }

    @media (min-width: $screen-md-min) { /* стили */ }
}
```


## 5. Правила создания компонентов

### 5.1. Полочки и книжки

### 5.2. Компонент без отступов

### 5.3. Для отступов - миксины и модификаторы

### 5.4. Не вырывайте элемент из блока.
Элемент — (всегда часть блока)[https://ru.bem.info/methodology/quick-start/#Элемент] и не должен использоваться отдельно от него.
Если возникла такая необходимость, то превратите элемент в отдельный блок.

### 5.5. 

## 6. Правила создания тем

### 6.1. Для состояний кнопок используйте миксины 

### 6.2. Для отступов кнопок используйте переменные

### 6.3. Не убирайте бордер у кнопок

### 6.4. Задавайте цвета, семейства шрифтов, отступы и размеры через переменные
