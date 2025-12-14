import React from 'react';
import clsx from 'clsx';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { BlogLayout } from '@theme/BlogLayout';
import { DocContent } from '@theme/DocContent';
import Chatbot from '../Chatbot/Chatbot';
import styles from './DocItem.module.css';

const DocItem = (props) => {
  const { content: DocContentComponent } = props;
  const { metadata, frontMatter } = DocContentComponent;
  const { title, description, hide_title: hideTitle } = frontMatter;
  const { permalink } = metadata;

  return (
    <>
      <PageMetadata
        title={title}
        description={description}
        permalink={permalink}
      />
      <HtmlClassNameProvider className="docs-doc-page">
        <BlogLayout wrapperClassName={clsx(ThemeClassNames.common.wrapper, styles.docItemWrapper)}>
          <div className={clsx('row', styles.docItemRow)}>
            <div className={clsx('col', styles.docItemCol)}>
              <DocContent
                content={DocContentComponent}
              />
            </div>
            <div className={clsx('col', styles.chatCol)}>
              <div className={styles.chatContainer}>
                <h3 className={styles.chatTitle}>Ask the AI Assistant</h3>
                <Chatbot embedded={true} />
              </div>
            </div>
          </div>
        </BlogLayout>
      </HtmlClassNameProvider>
    </>
  );
};

export default DocItem;