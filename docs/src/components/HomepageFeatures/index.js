import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Very simple tool to build json schemas for your application. You can
        generate schemas from your existing data or build them from scratch.
      </>
    ),
  },
  {
    title: 'No need to learn',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Forms are a very common part of any application. We've built a tool that
        will help you build them faster and easier.
      </>
    ),
  },
  {
    title: 'Powered by Jaspero',

    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Watch the changes in real time and see the results instantly. You can
        save your work and come back to it later.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
