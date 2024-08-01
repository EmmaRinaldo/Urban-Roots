"use client";
import { Button } from '@/components/ui/button';
import {type Editor, useEditor, EditorContent, JSONContent} from '@tiptap/react'
import Starterkit from '@tiptap/starter-kit'


export function TipTapEditor({setJson, json}: {setJson: any, json: JSONContent | null}) {
    const editor = useEditor({
        extensions: [Starterkit],
        content: json ?? '<p>Hello World!</p>',
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert',
            },
        },
        onUpdate: ({editor}) => {
            const json = editor.getJSON();
            setJson(json);
        }
    })
    return (
        <div>
            <EditorContent editor={editor} className='rounded-lg border p-2 min-h-[150px] mt-2 ' />
        </div>
    );
}

