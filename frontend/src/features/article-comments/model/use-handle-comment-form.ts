import { useCallback, useState } from 'react';
import { useAddCommentMutation } from './use-add-comment-mutation';

export function useHandleCommentForm(articleId: number) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const addCommentMutation = useAddCommentMutation(articleId);

  const resetForm = useCallback(() => {
    setAuthor('');
    setContent('');
  }, [setAuthor, setContent]);

  const handleAuthorInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value),
    [setAuthor],
  );

  const handleContentInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value),
    [setContent],
  );

  const handleSubmitForm = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault();

      if (!author.trim() || !content.trim() || addCommentMutation.isPending) {
        return;
      }

      addCommentMutation.mutate(
        { author_name: author, content },
        { onSuccess: () => resetForm() },
      );
    },
    [author, content, addCommentMutation, resetForm],
  );

  return {
    author: {
      onChange: handleAuthorInput,
      value: author,
    },
    content: {
      onChange: handleContentInput,
      value: content,
    },
    handleSubmitForm,
  };
}
