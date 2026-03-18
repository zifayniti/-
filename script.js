// ==================== Глобальные переменные ====================
let map, pickerMap;
let stories = [];
let currentFilter = 'all';
let searchTerm = '';
let selectedCoords = null;
let categoryFilter = null;

const TYUMEN_CENTER = [57.153, 65.534];

// ==================== Загрузка и сохранение ====================
function loadStories() {
    const saved = localStorage.getItem('zhivaya-nit-stories');
    if (saved) {
        try {
            stories = JSON.parse(saved);
        } catch (e) {
            stories = [];
        }
    } else {
        // 10 историй по умолчанию
        stories = [
            {
                id: 1,
                author: "Иван Петров",
                title: "Они встретились на вокзале в 43-м и прожили 50 лет",
                category: "love",
                text: "В 1943 году, во время войны, моя прабабушка Анна эвакуировалась в Тюмень из блокадного Ленинграда. На этом месте тогда был распределительный пункт. Мой прадедушка, Александр, работал здесь санитаром и помогал приезжим. Так они и познакомились. Через год поженились и прожили вместе 50 лет.",
                place: "Железнодорожный вокзал Тюмень",
                coords: [57.140, 65.527],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 2,
                author: "Елена Смирнова",
                title: "Дом с привидениями на Дзержинского: правда или вымысел?",
                category: "house",
                text: "Этот деревянный дом на улице Дзержинского построил мой прапрадед в 1910 году. Здесь выросли пятеро его детей. Моя бабушка рассказывала, как они бегали босиком по росе в ближайший сад и ловили рыбу в Туре. А ещё говорили, что по ночам скрипят половицы – будто души предков ходят. К сожалению, дом снесли в 80-х, но память о нём жива.",
                place: "ул. Дзержинского, 30 (бывший дом)",
                coords: [57.160, 65.527],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 3,
                author: "Анна Кузнецова",
                title: "Тайна дедовой медали: как нашёлся внук через 70 лет",
                category: "war",
                text: "Мой дед, Иван Кузнецов, был разведчиком. В 1944 году он участвовал в операции по взятию языка под Витебском. Вернулся живым, но с контузией. После войны работал учителем истории в тюменской школе №5. Его медаль «За отвагу» долго лежала в шкатулке, а потом мы нашли через сайт однополчан семью того самого «языка» – они подружились!",
                place: "школа №5, ул. Ленина, 10",
                coords: [57.150, 65.540],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 4,
                author: "Дмитрий Волков",
                title: "Как мой прадед из Кургана в Тюмень за счастьем шёл",
                category: "journey",
                text: "В 1920-х годах мой прадед пешком пришёл из Кургана в Тюмень – 200 километров! Нёс за плечами только котомку с сухарями и иконку. Здесь устроился на завод, построил дом, женился. Говорят, он прошёл через эти леса, где теперь район ДОКа.",
                place: "район ДОКа (исторический)",
                coords: [57.135, 65.570],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 5,
                author: "Мария Соколова",
                title: "Свадьба, которую сыграли… в огороде (и гости упали в капусту!)",
                category: "funny",
                text: "Мои бабушка и дедушка поженились в 1956 году. Денег на ресторан не было, и гуляли прямо в огороде. Поставили столы, накрыли клеёнками. А в разгар веселья скамейка подломилась, и трое гостей – прямо в грядку с капустой! До сих пор на семейных праздниках вспоминаем этот случай.",
                place: "частный сектор, ул. Щербакова, 15",
                coords: [57.125, 65.555],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 6,
                author: "Ольга Морозова",
                title: "Рецепт бабушкиных пирожков, который спас семью в 90-е",
                category: "tradition",
                text: "В лихие 90-е моя бабушка пекла пирожки с капустой и продавала их на Центральном рынке. На эти деньги и выживали. Рецепт до сих пор передаётся из поколения в поколение: тесто должно «дышать», а начинка – томиться. Теперь каждое воскресенье мы печём эти пирожки всей семьёй.",
                place: "Центральный рынок, ул. Щербакова",
                coords: [57.145, 65.545],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 7,
                author: "Алексей Николаев",
                title: "Почему наша семья каждый год 1 апреля ходит на мост Влюблённых?",
                category: "love",
                text: "Дело в том, что мои родители познакомились 1 апреля на этом мосту. Папа пошутил, мама засмеялась – и через год поженились. С тех пор у нас традиция: в День смеха идём на мост, вешаем замочек и вспоминаем ту встречу. А замков уже – целая связка!",
                place: "Мост Влюблённых (ул. Республики)",
                coords: [57.155, 65.532],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 8,
                author: "Наталья Воробьёва",
                title: "Клад, найденный при ремонте в старом доме на Республике",
                category: "house",
                text: "Когда мы делали ремонт в квартире (дом 1917 года постройки), под полом нашли шкатулку с царскими монетами и письмами. Оказалось, здесь жил купец, который спрятал ценности перед раскулачиванием. Мы передали письма в краеведческий музей, а монеты оставили как семейную реликвию.",
                place: "ул. Республики, 27",
                coords: [57.152, 65.531],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 9,
                author: "Сергей Лебедев",
                title: "Как мой дядя из армии письмо с ошибкой отправил и нашёл жену",
                category: "funny",
                text: "Мой дядя служил в Германии и писал письмо другу, но перепутал конверт и отправил его девушке с соседней улицы. Та прочитала, разобрала корявый почерк, ответила… и через год они поженились! До сих пор смеются, что всё решила ошибка почтальона.",
                place: "почтамт, ул. Республики, 56",
                coords: [57.148, 65.535],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            },
            {
                id: 10,
                author: "Татьяна Белых",
                title: "Бабушкин сундук: от свадебного платья до фронтовых писем",
                category: "tradition",
                text: "У нас дома хранится старый кованый сундук. Там – бабушкино подвенечное платье 1925 года, дедовы фронтовые письма, кружевные подзоры и даже школьные тетради моей мамы. Каждое поколение добавляет что-то своё. Недавно положила туда фотографию своей семьи.",
                place: "частный дом, ул. Луначарского, 8",
                coords: [57.168, 65.520],
                photo: "",
                approved: true,
                date: new Date().toISOString()
            }
        ];
        // Сохраняем истории по умолчанию в localStorage
        saveStories();
    }

    const urlParams = new URLSearchParams(window.location.search);
    categoryFilter = urlParams.get('category');
    updateStats();
    renderStoriesList();
    renderMarkers();
}

