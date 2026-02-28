'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React from 'react';

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 bg-white border border-gray-200 rounded-b-xl',
      },
    },
  });

  if (!editor) return null;

  const ToolbarBtn = ({ active, onClick, icon, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition text-[14px] font-bold w-9 h-9 flex items-center justify-center ${
        active ? 'bg-[#f08c50] text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-col w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-b-0 border-gray-200 rounded-t-xl">
        <ToolbarBtn
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon="B" title="Bold"
        />
        <ToolbarBtn
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon="I" title="Italic"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarBtn
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          icon="H2" title="Heading 2"
        />
        <ToolbarBtn
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          icon="H3" title="Heading 3"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarBtn
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon="•" title="Bullet List"
        />
        <ToolbarBtn
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon="1." title="Ordered List"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarBtn
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          icon="❝" title="Blockquote"
        />
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
