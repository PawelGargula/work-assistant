"use client"

import { type Editor } from "@tiptap/react"
import { 
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
} from "lucide-react";
import Toggle from "@/src/app/ui/tasks/rich-text/toggle";

type Props = {
    editor: Editor | null
}

export default function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="bg-white border border-slate-300 mb-1 p-1 rounded-t-md space-x-2">
            <Toggle 
                label="H2" 
                pressed={editor.isActive("heading")}
                onPressedChanged={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}
            >
                <Heading2 className="h-4 w-4"/>
            </Toggle>
            <Toggle 
                label="Bold" 
                pressed={editor.isActive("bold")}
                onPressedChanged={() => {
                    editor.chain().focus().toggleBold().run()
                }}
            >
                <Bold className="h-4 w-4"/>
            </Toggle>
            <Toggle 
                label="Italic" 
                pressed={editor.isActive("italic")}
                onPressedChanged={() => {
                    editor.chain().focus().toggleItalic().run()
                }}
            >
                <Italic className="h-4 w-4"/>
            </Toggle>
            <Toggle 
                label="Strikethrough" 
                pressed={editor.isActive("strike")}
                onPressedChanged={() => {
                    editor.chain().focus().toggleStrike().run()
                }}
            >
                <Strikethrough className="h-4 w-4"/>
            </Toggle>
            <Toggle 
                label="Bullet list" 
                pressed={editor.isActive("bulletList")}
                onPressedChanged={() => {
                    editor.chain().focus().toggleBulletList().run()
                }}
            >
                <List className="h-4 w-4"/>
            </Toggle>
            <Toggle 
                label="Ordered list" 
                pressed={editor.isActive("orderedList")}
                onPressedChanged={() => {
                    editor.chain().focus().toggleOrderedList().run()
                }}
            >
                <ListOrdered className="h-4 w-4"/>
            </Toggle>
        </div>
    )
}