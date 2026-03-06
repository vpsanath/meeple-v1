console.log("Meeplit: Script starting...");

// Constants & Config
const emojis = ['🎲', '🧩', '🃏', '♟️', '🎮', '👾', '🎯', '🎰'];
const colors = ['var(--card-yellow)', 'var(--card-green)', 'var(--card-orange)', 'var(--card-blue)', 'var(--card-pink)'];

// Mock Users
const currentUser = { id: 'u1', name: 'Moi', avatar: 'https://i.pravatar.cc/150?u=u1' };
const mockUsers = [
    { id: 'u2', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=u2' },
    { id: 'u3', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=u3' },
    { id: 'u4', name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=u4' },
    { id: 'u5', name: 'Diana', avatar: 'https://i.pravatar.cc/150?u=u5' }
];

const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const BGG_SEARCH_URL = 'https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=';
const BGG_THING_URL = 'https://boardgamegeek.com/xmlapi2/thing?stats=1&id=';

const gamesDB = [
    { "id": "bgg-420087", "title": "Flip 7", "playerCount": "2-10", "playTime": "15 min", "imageUrl": "img/games/flip7.jpg", "bggId": "420087" },
    { "id": "bgg-352515", "title": "Trio", "playerCount": "3-6", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=800", "bggId": "352515" },
    { "id": "bgg-204135", "title": "Skyjo", "playerCount": "2-8", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1590333746430-c9a91b409f6e?q=80&w=800", "bggId": "204135" },
    { "id": "bgg-360961", "title": "Unlock Short", "playerCount": "1-6", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", "bggId": "360961" },
    { "id": "bgg-424160", "title": "Dekal", "playerCount": "2-6", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=800", "bggId": "424160" },
    { "id": "bgg-10041", "title": "Les Cinq Rois", "playerCount": "1-7", "playTime": "45 min", "imageUrl": "https://images.unsplash.com/photo-1541604193435-22287d32c2c2?q=80&w=800", "bggId": "10041" },
    { "id": "bgg-373284", "title": "Crack List", "playerCount": "2-8", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1629904853716-f0bc549482b8?q=80&w=800", "bggId": "373284" },
    { "id": "bgg-406854", "title": "Odin", "playerCount": "2-6", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800", "bggId": "406854" },
    { "id": "bgg-277458", "title": "Kluster", "playerCount": "1-4", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=800", "bggId": "277458" },
    { "id": "bgg-382343", "title": "Speed Bac", "playerCount": "2-10", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1522071823991-b5aeec2a21e4?q=80&w=800", "bggId": "382343" },
    { "id": "bgg-213460", "title": "Unlock", "playerCount": "1-6", "playTime": "60 min", "imageUrl": "https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=800", "bggId": "213460" },
    { "id": "bgg-434654", "title": "Toy Battle", "playerCount": "2", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1558060308-41acc9377484?q=80&w=800", "bggId": "434654" },
    { "id": "bgg-150145", "title": "Skull King", "playerCount": "2-8", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800", "bggId": "150145" },
    { "id": "bgg-1208", "title": "Focus", "playerCount": "2-4", "playTime": "45 min", "imageUrl": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800", "bggId": "1208" },
    { "id": "bgg-394889", "title": "Cabanga", "playerCount": "3-6", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=800", "bggId": "394889" },
    { "id": "bgg-424816", "title": "Jungo", "playerCount": "2-5", "playTime": "10 min", "imageUrl": "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=800", "bggId": "424816" },
    { "id": "bgg-432", "title": "6 Qui Prend", "playerCount": "2-10", "playTime": "45 min", "imageUrl": "https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=800", "bggId": "432" },
    { "id": "bgg-424817", "title": "Pili Pili", "playerCount": "2-8", "playTime": "25 min", "imageUrl": "https://images.unsplash.com/photo-1510443422791-c274ba377bb8?q=80&w=800", "bggId": "424817" },
    { "id": "bgg-440540", "title": "Take Time", "playerCount": "2-4", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=800", "bggId": "440540" },
    { "id": "bgg-422732", "title": "Agent Avenue", "playerCount": "2-4", "playTime": "10 min", "imageUrl": "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=800", "bggId": "422732" },
    { "id": "bgg-367220", "title": "Sea Salt & Paper", "playerCount": "2-4", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800", "bggId": "367220" },
    { "id": "bgg-230802", "title": "Azul", "playerCount": "2-4", "playTime": "45 min", "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800", "bggId": "230802" },
    { "id": "bgg-13", "title": "Catan", "playerCount": "3-4", "playTime": "90 min", "imageUrl": "img/games/catan.jpg", "bggId": "13" },
    { "id": "bgg-9209", "title": "Les Aventuriers du Rail", "playerCount": "2-5", "playTime": "60 min", "imageUrl": "https://images.unsplash.com/photo-1474487022132-58e17c469276?q=80&w=800", "bggId": "9209" },
    { "id": "bgg-172242", "title": "Blanc Manger Coco", "playerCount": "3-10", "playTime": "45 min", "imageUrl": "https://images.unsplash.com/photo-1533228892403-24701264c9d6?q=80&w=800", "bggId": "172242" },
    { "id": "bgg-39856", "title": "Dixit", "playerCount": "3-6", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=800", "bggId": "39856" },
    { "id": "bgg-147145", "title": "Concept", "playerCount": "4-12", "playTime": "40 min", "imageUrl": "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800", "bggId": "147145" },
    { "id": "bgg-68448", "title": "Dobble", "playerCount": "2-8", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=800", "bggId": "68448" },
    { "id": "bgg-8098", "title": "Jungle Speed", "playerCount": "2-10", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800", "bggId": "8098" },
    { "id": "bgg-9220", "title": "Saboteur", "playerCount": "3-10", "playTime": "30 min", "imageUrl": "https://images.unsplash.com/photo-1589307374003-81e84a22ad83?q=80&w=800", "bggId": "9220" },
    { "id": "bgg-434655", "title": "La Suite Infernale", "playerCount": "2-6", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?q=80&w=800", "bggId": "434655" },
    { "id": "bgg-417197", "title": "Rebirth", "playerCount": "2-4", "playTime": "45 min", "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800", "bggId": "417197" },
    { "id": "bgg-385761", "title": "Faraway", "playerCount": "2-6", "playTime": "25 min", "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", "bggId": "385761" },
    { "id": "bgg-357563", "title": "Akropolis", "playerCount": "2-4", "playTime": "25 min", "imageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800", "bggId": "357563" },
    { "id": "bgg-270314", "title": "Ohanami", "playerCount": "2-4", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800", "bggId": "270314" },
    { "id": "bgg-128882", "title": "7 Wonders", "playerCount": "3-7", "playTime": "30 min", "imageUrl": "img/games/7wonders.jpg", "bggId": "128882" },
    { "id": "bgg-344190", "title": "Lolly Dogs", "playerCount": "2-4", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800", "bggId": "344190" },
    { "id": "bgg-333748", "title": "Gwent", "playerCount": "2", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1610812392020-221af3c7e436?q=80&w=800", "bggId": "333748" },
    { "id": "bgg-163273", "title": "Moustache", "playerCount": "3-6", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1598460144941-6e3e5bc3511e?q=80&w=800", "bggId": "163273" },
    { "id": "bgg-394890", "title": "Osmosis", "playerCount": "2-4", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=800", "bggId": "394890" },
    { "id": "bgg-440541", "title": "Présages", "playerCount": "2-4", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1518355018653-53fe542913f1?q=80&w=800", "bggId": "440541" },
    { "id": "bgg-424219", "title": "Zénith", "playerCount": "2-4", "playTime": "20 min", "imageUrl": "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=800", "bggId": "424219" },
    { "id": "bgg-342942", "title": "Ark Nova", "playerCount": "1-4", "playTime": "120 min", "imageUrl": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=800", "bggId": "342942" },
    { "id": "bgg-328479", "title": "Living Forest", "playerCount": "2-4", "playTime": "40 min", "imageUrl": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800", "bggId": "328479" },
    { "id": "bgg-178900", "title": "Codenames", "playerCount": "2-8", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1543807535-dfe6f0dfc0b7?q=80&w=800", "bggId": "178900" },
    { "id": "bgg-149926", "title": "Ticket to Ride Europe", "playerCount": "2-5", "playTime": "60 min", "imageUrl": "https://images.unsplash.com/photo-1474487022132-58e17c469276?q=80&w=800", "bggId": "149926" },
    { "id": "bgg-392723", "title": "Kluster Duo", "playerCount": "1-2", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1621640785117-9c7429ff3701?q=80&w=800", "bggId": "392723" },
    { "id": "bgg-424818", "title": "Mouton Mouton", "playerCount": "2-8", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1484557985045-edd9d32bcaac?q=80&w=800", "bggId": "424818" },
    { "id": "bgg-424819", "title": "Pifo France", "playerCount": "2-12", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800", "bggId": "424819" },
    { "id": "bgg-131260", "title": "Qwixx", "playerCount": "2-5", "playTime": "15 min", "imageUrl": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", "bggId": "131260" }
];

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log("Meeplit: DOM fully loaded and parsed");

    // Load Data State
    let games = JSON.parse(localStorage.getItem('meeplit_library')) || [];
    let events = JSON.parse(localStorage.getItem('meeplit_events')) || [];
    let gameToDeleteId = null;

    // Seed Data
    if (events.length === 0) {
        const today = new Date().toISOString().split('T')[0];
        events = [
            { id: 'e1', hostId: 'u2', gameId: 'bgg-13', title: 'Soirée Catan', date: today, time: '19:00', address: '1 rue de la Paix, Paris', approxLocation: 'Paris 1er', maxPlayers: 4, participants: ['u2', 'u3'], level: 'Intermediate', description: 'Venez découvrir les colons de Catane !' },
            { id: 'e2', hostId: 'u4', gameId: 'bgg-128882', title: '7 Wonders Expert', date: today, time: '20:30', address: '15 Rue de Rivoli, Paris', approxLocation: 'Le Marais', maxPlayers: 7, participants: ['u4'], level: 'Expert', description: 'Session intense pour joueurs confirmés.' },
            { id: 'e3', hostId: 'u5', gameId: 'bgg-420087', title: 'Flip 7 Chill', date: today, time: '18:00', address: '5 Avenue Foch, Paris', approxLocation: 'Paris 16e', maxPlayers: 10, participants: ['u5', 'u1'], level: 'Beginner', description: 'On joue sans se prendre la tête.' },
            { id: 'e4', hostId: 'u3', gameId: 'bgg-230802', title: 'Azul entre amis', date: today, time: '14:00', address: '10 Rue de Lappe, Paris', approxLocation: 'Bastille', maxPlayers: 4, participants: ['u3', 'u2', 'u4'], level: 'Intermediate', description: 'Un classique indémodable.' },
            { id: 'e5', hostId: 'u2', gameId: 'bgg-352515', title: 'Trio Rapide', date: today, time: '12:30', address: '22 Boulevard Haussmann, Paris', approxLocation: 'Opéra', maxPlayers: 6, participants: ['u2'], level: 'Beginner', description: 'Une pause déj ludique.' }
        ];
        localStorage.setItem('meeplit_events', JSON.stringify(events));
    }

    // DOM Elements
    const elements = {
        onboardingScreen: document.getElementById('onboardingScreen'),
        homeScreen: document.getElementById('homeScreen'),
        libraryScreen: document.getElementById('libraryScreen'),
        bottomNav: document.querySelector('.bottom-nav'),
        navHome: document.getElementById('navHome'),
        navLibrary: document.getElementById('navLibrary'),
        startBtn: document.getElementById('startBtn'),
        addGameBtn: document.getElementById('addGameBtn'),
        addEventBtn: document.getElementById('addEventBtn'),
        gamesGrid: document.getElementById('gamesGrid'),
        eventsList: document.getElementById('eventsList'),
        gameModal: document.getElementById('gameModal'),
        gameDetailModal: document.getElementById('gameDetailModal'),
        deleteModal: document.getElementById('deleteModal'),
        createEventModal: document.getElementById('createEventModal'),
        eventDetailModal: document.getElementById('eventDetailModal'),
        createEventForm: document.getElementById('createEventForm'),
        detailGameImage: document.getElementById('detailGameImage'),
        detailGameTitle: document.getElementById('detailGameTitle'),
        detailGamePlayers: document.getElementById('detailGamePlayers'),
        detailGameDuration: document.getElementById('detailGameDuration'),
        detailDeleteBtn: document.getElementById('detailDeleteBtn'),
        deleteGameTitle: document.getElementById('deleteGameTitle'),
        confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
        cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
        closeDeleteBtn: document.getElementById('closeDeleteBtn'),
        detailEventImage: document.getElementById('detailEventImage'),
        detailEventTitle: document.getElementById('detailEventTitle'),
        detailEventGame: document.getElementById('detailEventGame'),
        detailEventLevel: document.getElementById('detailEventLevel'),
        detailEventDescription: document.getElementById('detailEventDescription'),
        detailEventDate: document.getElementById('detailEventDate'),
        detailEventTime: document.getElementById('detailEventTime'),
        detailEventLocation: document.getElementById('detailEventLocation'),
        detailEventSpots: document.getElementById('detailEventSpots'),
        joinEventBtn: document.getElementById('joinEventBtn'),
        organizerManageBtn: document.getElementById('organizerManageBtn'),
        eventGameSelect: document.getElementById('eventGameSelect'),
        bggSearchInput: document.getElementById('bggSearchInput'),
        bggSearchBtn: document.getElementById('bggSearchBtn'),
        searchSuggestions: document.getElementById('searchSuggestions'),
        bggResultsContainer: document.getElementById('bggResultsContainer'),
        bggLoading: document.getElementById('bggLoading'),
        modalTitle: document.getElementById('modalTitle'),
        cancelBtn: document.getElementById('cancelBtn')
    };

    // Navigation Logic
    const switchScreen = (screenId) => {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        const target = document.getElementById(screenId);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
        }
        if (screenId === 'homeScreen' || screenId === 'libraryScreen') {
            elements.bottomNav.classList.remove('hidden');
        } else {
            elements.bottomNav.classList.add('hidden');
        }
    };

    const updateNav = (activeId) => {
        [elements.navHome, elements.navLibrary].forEach(nav => {
            if (nav) nav.classList.remove('active');
        });
        const activeNav = document.getElementById(activeId);
        if (activeNav) activeNav.classList.add('active');
    };

    // Games Rendering Logic
    const renderGames = () => {
        if (!elements.gamesGrid) return;
        elements.gamesGrid.innerHTML = '';
        games.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.onclick = () => openGameDetails(game);

            const color = colors[index % colors.length];
            const emoji = emojis[index % emojis.length];

            card.innerHTML = `
                <div class="card-image-wrap">
                    ${game.imageUrl ? `<img src="${game.imageUrl}" alt="${game.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">` : ''}
                    <div class="fallback-emoji" style="display: ${game.imageUrl ? 'none' : 'block'}">${emoji}</div>
                </div>
                <div class="card-content" style="background-color: ${color}">
                    <h3 class="card-title">${game.title}</h3>
                </div>
            `;
            elements.gamesGrid.appendChild(card);
        });
    };

    window.openGameDetails = (game) => {
        elements.detailGameImage.src = game.imageUrl || '';
        elements.detailGameTitle.textContent = game.title;
        elements.detailGamePlayers.textContent = game.playerCount || 'n/a';
        elements.detailGameDuration.textContent = game.playTime || 'n/a';

        elements.detailDeleteBtn.onclick = () => {
            gameToDeleteId = game.id;
            elements.deleteGameTitle.textContent = game.title;
            elements.deleteModal.classList.remove('hidden');
            void elements.deleteModal.offsetWidth;
            elements.deleteModal.classList.add('active');
            window.closeGameDetails();
        };

        elements.gameDetailModal.classList.remove('hidden');
        void elements.gameDetailModal.offsetWidth;
        elements.gameDetailModal.classList.add('active');
    };

    window.closeGameDetails = () => {
        elements.gameDetailModal.classList.remove('active');
        setTimeout(() => elements.gameDetailModal.classList.add('hidden'), 400);
    };

    // Events Logic
    const renderEvents = () => {
        if (!elements.eventsList) return;
        elements.eventsList.innerHTML = '';
        if (events.length === 0) {
            elements.eventsList.innerHTML = '<p class="empty-state">Aucun événement à afficher.</p>';
            return;
        }
        events.forEach(event => {
            const host = mockUsers.find(u => u.id === event.hostId) || currentUser;
            const game = games.find(g => g.id === event.gameId) || gamesDB.find(g => g.id === event.gameId);
            const spotsLeft = event.maxPlayers - event.participants.length;

            const card = document.createElement('div');
            card.className = 'event-card';
            card.onclick = () => openEventDetails(event);
            card.innerHTML = `
                <div class="event-card-header">
                    <span class="event-game-title">${game ? game.title : event.title}</span>
                    <span class="level-tag ${event.level}">${event.level}</span>
                </div>
                <div class="event-details-short">
                    <span>📅 ${event.date}</span>
                    <span>⏰ ${event.time}</span>
                    <span>📍 ${event.approxLocation}</span>
                </div>
                <div class="event-host">
                    <img src="${host.avatar}" class="host-avatar">
                    <span>Hôte: <strong>${host.name}</strong></span>
                </div>
                <div class="spots-left ${spotsLeft === 0 ? 'full' : ''}">
                    ${spotsLeft <= 0 ? 'COMPLET' : `${spotsLeft} places restantes`}
                </div>
            `;
            elements.eventsList.appendChild(card);
        });
    };

    const openEventDetails = (event) => {
        const game = games.find(g => g.id === event.gameId) || gamesDB.find(g => g.id === event.gameId);
        const host = mockUsers.find(u => u.id === event.hostId) || currentUser;
        const isHost = event.hostId === currentUser.id;
        const isJoined = event.participants.includes(currentUser.id);

        elements.detailEventImage.src = game ? game.imageUrl : '';
        elements.detailEventTitle.textContent = event.title;
        elements.detailEventGame.textContent = `Jeu: ${game ? game.title : 'N/A'}`;
        elements.detailEventLevel.textContent = event.level;
        elements.detailEventLevel.className = `level-tag ${event.level}`;
        elements.detailEventDescription.textContent = event.description || '...';
        elements.detailEventDate.textContent = event.date;
        elements.detailEventTime.textContent = event.time;
        elements.detailEventLocation.textContent = isHost ? event.address : event.approxLocation;
        elements.detailEventSpots.textContent = `${event.participants.length} / ${event.maxPlayers}`;

        elements.joinEventBtn.classList.toggle('hidden', isHost);
        elements.organizerManageBtn.classList.toggle('hidden', !isHost);

        if (!isHost) {
            elements.joinEventBtn.textContent = isJoined ? 'Quitter la partie' : 'Rejoindre la partie';
            elements.joinEventBtn.onclick = () => toggleJoin(event.id);
        }

        elements.eventDetailModal.classList.remove('hidden');
        void elements.eventDetailModal.offsetWidth;
        elements.eventDetailModal.classList.add('active');
    };

    const toggleJoin = (eventId) => {
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        const idx = event.participants.indexOf(currentUser.id);
        if (idx > -1) event.participants.splice(idx, 1);
        else if (event.participants.length < event.maxPlayers) event.participants.push(currentUser.id);

        localStorage.setItem('meeplit_events', JSON.stringify(events));
        renderEvents();
        openEventDetails(event);
    };

    // Event Listeners
    if (elements.startBtn) elements.startBtn.addEventListener('click', () => {
        switchScreen('homeScreen');
        updateNav('navHome');
        renderEvents();
    });

    if (elements.navHome) elements.navHome.addEventListener('click', (e) => {
        e.preventDefault();
        switchScreen('homeScreen');
        updateNav('navHome');
        renderEvents();
    });

    if (elements.navLibrary) elements.navLibrary.addEventListener('click', (e) => {
        e.preventDefault();
        switchScreen('libraryScreen');
        updateNav('navLibrary');
        renderGames();
    });

    if (elements.addGameBtn) elements.addGameBtn.addEventListener('click', () => {
        elements.bggSearchInput.value = '';
        elements.bggResultsContainer.innerHTML = '';
        elements.bggResultsContainer.classList.add('hidden');
        elements.searchSuggestions.innerHTML = '';
        elements.searchSuggestions.classList.add('hidden');
        elements.gameModal.classList.remove('hidden');
        void elements.gameModal.offsetWidth;
        elements.gameModal.classList.add('active');
    });

    if (elements.addEventBtn) elements.addEventBtn.addEventListener('click', () => {
        elements.eventGameSelect.innerHTML = '<option value="">Choisir...</option>';
        games.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.id;
            opt.textContent = g.title;
            elements.eventGameSelect.appendChild(opt);
        });
        elements.createEventModal.classList.remove('hidden');
        void elements.createEventModal.offsetWidth;
        elements.createEventModal.classList.add('active');
    });

    if (elements.createEventForm) elements.createEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const gid = elements.eventGameSelect.value;
        const gname = elements.eventGameSelect.options[elements.eventGameSelect.selectedIndex].text;
        const newEvent = {
            id: 'e' + Date.now(),
            hostId: currentUser.id,
            gameId: gid,
            title: 'Session ' + gname,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            address: document.getElementById('eventAddress').value,
            approxLocation: document.getElementById('eventAddress').value.split(',').pop().trim() || 'Paris',
            maxPlayers: parseInt(document.getElementById('eventMaxPlayers').value),
            level: document.getElementById('eventLevel').value,
            description: document.getElementById('eventDescription').value,
            participants: [currentUser.id]
        };
        events.unshift(newEvent);
        localStorage.setItem('meeplit_events', JSON.stringify(events));
        elements.createEventModal.classList.remove('active');
        setTimeout(() => elements.createEventModal.classList.add('hidden'), 400);
        renderEvents();
    });

    // Search suggestions autocomplete
    if (elements.bggSearchInput) {
        elements.bggSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') elements.bggSearchBtn.click();
        });
        elements.bggSearchInput.addEventListener('input', () => {
            const query = elements.bggSearchInput.value.trim().toLowerCase();
            elements.searchSuggestions.innerHTML = '';
            if (query.length < 2) { elements.searchSuggestions.classList.add('hidden'); return; }
            const matches = gamesDB.filter(g => g.title.toLowerCase().includes(query)).slice(0, 5);
            if (matches.length > 0) {
                matches.forEach(g => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = g.title;
                    div.onclick = () => {
                        if (!games.find(x => x.bggId === g.bggId)) {
                            games.push({ ...g, id: 'bgg-' + g.bggId + '-' + Date.now() });
                            localStorage.setItem('meeplit_library', JSON.stringify(games));
                            renderGames();
                        }
                        closeModal(elements.gameModal);
                    };
                    elements.searchSuggestions.appendChild(div);
                });
                elements.searchSuggestions.classList.remove('hidden');
            } else elements.searchSuggestions.classList.add('hidden');
        });
    }

    // Close Modals Helper - targeted
    const closeModal = (modal) => {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 400);
    };

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => closeModal(elements.gameModal));
    });
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => closeModal(elements.createEventModal));
    });
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            const modal = backdrop.closest('.detail-modal');
            if (modal) closeModal(modal);
        });
    });
    document.getElementById('cancelBtn')?.addEventListener('click', () => closeModal(elements.gameModal));
    document.getElementById('cancelDeleteBtn')?.addEventListener('click', () => closeModal(elements.deleteModal));
    document.getElementById('closeDeleteBtn')?.addEventListener('click', () => closeModal(elements.deleteModal));

    // BGG Search Implementation (Restored & Cleaned)
    if (elements.bggSearchBtn) elements.bggSearchBtn.addEventListener('click', async () => {
        const query = elements.bggSearchInput.value.trim();
        if (!query) return;
        elements.bggLoading.classList.remove('hidden');
        try {
            const res = await fetch(`${PROXY_URL}${encodeURIComponent(BGG_SEARCH_URL + encodeURIComponent(query))}`);
            const text = await res.text();
            const xml = new DOMParser().parseFromString(text, "text/xml");
            const items = xml.getElementsByTagName('item');
            elements.bggResultsContainer.innerHTML = '';
            Array.from(items).slice(0, 10).forEach(item => {
                const id = item.getAttribute('id');
                const name = item.getElementsByTagName('name')[0].getAttribute('value');
                const div = document.createElement('div');
                div.className = 'bgg-result-item';
                div.textContent = name;
                div.onclick = async () => {
                    const dRes = await fetch(`${PROXY_URL}${encodeURIComponent(BGG_THING_URL + id)}`);
                    const dText = await dRes.text();
                    const dXml = new DOMParser().parseFromString(dText, "text/xml");
                    const it = dXml.getElementsByTagName('item')[0];
                    const game = {
                        id: 'bgg-' + id,
                        title: it.getElementsByTagName('name')[0].getAttribute('value'),
                        playerCount: it.getElementsByTagName('minplayers')[0].getAttribute('value') + '-' + it.getElementsByTagName('maxplayers')[0].getAttribute('value'),
                        playTime: it.getElementsByTagName('minplaytime')[0].getAttribute('value') + ' min',
                        imageUrl: it.getElementsByTagName('image')[0]?.textContent || '',
                        bggId: id
                    };
                    games.push(game);
                    localStorage.setItem('meeplit_library', JSON.stringify(games));
                    renderGames();
                    closeModal(elements.gameModal);
                };
                elements.bggResultsContainer.appendChild(div);
            });
            elements.bggResultsContainer.classList.remove('hidden');
        } catch (err) { console.error(err); }
        finally { elements.bggLoading.classList.add('hidden'); }
    });

    if (elements.confirmDeleteBtn) elements.confirmDeleteBtn.addEventListener('click', () => {
        games = games.filter(g => g.id !== gameToDeleteId);
        localStorage.setItem('meeplit_library', JSON.stringify(games));
        renderGames();
        closeModal(elements.deleteModal);
    });

    // Final Init
    renderEvents();
    renderGames();
});