function saveStories() {
    localStorage.setItem('zhivaya-nit-stories', JSON.stringify(stories));
    updateStats();
    renderStoriesList();
    renderMarkers();
}

// ==================== Карта и маркеры ====================
function initMap() {
    ymaps.ready(() => {
        map = new ymaps.Map('map', {
            center: TYUMEN_CENTER,
            zoom: 13,
            controls: ['zoomControl', 'fullscreenControl']
        });
        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('rulerControl');

        renderMarkers();
    });
}

function renderMarkers() {
    if (!map) return;
    map.geoObjects.removeAll();
    stories.forEach(story => {
        if (story.approved && story.coords) {
            const placemark = new ymaps.Placemark(
                story.coords,
                {
                    balloonContent: `<b>${story.title}</b><br>${story.author}<br><small>${story.place}</small>`,
                    hintContent: story.title
                },
                {
                    preset: 'islands#blueDotIcon',
                    iconColor: '#8b5a2b'
                }
            );
            placemark.events.add('click', () => {
                window.location.href = `story.html?id=${story.id}`;
            });
            map.geoObjects.add(placemark);
        }
    });
}

// ==================== Список историй ====================
function renderStoriesList() {
    const listDiv = document.getElementById('stories-list');
    if (!listDiv) return;
    listDiv.innerHTML = '';

    let filtered = stories.filter(story => {
        if (currentFilter === 'published' && !story.approved) return false;
        if (currentFilter === 'pending' && story.approved) return false;
        if (categoryFilter && story.category !== categoryFilter) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return story.title.toLowerCase().includes(term) ||
                   story.author.toLowerCase().includes(term) ||
                   story.text.toLowerCase().includes(term) ||
                   (story.place && story.place.toLowerCase().includes(term));
        }
        return true;
    });

    if (filtered.length === 0) {
        listDiv.innerHTML = '<p style="text-align:center; padding:2rem;">Пока нет историй 😔</p>';
        return;
    }

    filtered.forEach(story => {
        const storyEl = document.createElement('div');
        storyEl.className = 'story-item' + (story.approved ? '' : ' pending');
        storyEl.innerHTML = `
            <a href="story.html?id=${story.id}" style="text-decoration: none; color: inherit; display: block;">
                <h3>${story.title}</h3>
                <div class="author"><i class="fas fa-user"></i> ${story.author}</div>
                <div class="place"><i class="fas fa-map-pin"></i> ${story.place || 'Место не указано'}</div>
                ${!story.approved ? '<span class="pending-badge">На модерации</span>' : ''}
            </a>
        `;
        listDiv.appendChild(storyEl);
    });
}

