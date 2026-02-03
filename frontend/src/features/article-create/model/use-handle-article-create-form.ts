import React, { useState, useCallback } from 'react';
import { useCreateArticleMutation } from './use-create-article-mutation';

export const useHandleArticleCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createArticleMutation = useCreateArticleMutation();

  const resetForm = useCallback(() => {
    setTitle('');
    setContent('');
  }, [setTitle, setContent]);

  const handleChangeTitleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle],
  );

  const handleChangeContentInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [setContent],
  );

  const handleSubmitForm = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault();

      if (!title.trim() || !content.trim() || createArticleMutation.isPending) {
        return;
      }

      createArticleMutation.mutate(
        { title: title, content: content },
        { onSuccess: () => resetForm() },
      );
    },
    [createArticleMutation, resetForm, title, content],
  );

  return {
    title: {
      onChange: handleChangeTitleInput,
      value: title,
    },
    content: {
      onChange: handleChangeContentInput,
      value: content,
    },
    handleSubmitForm,
  };
};
