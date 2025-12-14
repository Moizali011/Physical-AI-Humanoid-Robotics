import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <nav className={clsx('navbar', 'navbar--primary', styles.navbar)}>
      <div className="navbar__inner">
        <div className="navbar__items">
          <Link className="navbar__brand" to="/">
            {siteConfig.title}
          </Link>
        </div>

        <div className="navbar__items navbar__items--right">
          <Link className="navbar__item navbar__link" to="/docs/modules/module-1">
            Textbook
          </Link>

          <Link className="navbar__item navbar__link" to="https://github.com/facebook/docusaurus">
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;