const dataService = {
    async getMeeples() {
        try {
            const { data, error } = await supabaseClient.from('meeples').select('*');
            if (error) {
                console.error("Error fetching meeples:", error);
                return [];
            }
            return data || [];
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
            return data || [];
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
            return data || [];
        } catch (err) {
            console.error("Exception fetching global_games:", err);
            return [];
        }
    },

    async addMeeple(game) {
        try {
            const { data, error } = await supabaseClient.from('meeples').insert([game]).select().single();
            if (error) {
                console.error("Error adding meeple:", error);
                return null;
            }
            return data;
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
            const { data, error } = await supabaseClient.from('events').insert([event]).select().single();
            if (error) {
                console.error("Error adding event:", error);
                return null;
            }
            return data;
        } catch (err) {
            console.error("Exception adding event:", err);
            return null;
        }
    },

    async updateEvent(id, updates) {
        try {
            const { data, error } = await supabaseClient.from('events').update(updates).eq('id', id).select().single();
            if (error) {
                console.error("Error updating event:", error);
                return null;
            }
            return data;
        } catch (err) {
            console.error("Exception updating event:", err);
            return null;
        }
    }
};

window.dataService = dataService;
