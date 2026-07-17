(function () {
  const cfg = window.FOCUS_BLOOM_CONFIG || {};
  let client = null;

  function configured() {
    return Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_PUBLISHABLE_KEY && window.supabase);
  }

  function getClient() {
    if (!configured()) return null;
    if (!client) client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_PUBLISHABLE_KEY);
    return client;
  }

  window.FocusBloomCloud = {
    configured,
    getClient,

    async signUp(email, password) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    },

    async signIn(email, password) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },

    async signOut() {
      const sb = getClient();
      if (!sb) return;
      const { error } = await sb.auth.signOut();
      if (error) throw error;
    },

    async getUser() {
      const sb = getClient();
      if (!sb) return null;
      const { data } = await sb.auth.getUser();
      return data.user || null;
    },

    async pushState(appState) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const user = await this.getUser();
      if (!user) throw new Error("سجّلي الدخول أولًا");
      const { error } = await sb.from("user_app_state").upsert({
        user_id: user.id,
        state: appState,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" });
      if (error) throw error;
    },

    async pullState() {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const user = await this.getUser();
      if (!user) throw new Error("سجّلي الدخول أولًا");
      const { data, error } = await sb.from("user_app_state")
        .select("state,updated_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async invoke(functionName, body) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const { data, error } = await sb.functions.invoke(functionName, { body });
      if (error) throw error;
      return data;
    }
  };
})();
