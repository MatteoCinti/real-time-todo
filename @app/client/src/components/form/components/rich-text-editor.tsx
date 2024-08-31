import { useEffect, useRef } from 'react';
import {
  MDXEditor,
  BoldItalicUnderlineToggles,
  UndoRedo,
  headingsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  MDXEditorMethods,
  BlockTypeSelect,
  listsPlugin,
  InsertTable,
  markdownShortcutPlugin,
  linkPlugin,
  CreateLink,
  linkDialogPlugin,
  tablePlugin,
  InsertAdmonition,
  directivesPlugin,
  Separator,
  InsertThematicBreak,
  AdmonitionDirectiveDescriptor,
  StrikeThroughSupSubToggles,
  ListsToggle
} from '@mdxeditor/editor';

import { useField } from '@tanstack/react-form';
import { useTheme } from '~/hooks';
import { cn } from '~/lib/utils';

type Props<T> = {
  form: any;
  input: FormField<T>;
  hadleTab?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  readOnly?: boolean;
  className?: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function toolbarContents() {
  return {
    toolbarContents: () => (
      <>
        <UndoRedo />
        <Separator />
        <BoldItalicUnderlineToggles />
        <Separator />
        <StrikeThroughSupSubToggles />
        <Separator />
        <ListsToggle />
        <Separator />
        <CreateLink />
        <InsertThematicBreak />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <InsertTable />
        <Separator />
        <InsertAdmonition />
      </>
    )
  };
}

const placeholder = `
Try using typical md synstax to edit this field
`;

function RichTextEditor<T>({
  form,
  input,
  className,
  readOnly,
  handleClick,
  hadleTab
}: Props<T>) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const field = useField<T, FormField<T>['id']>({
    name: input.id,
    form,
    validators: input.validators
  });
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (field.state.value) {
      ref.current?.setMarkdown(field.state.value as string);
    }
  }, [field.state.value]);

  return (
    <div
      role="textbox"
      tabIndex={0}
      onKeyDown={hadleTab}
      onClick={handleClick}
      className={cn('h-4/5 overflow-auto', className)}
    >
      <MDXEditor
        ref={ref}
        className={cn(
          'border-muted text-primary h-full overflow-auto border',
          isDarkTheme && 'dark-editor',
          !readOnly && 'border-accent cursor-text'
        )}
        readOnly={readOnly}
        markdown={placeholder}
        onChange={(value) => field.handleChange(value as any)}
        contentEditableClassName="prose"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor]
          }),
          tablePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          toolbarPlugin(toolbarContents()),
          markdownShortcutPlugin()
        ]}
      />
    </div>
  );
}

export default RichTextEditor;
