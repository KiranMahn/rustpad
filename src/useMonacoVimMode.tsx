import { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import { initVimMode } from "monaco-vim"; //tslint:disable-line

// Vim Mode:
// Press Chord Ctrl-K, Ctrl-V => the action will run if it is enabled
const useMonacoVimMode = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const [vimMode, setVimMode] = useState();

  useEffect(() => {
    if (!editor) { return; }

    editor.addAction({
      id: "vim-mode",
      label: "Vim Mode",
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV), //tslint:disable-line
      ],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: () => {
        if (vimMode) {
          vimMode.dispose();
        }
        setVimMode(initVimMode(editor));
      },
    });

    return () => {
      if (vimMode) {
        vimMode.dispose();
      }
    };
  }, [editor]);

  return [editor, vimMode];
};

export default useMonacoVimMode;