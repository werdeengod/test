import * as React from 'react';
import { useArticlesQuery } from '@/features/article-browser';
import { useHandleArticleCreateForm } from '@/features/article-create';
import { getDateFromString } from '@/shared/lib/date-formatter';
import style from './Articles.module.scss';

const Articles: React.FC = (): React.ReactNode => {
  const { data: articles } = useArticlesQuery();
  const { title, content, handleSubmitForm } = useHandleArticleCreateForm();

  return (
    <div className="container">
      <div>
        <h2 className={style.articles__title}>Напиши свою статью</h2>
        <form className={style.article__form} onSubmit={handleSubmitForm}>
          <div className="form__section">
            <label htmlFor="title">Заголовок статьи</label>
            <input
              id="title"
              type="text"
              placeholder="Мой заголовок 1"
              className="form-input"
              onChange={title.onChange}
              value={title.value}
            />
          </div>
          <div className="form__section">
            <label htmlFor="content">Текст статьи</label>
            <textarea
              id="content"
              rows={4}
              placeholder="Сегодня хочу поговорить о..."
              className="form-text"
              onChange={content.onChange}
              value={content.value}
            />
          </div>
          <button type="submit" className="btn btn-purple">
            Добавить
          </button>
        </form>
      </div>
      <div className={style.articles__block}>
        <h2 className={style.articles__title}>Статьи</h2>
        <div className={style.articles}>
          {articles.data.map(article => (
            <a href={`/articles/${article.id}`} className={style.article} key={article.id}>
              <div className={style.article__header}>
                <h3>
                  {article.title.length >= 47 ? `${article.title.slice(0, 45)}...` : article.title}
                </h3>
                <p className="text_grey">{getDateFromString(article.created_at)}</p>
              </div>
              <p className="content">
                {article.content.length >= 83
                  ? `${article.content.slice(0, 80)}...`
                  : article.content}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
