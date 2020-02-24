import { Editor, Transforms, Text, createEditor } from 'slate';
import escapeHtml from 'escape-html';

export const EditorNodeType = {
  code: 'code',
  paragraph: 'paragraph',
  bold: 'bold',
  italic: 'italic',
};

const isMarkActive = (type, editor) => {
  const marks = Editor.marks(editor)
  return marks ? marks[type] === true : false
}

function setNodes(type, editor) {
  const isActive = isMarkActive(type, editor);

  if (isActive) {
    Editor.removeMark(editor, type)
  } else {
    Editor.addMark(editor, type, true)
  }
}

export const handleKeyDownEvent = editor => event => {
  if (!event.ctrlKey) {
    return
  }

  switch (event.key) {
    case '`': {
      event.preventDefault();
      setNodes(EditorNodeType.code, editor);
      break;
    }
    case 'b': {
      event.preventDefault();
      setNodes(EditorNodeType.bold, editor);
      break;
    }
    case 'i': {
      event.preventDefault();
      setNodes(EditorNodeType.italic, editor);
      break;
    }
  }
}

const serializeNode = node => {
  let text = node.text;
  if (node.bold) {
    text = `<strong>${text}</strong>`;
  }

  if (node.italic) {
    text = `<em>${text}</em>`;
  }

  if (node.code) {
    text = `<code>${text}</code>`;
  }

  if (Text.isText(node)) {
    return text;
  }
}

/**
 * valid for simple array of nodes having children and type paragraph
 *
 * eg:
 * [
 *  ...
 *  {
 *    "type": "paragraph",
 *     "children": [
 *       {
 *         "text": "some content",
 *         "bold": true
 *       },
 *     ]
 *   },
 *   ...
 * ]
 */
export const serialize = nodes => {
  return nodes.map(n => `<p>${n.children.map(serializeNode).join('')}</p>`).join('');
}