'use babel';

import BonnoriView from './bonnori-view';
import { CompositeDisposable } from 'atom';

export default {

  bonnoriView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.bonnoriView = new BonnoriView(state.bonnoriViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.bonnoriView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bonnori:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.bonnoriView.destroy();
  },

  serialize() {
    return {
      bonnoriViewState: this.bonnoriView.serialize()
    };
  },

  toggle() {
    console.log('Bonnori was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
