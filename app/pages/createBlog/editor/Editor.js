import React, { useMemo, useState, useCallback, useEffect } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Box from '@material-ui/core/Box';

import { handleKeyDownEvent, EditorNodeType, serialize } from './helper';

function CodeElement(props) {
  return <code {...props.attributes}>{props.children}</code>
}

function renderElement({ type, children, attributes }) {
  switch (type) {
    case EditorNodeType.bold:
      return <strong {...attributes}>{children}</strong>;
    case EditorNodeType.code:
      return <CodeElement {...attributes}>{children}</CodeElement>;
    case EditorNodeType.italic:
      return <em {...attributes}>{children}</em>;
    default:
      return <div {...attributes}>{children}</div>;
  }
}

const renderLeaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <CodeElement>{children}</CodeElement>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  return <span {...attributes}>{children}</span>
}

function Editor(props) {
  const { onChange } = props;
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: EditorNodeType.paragraph,
      children: [{ text: '' }],
    },
  ]);

  const handleKeyDown = useCallback(handleKeyDownEvent(editor), [editor]);
  const handleChange = useCallback(val => {
    setValue(val);
    onChange(serialize(val));
  }, [onChange]);

  return (
    <Box ml={2} height={300} fontSize={16} overflow="auto">
      <Slate editor={editor} value={value} onChange={handleChange}>
        <Editable
          placeholder="Enter fancy text…"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={handleKeyDown}
          style={{minHeight: '270px'}}
        />
      </Slate>
    </Box>

  )
}

export default Editor;