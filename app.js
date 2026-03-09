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

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log("Meeplit: DOM fully loaded and parsed");

    // Load Data State
    let games = [];
    let events = [];
    let gamesDB = [];  // Will be populated dynamically
    let gameToDeleteId = null;

    const initData = async () => {
        if (!window.supabaseClient) {
            alert("⚠️ Erreur : Les clés de la base de données Supabase ne sont pas configurées !\n\nSi vous testez localement, assurez-vous d'exécuter `bash build.sh` avec vos variables d'environnement SUPABASE_URL et SUPABASE_ANON_KEY avant d'ouvrir index.html.");
            if (elements.eventsList) elements.eventsList.innerHTML = '<p class="empty-state">Erreur de connexion à la base de données.</p>';
            if (elements.gamesGrid) elements.gamesGrid.innerHTML = '<p class="empty-state">Erreur de connexion à la base de données.</p>';
            return;
        }

        if (elements.eventsList) elements.eventsList.innerHTML = '<p class="empty-state">Chargement des événements...</p>';
        if (elements.gamesGrid) elements.gamesGrid.innerHTML = '<p class="empty-state">Chargement des jeux...</p>';

        const [fetchedGames, fetchedEvents, fetchedGlobalGames] = await Promise.all([
            dataService.getMeeples(),
            dataService.getEvents(),
            dataService.getGlobalGames()
        ]);

        games = fetchedGames;
        events = fetchedEvents;
        gamesDB = fetchedGlobalGames;

        renderEvents();
        renderGames();
    };

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
        searchSuggestions: document.getElementById('searchSuggestions'),
        addSelectedGameBtn: document.getElementById('addSelectedGameBtn'),
        modalTitle: document.getElementById('modalTitle'),
        cancelBtn: document.getElementById('cancelBtn')
    };

    let selectedGameToAdd = null;

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

    const toggleJoin = async (eventId) => {
        const event = events.find(e => e.id === eventId);
        if (!event) return;

        let newParticipants = [...event.participants];
        const idx = newParticipants.indexOf(currentUser.id);
        if (idx > -1) newParticipants.splice(idx, 1);
        else if (newParticipants.length < event.maxPlayers) newParticipants.push(currentUser.id);

        const updatedEvent = await dataService.updateEvent(eventId, { participants: newParticipants });
        if (updatedEvent) {
            const evIdx = events.findIndex(e => e.id === eventId);
            events[evIdx] = updatedEvent;
            renderEvents();
            openEventDetails(updatedEvent);
        }
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
        elements.searchSuggestions.innerHTML = '';
        elements.searchSuggestions.classList.add('hidden');
        selectedGameToAdd = null;
        if (elements.addSelectedGameBtn) {
            elements.addSelectedGameBtn.disabled = true;
            elements.addSelectedGameBtn.textContent = 'Ajouter';
        }
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

    if (elements.createEventForm) elements.createEventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const gid = elements.eventGameSelect.value;
        const gname = elements.eventGameSelect.options[elements.eventGameSelect.selectedIndex].text;

        elements.createEventForm.querySelector('button[type="submit"]').textContent = 'Création...';
        elements.createEventForm.querySelector('button[type="submit"]').disabled = true;

        const newEvent = {
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

        const savedEvent = await dataService.addEvent(newEvent);
        if (savedEvent) {
            events.unshift(savedEvent);
            renderEvents();
        }

        elements.createEventForm.querySelector('button[type="submit"]').textContent = 'Créer la session';
        elements.createEventForm.querySelector('button[type="submit"]').disabled = false;

        elements.createEventModal.classList.remove('active');
        setTimeout(() => elements.createEventModal.classList.add('hidden'), 400);
    });

    // Search suggestions autocomplete
    if (elements.bggSearchInput) {
        elements.bggSearchInput.addEventListener('input', () => {
            const query = elements.bggSearchInput.value.trim().toLowerCase();
            elements.searchSuggestions.innerHTML = '';

            // Reset selection if user changes input
            selectedGameToAdd = null;
            if (elements.addSelectedGameBtn) elements.addSelectedGameBtn.disabled = true;

            if (query.length < 2) { elements.searchSuggestions.classList.add('hidden'); return; }
            const matches = gamesDB.filter(g => g.title.toLowerCase().includes(query)).slice(0, 5);

            if (matches.length > 0) {
                matches.forEach(g => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = g.title;
                    div.onclick = () => {
                        selectedGameToAdd = g;
                        elements.bggSearchInput.value = g.title;
                        elements.searchSuggestions.classList.add('hidden');
                        if (elements.addSelectedGameBtn) elements.addSelectedGameBtn.disabled = false;
                    };
                    elements.searchSuggestions.appendChild(div);
                });
                elements.searchSuggestions.classList.remove('hidden');
            } else {
                elements.searchSuggestions.innerHTML = '<div class="suggestion-item">Jeu non trouvé</div>';
                elements.searchSuggestions.classList.remove('hidden');
            }
        });
    }

    if (elements.addSelectedGameBtn) {
        elements.addSelectedGameBtn.addEventListener('click', async () => {
            if (!selectedGameToAdd) return;

            if (!games.find(x => x.bggId === selectedGameToAdd.bggId)) {
                const newGame = { ...selectedGameToAdd };
                delete newGame.id; // Let DB generate UUID

                const oldText = elements.addSelectedGameBtn.textContent;
                elements.addSelectedGameBtn.textContent = 'Ajout en cours...';
                elements.addSelectedGameBtn.disabled = true;

                const saved = await dataService.addMeeple(newGame);
                if (saved) {
                    games.unshift(saved);
                    renderGames();
                }

                elements.addSelectedGameBtn.textContent = oldText;
            }
            closeModal(elements.gameModal);
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

    if (elements.confirmDeleteBtn) elements.confirmDeleteBtn.addEventListener('click', async () => {
        const oldText = elements.confirmDeleteBtn.textContent;
        elements.confirmDeleteBtn.textContent = 'Suppression...';
        elements.confirmDeleteBtn.disabled = true;

        const success = await dataService.deleteMeeple(gameToDeleteId);
        if (success) {
            games = games.filter(g => g.id !== gameToDeleteId);
            renderGames();
        }

        elements.confirmDeleteBtn.textContent = oldText;
        elements.confirmDeleteBtn.disabled = false;
        closeModal(elements.deleteModal);
    });

    // Final Init
    initData();
});
