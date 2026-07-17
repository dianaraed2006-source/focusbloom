(function () {
  let client = null;
  let clientSignature = "";

  function storedConfig() {
    try {
      return JSON.parse(localStorage.getItem("focusbloom_runtime_config") || "{}");
    } catch {
      return {};
    }
  }

  function config() {
    return { ...(window.FOCUS_BLOOM_CONFIG || {}), ...storedConfig() };
  }

  function configured() {
    const cfg = config();
    return Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_PUBLISHABLE_KEY && window.supabase);
  }

  function getClient() {
    if (!configured()) return null;
    const cfg = config();
    const signature = `${cfg.SUPABASE_URL}|${cfg.SUPABASE_PUBLISHABLE_KEY}`;
    if (!client || clientSignature !== signature) {
      client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_PUBLISHABLE_KEY);
      clientSignature = signature;
    }
    return client;
  }

  function savePublicConfig(url, key) {
    const normalizedUrl = String(url || "").trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
    const normalizedKey = String(key || "").trim();

    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(normalizedUrl)) {
      throw new Error("Project URL غير صحيح. يجب أن ينتهي بـ supabase.co دون /rest/v1");
    }
    if (!normalizedKey.startsWith("sb_publishable_") && !normalizedKey.startsWith("eyJ")) {
      throw new Error("استخدمي Publishable key أو Legacy anon key فقط");
    }

    localStorage.setItem("focusbloom_runtime_config", JSON.stringify({
      SUPABASE_URL: normalizedUrl,
      SUPABASE_PUBLISHABLE_KEY: normalizedKey
    }));
    client = null;
    clientSignature = "";
  }

  function clearPublicConfig() {
    localStorage.removeItem("focusbloom_runtime_config");
    client = null;
    clientSignature = "";
  }

  window.FocusBloomCloud = {
    config,
    configured,
    getClient,
    savePublicConfig,
    clearPublicConfig,

    async testConnection() {
      const sb = getClient();
      if (!sb) throw new Error("أدخلي Project URL وPublishable key أولًا");
      const { data, error } = await sb.auth.getSession();
      if (error) throw error;
      return { ok: true, hasSession: Boolean(data.session) };
    },

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
      const { data, error } = await sb.auth.getUser();
      if (error) return null;
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

    async uploadSubjectFile(subjectId, file) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const user = await this.getUser();
      if (!user) throw new Error("سجّلي الدخول أولًا");
      const safeName = String(file.name).replace(/[^\w.\-\u0600-\u06FF]+/g, "_");
      const path = `${user.id}/${subjectId}/${crypto.randomUUID()}-${safeName}`;
      const { error } = await sb.storage.from("subject-files").upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (error) throw error;
      const { error: rowError } = await sb.from("subject_files").insert({
        user_id: user.id,
        subject_id: subjectId,
        storage_path: path,
        file_name: file.name,
        mime_type: file.type || "application/octet-stream",
        size_bytes: file.size
      });
      if (rowError) throw rowError;
      return path;
    },

    async listSubjectFiles(subjectId) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const user = await this.getUser();
      if (!user) throw new Error("سجّلي الدخول أولًا");
      const { data, error } = await sb.from("subject_files")
        .select("id,subject_id,storage_path,file_name,mime_type,size_bytes,created_at")
        .eq("user_id", user.id)
        .eq("subject_id", subjectId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async downloadSubjectFile(record) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const { data, error } = await sb.storage.from("subject-files").download(record.storage_path);
      if (error) throw error;
      return new File([data], record.file_name, { type: record.mime_type });
    },

    async deleteSubjectFile(record) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const { error: storageError } = await sb.storage.from("subject-files").remove([record.storage_path]);
      if (storageError) throw storageError;
      const { error } = await sb.from("subject_files").delete().eq("id", record.id);
      if (error) throw error;
    },

    async invoke(functionName, body) {
      const sb = getClient();
      if (!sb) throw new Error("Supabase غير مفعّل");
      const { data, error } = await sb.functions.invoke(functionName, { body });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    }
  };
})();
