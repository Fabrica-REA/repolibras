const plugins = new Map();
let builtInsRegistered = false;

const safeBody = () => (typeof document !== "undefined" ? document.body : null);
const canSpeak = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

const DaltonismoPlugin = {
  id: "daltonismo-core",
  type: "visual",
  isSupported: () => Boolean(safeBody()),
  enable: async (options = {}) => {
    const body = safeBody();
    if (!body) {
      return;
    }
    const mode = options.mode || "normal";
    body.setAttribute("data-color-filter", mode);
  },
  disable: async () => {
    const body = safeBody();
    if (!body) {
      return;
    }
    body.setAttribute("data-color-filter", "normal");
  },
};

const textoFaladoState = {
  handler: null,
};

const TextoFaladoPlugin = {
  id: "texto-falado-core",
  type: "audio",
  isSupported: () => canSpeak(),
  enable: async () => {
    if (!canSpeak() || textoFaladoState.handler) {
      return;
    }

    textoFaladoState.handler = () => {
      const selectedText = window.getSelection ? window.getSelection().toString().trim() : "";
      if (!selectedText) {
        return;
      }

      const utterance = new window.SpeechSynthesisUtterance(selectedText);
      utterance.lang = "pt-BR";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    document.addEventListener("mouseup", textoFaladoState.handler);
  },
  disable: async () => {
    if (textoFaladoState.handler) {
      document.removeEventListener("mouseup", textoFaladoState.handler);
      textoFaladoState.handler = null;
    }

    if (canSpeak()) {
      window.speechSynthesis.cancel();
    }
  },
};

export const registerAccessibilityPlugin = (plugin) => {
  if (!plugin?.id) {
    return;
  }
  plugins.set(plugin.id, plugin);
};

export const unregisterAccessibilityPlugin = (pluginId) => {
  plugins.delete(pluginId);
};

export const getAccessibilityPlugin = (pluginId) => plugins.get(pluginId) || null;

export const listAccessibilityPlugins = () => Array.from(plugins.values());

export const registerBuiltInAccessibilityPlugins = () => {
  if (builtInsRegistered) {
    return;
  }

  registerAccessibilityPlugin(DaltonismoPlugin);
  registerAccessibilityPlugin(TextoFaladoPlugin);
  builtInsRegistered = true;
};

export const applyAccessibilityPlugins = async (acessibilidade) => {
  const config = acessibilidade || {};

  await Promise.all(
    listAccessibilityPlugins().map(async (plugin) => {
      if (!plugin?.isSupported || !plugin.isSupported()) {
        return;
      }

      const shouldEnable =
        (plugin.type === "visual" && config.daltonismoAtivo) ||
        (plugin.type === "audio" && config.textoFaladoAtivo);

      if (shouldEnable) {
        if (plugin.type === "visual") {
          await plugin.enable({ mode: config.daltonicoTipo || "normal" });
          return;
        }

        await plugin.enable({});
        return;
      }

      await plugin.disable();
    })
  );
};
