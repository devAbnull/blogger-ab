import React, { useMemo, useState } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

function Editor(props) {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])
  // Render the Slate context.
  console.log('=======> rendering slate editor');
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)} >
     <Editable />
     </Slate>
  )
}

export default Editor;