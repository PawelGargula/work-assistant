'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './toolbar'
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import { useState } from 'react';

export default function Description({
  description,
  setDescription
} : {
  description: string,
  setDescription: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
            class: 'text-xl',
            levels: [2],
        }
      }), BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-5'
        }
      }), OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-5'
        }
      })
    ],
    content: description,
    editorProps: {
        attributes: {
            class: "bg-white border border-slate-300 focus-visible:outline-violet-500 min-h-64 px-3 py-2 rounded-b-md",
        }
    },
    onUpdate({ editor }) {
      setDescription(editor.getHTML());
    }
  })

  return (
    <>
        <label className="block font-medium mb-2 text-sm" onClick={() => editor?.chain().focus()}>
          Description
        </label>
        <Toolbar editor={editor}/>
        <EditorContent editor={editor} />
        <input type="hidden" name='description' value={description} />
    </>
  )
}