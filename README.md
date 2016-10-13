# Code-style

TODO: найти grunt-скрипт для генерации содержания

TODO: добавить якоря в заголовки

TODO: расставить верную нумерацию (ищи /\.x/g )

TODO: хорошо/плохо разбить на колонки (используй таблицы?)

TODO: заменить все "мы" на "я" или имена других людей

## 1. Именование классов

### 1. Название классов только строчными буквами и через дефис.
Не используйте заглавные буквы и [camelCase](TODO:ссылка). Слова отделяйте через дефис.
TODO: написать про название такого нейминга.

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
Для выделения *элемента* в имени класса используйте `__` (два подчечкивания).
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
В большинстве случаев из названия и так понятен его тип. Однако будет полезно
[почитать о БЭМ-префиксах](TODO:ссылка)

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
Не [повторяйтесь](TODO:ссылка_про_DRY), не пишите в каждом элементе или модификаторе
название. Используйте оператор `&` из [scss](TODO:ссылка).  Однако пишите полностью
название блока и модификатор, когда [описываете отдельное большое
состояние](TODO:#ссылка_на_такое_правило).

Плохо
```
.menu__item {}
.menu__item_active {}
.menu {
    &_level_1 {
        /* много-много стилей и элементов */
    }
}
```

Хорошо
```
.menu {
    &__item {
        &_active {}
    }
}
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

### 1.8. Нет каскаду! И излишней специфичности селектора.
Код с [CSS-каскадом](TODO:ссылка) очень сложно, просто *чудовищно сложно* поддерживать.
Приходится учитывать [специфичность селектора](TODO:ссылка), например, чтобы
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

// если содержимое блока берется из WYSYWIG-редактора (напр. ckeditor.js)
.article {
    h1 { margin: 20px 0 10px; }
}
```

### 1.7. Не пишите !important.
Код с ними [тоже](TODO:ссылка_на_правило_про_специфичность) трудно поддерживать.
Обычно его пишут, когда нужно переопределить правило, но запутались в своих
каскадах и не понимают как работает [специфичность в CSS](TODO:ссылка). Писать
!important - это все равно что пытаться перекричать тех, кто говорит. А они
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

### 1.9. Называйте классы по их назначению, а не по внешнему виду и положению.

Со временем поменяется дизайн, и элемент перенесут в другое место. Или в новой
теме синие кнопки станут красными. Представляете как будет запутывать людей элемент 
`form__left`, который располагается справа?
TODO: (c) McFarland

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

### 1.11. Пишите названия полностью, все допустимые сокращения в документации.

Сокращения разные люди могут расшифровать по разному. Понятное вам может быть
непонятно другим. Давайте названия так, чтобы через год вы могли легко понять,
что имели ввиду.
TODO: (c) McFarland
(нет .s1, .bl-cr и т.д.)  

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
descr
btn
// TODO: добавить еще
```


## 2. Файловая структура

### 2.1. Индексные файлы. 
// TODO: придумать понятный и красноречивый заголовок для этого пункта.

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
// TODO: 

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
понятные правила для разделения. Пока мы не нашли подходящие нам правила,
однако, вы можете поучаствовать в [обсуждении](TODO:ссылка-на-обсуждение) - в
нём будут описаны причины, почему нам не подходят те или иные правила
разделения на папки.

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

### 2.5. Все переменные в одном файле
Этим облегчим поиск нужного файла. В дальнейшем [обсудим](TODO:ссылка-на-обсуждение),
стоит ли держать переменные компонента в одном файле с его стилями.

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

### 2.6. Расположение файлов с миксинами.
TODO: Надо определиться, как будем делать:
1. Один файл - один миксин
2. Все миксины в одной папке.

Плохо
```
```

Хорошо
```
```

### 2.7. Нет вендорных префиксов.
С этой задачей куда лучше справится [autoprefixer](TODO:ссылка). С ним легче
добавить или убрать нужные префиксы, если изменится список поддерживаемых
браузеров. Да и код будет выглядеть чище.

Плохо
```
.card { @include border-radius: 4px; }
```

Хорошо
```
.card { border-radius: 4px; }
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
TODO: сформулировать почему и зачем так делать

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

### 3.2. Выносите медиа-запросы в отдельный подраздел "Адаптивность".
TODO: сформулировать почему и зачем так делать

Плохо
```
.card {
    &__title {
        border: 1px solid #ccc;
        @media (min-width: 320px)  { /*..*/ }
        @media (min-width: 768px)  { /*..*/ }
        @media (min-width: 1024px) { /*..*/ }
    }
    &__media {
        background: #eee;
        @media (min-width: 320px)  { /*..*/ }
        @media (min-width: 768px)  { /*..*/ }
        @media (min-width: 1024px) { /*..*/ }
    }
}
```
Хорошо
```
.card {
    &__title { border: 1px solid #ccc; }
    &__media { background: #eee; }
}

// == Адаптивность
.card {
    @media (min-width: 320px)  { /*..*/ }
    @media (min-width: 768px)  { /*..*/ }
    @media (min-width: 1024px) { /*..*/ }
}
```

### 3.3. Выносите состояния компонента в отдельный подраздел "Состояния".
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

### 4.2. Адаптивность: пишите медиа-запросы для всего компонента, а не каждого
### элемента отдельно.
// TODO: 

Плохо
```
```

Хорошо
```
```


### 4.3. min-width, max-width только в начале
// TODO: 

Плохо
```
```

Хорошо
```
```



## 5. Правила создания компонентов

### 5.1. Полочки и книжки
// TODO: 

Плохо
```
```

Хорошо
```
```

### 5.2. Компонент без отступов
// TODO: 

Плохо
```
```

Хорошо
```
```

### 5.3. Для отступов - миксины и модификаторы
// TODO: 

Плохо
```
```

Хорошо
```
```

### 5.4. 
// TODO: 

Плохо
```
```

Хорошо
```
```




## 6. Правила создания тем

### 6.1. Для состояний кнопок используйте миксины 
// TODO: 

Плохо
```
```

Хорошо
```
```

### 6.2. Для отступов кнопок используйте переменные
// TODO: 

Плохо
```
```

Хорошо
```
```

### 6.3. Не убирайте бордер у кнопок
// TODO: 

Плохо
```
```

Хорошо
```
```

### 6.4. Задавайте цвета через переменные
// TODO:
Особое внимание стоит обратить на оттенки серого.

Плохо
```
```

Хорошо
```
```
