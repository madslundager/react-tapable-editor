export default class DndEffects {
  constructor() {
    this.children = {};
  }

  find(id) {
    return this.children[id];
  }

  add(effectsManager) {
    const { id } = effectsManager;
    this.children[id] = effectsManager;
    return () => {
      delete this.children[id];
    };
  }

  remove(effectsManager) {
    const { id } = effectsManager;
    if (this.children[id]) {
      this.children[id].teardown();
      delete this.children[id];
    }
  }

  teardown() {
    for (const id in this.children) {
      const child = this.children[id];
      child.teardown();
    }
  }

  partialTeardown() {
    for (const id in children) {
      const child = children[id];
      if (!child.isHomeContainerEffects) child.teardown();
    }
  }
}