// ==================== Модальное окно добавления истории ====================
function initPickerMap() {
    if (pickerMap) {
        pickerMap.container.fitToViewport();
        return;
    }
    ymaps.ready(() => {
        pickerMap = new ymaps.Map('map-picker', {
            center: TYUMEN_CENTER,
            zoom: 13,
            controls: ['zoomControl']
        });
        pickerMap.controls.remove('geolocationControl');
        pickerMap.controls.remove('searchControl');
        pickerMap.controls.remove('trafficControl');

        pickerMap.events.add('click', (e) => {
            const coords = e.get('coords');
            if (pickerMap.geoObjects.getLength() > 0) {
                pickerMap.geoObjects.removeAll();
            }
            const placemark = new ymaps.Placemark(
                coords,
                {},
                { preset: 'islands#greenDotIcon', draggable: true }
            );
            placemark.events.add('dragend', () => {
                const newCoords = placemark.geometry.getCoordinates();
                selectedCoords = newCoords;
                document.getElementById('selected-coords').innerHTML = `Выбрано: ${newCoords[0].toFixed(5)}, ${newCoords[1].toFixed(5)}`;
                document.getElementById('place-coords').value = newCoords.join(',');
                ymaps.geocode(newCoords).then(res => {
                    const firstGeoObject = res.geoObjects.get(0);
                    if (firstGeoObject) {
                        document.getElementById('place-address').value = firstGeoObject.getAddressLine();
                    }
                });
            });
            pickerMap.geoObjects.add(placemark);
            selectedCoords = coords;
            document.getElementById('selected-coords').innerHTML = `Выбрано: ${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`;
            document.getElementById('place-coords').value = coords.join(',');
            ymaps.geocode(coords).then(res => {
                const firstGeoObject = res.geoObjects.get(0);
                if (firstGeoObject) {
                    document.getElementById('place-address').value = firstGeoObject.getAddressLine();
                }
            });
        });
    });
}

document.getElementById('story-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedCoords) {
        alert('Пожалуйста, выберите место на карте (кликните по карте выбора)');
        return;
    }
    const photoFile = document.getElementById('photo-upload').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            saveStoryWithPhoto(event.target.result);
        };
        reader.readAsDataURL(photoFile);
    } else {
        saveStoryWithPhoto('');
    }
});

function saveStoryWithPhoto(photoData) {
    const newStory = {
        id: Date.now(),
        author: document.getElementById('author').value,
        title: document.getElementById('title').value,
        text: document.getElementById('story').value,
        place: document.getElementById('place-address').value || 'Место выбрано на карте',
        coords: selectedCoords,
        photo: photoData,
        approved: false,
        date: new Date().toISOString(),
        category: 'other'
    };
    stories.push(newStory);
    saveStories();
    document.getElementById('story-modal').style.display = 'none';
    document.getElementById('story-form').reset();
    document.getElementById('photo-preview').innerHTML = '';
    if (pickerMap) pickerMap.geoObjects.removeAll();
    selectedCoords = null;
    document.getElementById('selected-coords').innerHTML = 'Щёлкните по карте, чтобы указать место истории';
}

// ==================== Поиск и фильтры ====================
document.getElementById('search-input').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderStoriesList();
});

document.getElementById('filter-select').addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderStoriesList();
});

// ==================== Обновление статистики ====================
function updateStats() {
    const total = stories.length;
    const pending = stories.filter(s => !s.approved).length;
    const published = total - pending;
    document.getElementById('total-stories').textContent = total;
    document.getElementById('pending-stories').textContent = pending;
    document.getElementById('published-stories').textContent = published;
}

// ==================== Инициализация ====================
window.onload = () => {
    loadStories();
    initMap();

    document.getElementById('add-story-btn').addEventListener('click', () => {
        document.getElementById('story-modal').style.display = 'block';
        setTimeout(() => {
            initPickerMap();
        }, 200);
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('story-modal').style.display = 'none';
        if (pickerMap) pickerMap.geoObjects.removeAll();
        selectedCoords = null;
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            if (e.target.id === 'story-modal') {
                if (pickerMap) pickerMap.geoObjects.removeAll();
                selectedCoords = null;
            }
        }
    });

    document.getElementById('photo-upload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('photo-preview').innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            document.getElementById('photo-preview').innerHTML = '';
        }
    });

    document.getElementById('place-address').addEventListener('change', async (e) => {
        const address = e.target.value;
        if (!address || !pickerMap) return;
        ymaps.geocode(address, { results: 1 }).then(res => {
            const firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
                const coords = firstGeoObject.geometry.getCoordinates();
                pickerMap.geoObjects.removeAll();
                const placemark = new ymaps.Placemark(
                    coords,
                    {},
                    { preset: 'islands#greenDotIcon', draggable: true }
                );
                pickerMap.geoObjects.add(placemark);
                pickerMap.setCenter(coords, 16);
                selectedCoords = coords;
                document.getElementById('selected-coords').innerHTML = `Выбрано: ${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`;
                document.getElementById('place-coords').value = coords.join(',');
            }
        });
    });

    document.getElementById('save-json').addEventListener('click', () => {
        const dataStr = JSON.stringify(stories, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stories.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('load-json').addEventListener('click', () => {
        document.getElementById('upload-json').click();
    });

    document.getElementById('upload-json').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const loaded = JSON.parse(ev.target.result);
                if (Array.isArray(loaded)) {
                    stories = loaded;
                    saveStories();
                }
            } catch (err) {
                alert('Ошибка загрузки файла');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });
};