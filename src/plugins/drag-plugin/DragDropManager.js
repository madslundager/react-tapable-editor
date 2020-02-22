import { keyExtractor, blockKeyExtractor } from "./keyExtractor";
import { getNodeByOffsetKey, getOffsetKey } from "./utils";
import DropTarget from "./DropTarget";

class DragDropManager {
  constructor({ getEditor, onUpdate }) {
    this.dragSourceId = null;
    this.dropTargetIds = new Set();
    this.committedDropTargetIds = new Set();
    this.getEditor = getEditor;
    this.dropTargetListeners = [];
    this.globalPrepareListeners = [];
    this.sourcePrepareListeners = [];
    this.onUpdate = onUpdate;
  }

  prepare(sourceBlockKey) {
    this.prepareGlobalEventHandler();
    this.prepareCandidateSourceHandler(sourceBlockKey);
  }

  prepareGlobalEventHandler() {
    window.addEventListener(
      "dragstart",
      this.globalDragStartHandlerCapture,
      true
    );
    window.addEventListener(
      "dragenter",
      this.globalDragEnterHandlerCapture,
      true
    );
    window.addEventListener("drop", this.globalDropHandler);

    this.globalPrepareListeners.push(() => {
      window.removeEventListener(
        "dragstart",
        this.globalDragStartHandlerCapture,
        true
      );
      window.removeEventListener(
        "dragenter",
        this.globalDragEnterHandlerCapture,
        true
      );

      window.removeEventListener("drop", this.globalDropHandler);
    });
  }

  prepareCandidateSourceHandler(blockKey) {
    const listenerId = keyExtractor(blockKey, "source");
    const offsetKey = getOffsetKey(blockKey);
    const node = getNodeByOffsetKey(offsetKey);

    const dragStartHandler = e => this.dragStartHandler(e, listenerId);

    node.addEventListener("dragstart", dragStartHandler);
    this.sourcePrepareListeners.push(() => {
      node.removeEventListener("dragstart", dragStartHandler);
    });
  }

  /**
   * first reset `dragSourceId`, and then setup `target` listener.
   */
  globalDragStartHandlerCapture = e => {
    this.dragSourceId = null;
  };

  globalDragEnterHandlerCapture = e => {
    e.preventDefault();
    this.dropTargetId = null;
  };

  globalDropHandler = e => {
    this.teardown();
    const targetIds = [...this.committedDropTargetIds];
    const targetId = targetIds.pop();

    const targetBlockKey = blockKeyExtractor(targetId);
    const sourceBlockKey = blockKeyExtractor(this.dragSourceId);

    this.onUpdate({
      targetBlockKey,
      sourceBlockKey
    });

    this.committedDropTargetIds = new Set();
    this.dropTargetIds = new Set();
    this.dragSourceId = null;
  };

  dragStartHandler = (e, sourceId) => {
    this.dragSourceId = sourceId;
    this.setup();
  };

  addDropTarget = dropTargetId => {
    this.dropTargetIds.add(dropTargetId);
    this.committedDropTargetIds.add(dropTargetId);
  };

  removeDropTarget = dropTargetId => {
    this.dropTargetIds.delete(dropTargetId);
  };

  setup() {
    const { editorState } = this.getEditor();
    const currentContent = editorState.getCurrentContent();
    const blockMap = currentContent.getBlockMap();

    const sourceBlockKey = blockKeyExtractor(this.dragSourceId);

    blockMap
      .keySeq()
      .toArray()
      .forEach(blockKey => {
        // `dragSource` could not be `dropTarget`
        if (sourceBlockKey === blockKey) return;

        const targetListener = new DropTarget({
          blockKey,
          addDropTarget: this.addDropTarget,
          removeDropTarget: this.removeDropTarget
        });
        this.dropTargetListeners.push(targetListener);
      });
  }

  teardown() {
    this.teardownGlobal();
    this.teardownSource();
    this.teardownTarget();
  }

  teardownGlobal() {
    this.globalPrepareListeners.forEach(listener => listener());
    this.globalPrepareListeners = [];
  }

  teardownSource() {
    this.sourcePrepareListeners.forEach(listener => listener());
    this.sourcePrepareListeners = [];
  }

  teardownTarget() {
    this.dropTargetListeners.forEach(targetListener =>
      targetListener.teardown()
    );
    this.dropTargetListeners = [];
  }
}

export default DragDropManager;