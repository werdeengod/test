import * as React from 'react';
import { useParams } from 'react-router';
import { useArticleQuery } from '@/features/article-browser';
import { useHandleCommentForm } from '@/features/article-comments';
import { ArrowLeftIcon } from '@/shared/icons';
import { getDateFromString } from '@/shared/lib/date-formatter';
import style from './Article.module.scss';

const Article: React.FC = (): React.ReactNode => {
  const { id } = useParams();
  const articleId = Number(id);

  const { data: article } = useArticleQuery(articleId);
  const { author, content, handleSubmitForm } = useHandleCommentForm(articleId);

  return (
    <div className="container">
      <div className={style.article}>
        <div className={style.article__header}>
          <a href="/">
            <ArrowLeftIcon />
          </a>
          <h3>{article.title}</h3>
        </div>
        <p className="text_grey">
          Статья вышла в
          {getDateFromString(article.created_at)}
        </p>
        <p className="content">{article.content}</p>
        <div>
          <form onSubmit={handleSubmitForm} className={style.comment__form}>
            <div className={`form__section ${style.comment__form__input__author}`}>
              <label htmlFor="author">Ваше имя</label>
              <input
                id="author"
                className="form-input"
                onChange={author.onChange}
                value={author.value}
                placeholder="Ваше имя"
                type="text"
              />
            </div>
            <div className={`form__section ${style.comment__form__input__content}`}>
              <label htmlFor="content">Ваше мнение</label>
              <input
                id="content"
                className="form-input"
                onChange={content.onChange}
                value={content.value}
                placeholder="Введи комментарий"
                type="text"
              />
            </div>
            <button className="btn btn-purple" type="submit">
              Добавить
            </button>
          </form>
          <p className={style.comment__title}>Комментарии</p>
          <div className={style.comment__separator}></div>
          <div className={style.comments}>
            {article.comments.length !== 0
              ? (
                  article.comments.map(comment => (
                    <div className={style.comment} key={comment.id}>
                      <div className={style.comment__header}>
                        <h4>{comment.author_name}</h4>
                        <p className="text_grey">{getDateFromString(comment.created_at)}</p>
                      </div>
                      <p className="content">{comment.content}</p>
                    </div>
                  ))
                )
              : (
                  <p className="text_grey">Нет комментариев. Добавь первый комментарий!</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
