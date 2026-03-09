const dataService = {
    async getMeeples() {
        try {
            const { data, error } = await supabaseClient.from('meeples').select('*');
            if (error) {
                console.error("Error fetching meeples:", error);
                return [];
            }
            return (data || []).map(g => ({
                id: g.id,
                bggId: g.bgg_id,
                title: g.title,
                playerCount: g.player_count,
                playTime: g.play_time,
                imageUrl: g.image_url
            }));
        } catch (err) {
            console.error("Exception fetching meeples:", err);
            return [];
        }
    },

    async getEvents() {
        try {
            const { data, error } = await supabaseClient.from('events').select('*').order('date', { ascending: true });
            if (error) {
                console.error("Error fetching events:", error);
                return [];
            }
            return (data || []).map(e => ({
                id: e.id,
                hostId: e.host_id,
                gameId: e.game_id,
                title: e.title,
                date: e.date,
                time: e.time,
                address: e.address,
                approxLocation: e.approx_location,
                maxPlayers: e.max_players,
                level: e.level,
                description: e.description,
                participants: e.participants || []
            }));
        } catch (err) {
            console.error("Exception fetching events:", err);
            return [];
        }
    },

    async getGlobalGames() {
        try {
            const { data, error } = await supabaseClient.from('global_games').select('*');
            if (error) {
                console.error("Error fetching global_games:", error);
                return [];
            }
            return (data || []).map(g => ({
                id: g.id,
                bggId: g.bgg_id,
                title: g.title,
                playerCount: g.player_count,
                playTime: g.play_time,
                imageUrl: g.image_url
            }));
        } catch (err) {
            console.error("Exception fetching global_games:", err);
            return [];
        }
    },

    async addMeeple(game) {
        try {
            const dbGame = {
                bgg_id: game.bggId,
                title: game.title,
                player_count: game.playerCount,
                play_time: game.playTime,
                image_url: game.imageUrl
            };
            const { data, error } = await supabaseClient.from('meeples').insert([dbGame]).select().single();
            if (error) {
                console.error("Error adding meeple:", error);
                return null;
            }
            return {
                id: data.id,
                bggId: data.bgg_id,
                title: data.title,
                playerCount: data.player_count,
                playTime: data.play_time,
                imageUrl: data.image_url
            };
        } catch (err) {
            console.error("Exception adding meeple:", err);
            return null;
        }
    },

    async deleteMeeple(id) {
        try {
            const { error } = await supabaseClient.from('meeples').delete().eq('id', id);
            if (error) {
                console.error("Error deleting meeple:", error);
                return false;
            }
            return true;
        } catch (err) {
            console.error("Exception deleting meeple:", err);
            return false;
        }
    },

    async addEvent(event) {
        try {
            const dbEvent = {
                host_id: event.hostId,
                game_id: event.gameId,
                title: event.title,
                date: event.date,
                time: event.time,
                address: event.address,
                approx_location: event.approxLocation,
                max_players: event.maxPlayers,
                level: event.level,
                description: event.description,
                participants: event.participants
            };
            const { data, error } = await supabaseClient.from('events').insert([dbEvent]).select().single();
            if (error) {
                console.error("Error adding event:", error);
                return null;
            }
            return {
                id: data.id,
                hostId: data.host_id,
                gameId: data.game_id,
                title: data.title,
                date: data.date,
                time: data.time,
                address: data.address,
                approxLocation: data.approx_location,
                maxPlayers: data.max_players,
                level: data.level,
                description: data.description,
                participants: data.participants || []
            };
        } catch (err) {
            console.error("Exception adding event:", err);
            return null;
        }
    },

    async updateEvent(id, updates) {
        try {
            const dbUpdates = {};
            if (updates.hostId !== undefined) dbUpdates.host_id = updates.hostId;
            if (updates.gameId !== undefined) dbUpdates.game_id = updates.gameId;
            if (updates.title !== undefined) dbUpdates.title = updates.title;
            if (updates.date !== undefined) dbUpdates.date = updates.date;
            if (updates.time !== undefined) dbUpdates.time = updates.time;
            if (updates.address !== undefined) dbUpdates.address = updates.address;
            if (updates.approxLocation !== undefined) dbUpdates.approx_location = updates.approxLocation;
            if (updates.maxPlayers !== undefined) dbUpdates.max_players = updates.maxPlayers;
            if (updates.level !== undefined) dbUpdates.level = updates.level;
            if (updates.description !== undefined) dbUpdates.description = updates.description;
            if (updates.participants !== undefined) dbUpdates.participants = updates.participants;

            const { data, error } = await supabaseClient.from('events').update(dbUpdates).eq('id', id).select().single();
            if (error) {
                console.error("Error updating event:", error);
                return null;
            }
            return {
                id: data.id,
                hostId: data.host_id,
                gameId: data.game_id,
                title: data.title,
                date: data.date,
                time: data.time,
                address: data.address,
                approxLocation: data.approx_location,
                maxPlayers: data.max_players,
                level: data.level,
                description: data.description,
                participants: data.participants || []
            };
        } catch (err) {
            console.error("Exception updating event:", err);
            return null;
        }
    }
};

window.dataService = dataService;
