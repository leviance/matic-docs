import * as React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import { firstRow, thirdRow, networkBanner } from "../data/features";
import SearchBar from '@theme-original/SearchBar'; // Import the SearchBar component

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function NetworkBanner({title, class_name, description, linkUrl, imageUrl}) {
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className={`banner d-flex ${ class_name }`}>
          <div className="icon-wrapper col-2">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="details col-10">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function FirstRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>
  );
}

function ThirdRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>
  );
}

function BigBlock({title, status, description, linkUrl, imageUrl}) {
  return (
    <div className="col-md-12 p-8" style={{textAlign: 'center'}}>
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className="show-card">
          <div className="big-block-content">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
            <div className="text">
              <div className="status">{status}</div>
              <div className="title">{title}</div>
              <div className="descriptions">{description}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Buttonizer({docsUrl, linkUrl}) {
  return (
    <div className="button-group">
      <a href={useBaseUrl(docsUrl)} className="button is-icon w-inline-flex">
        <div className="button-icon_left-element is-icon-medium">
          <div className="text-size-small">Open Docs</div>
        </div>
        <div className="button-icon_right-element is-icon-medium">
          <div className="icon-1x1-medium w-embed">
            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7V17M17 7H7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
      </a>
      <a href={linkUrl} className="button is-icon is-secondary w-inline-flex">
        <div className="button-icon_left-element is-icon-medium">
          <div className="text-size-small">Learn More</div>
        </div>
        <div className="button-icon_right-element is-icon-medium">
          <div className="icon-1x1-medium w-embed">
            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7V17M17 7H7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
}

function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop
    });
  }
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <div className="bootstrap-wrapper">
        <br />
        <div className="container">
          <div className="row">
          <div className="index-page exclude">
          <section className="section container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h1 className="mt-0"><a href="https://polygon.technology" class="landing-page-link">Polygon</a> Wiki</h1>
                <h3 className="mt-0"> The official documentation for <a href="https://polygon.technology" class="landing-page-link">0xPolygon</a></h3>
                <p className="lead">The <b>Polygon Wiki</b> is the source of truth for Polygon, providing comprehensive documentation, community resources, and guides for enthusiasts and developers interested in learning about or building on Polygon.</p>
                <a href="docs/home/new-to-polygon/" style={{ color: '#ffffff' }}>
                  <button className="btn btn-custom">Get started with Polygon</button>
                </a>
                <p className="lead">From its origins as a plasma chain, Polygon has evolved into a multichain powerhouse, providing developers and creators with the tools they need to build innovative, secure, and scalable blockchain solutions. Revolutionize how we interact with the world by building on and participating in the Polygon ecosystem.</p>
                <a href="#common-docs" onClick={(e) => { e.preventDefault(); smoothScrollTo('#common-docs'); }}><b>Find out more ↓</b></a>
              </div>
              <div className="col-lg-4 text-center pt-3 d-none d-lg-block">
                <img style={{ maxWidth: '100%', maxHeight: '400px' }} src="img/polygon-logo.png" />
              </div>
            </div>
          </section>
          </div>
            <section id="common-docs" className="section container-fluid"></section>
            {firstRow &&
              firstRow.length &&
              firstRow.map((props, idx) => (
                <FirstRow key={idx} {...props} />
              ))}{" "}
          </div>

          <div className="row">
            <div className="index-page exclude">
              <section className="section container-fluid">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <h3 className="mt-0">Mass Scale for Mass Adaption</h3>
                    <p className="lead">By leveraging cutting-edge technologies like ZK cryptography and transaction rollups, Polygon is making blockchains more accessible and user-friendly than ever before and is at the forefront of mass adoption through various layer 2s and appchains.</p>
                    <a href="#polygon-protocol" onClick={(e) => { e.preventDefault(); smoothScrollTo('#polygon-protocols'); }}><b>Explore our Protocol Docs ↓</b></a>
                  </div>
                </div>
              </section>
            </div>
            <section id="polygon-protocols" className="row container-fluid justify-content-center">
            <Tabs defaultValue="public" values={[
                {label: 'Public Chains', value: 'public'},
                {label: 'App Specific Chains', value: 'app-specific'},
                {label: 'Data Availability', value: 'da'},
                {label: 'Decentralized Identity', value: 'identity'},
              ]}>

            <TabItem value="public">
              <div class="tabs-element">
                <div class="tabs_animation-wrapper">
                  <div class="tabs_animation-embed pb_video_embed w-embed w-iframe">
                    <iframe src="https://player.vimeo.com/video/791153898?h=a0b62c3daa&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1&amp;autoplay=1&amp;background=1" frameborder="0" allow="autoplay" class="tabs-frame" title="Hero" data-ready="true"></iframe>
                  </div>
                </div>
                <div class="tabs-content">
                  <h4 class="text-weight-medium">Polygon PoS <span class="solution-status">Live</span></h4>
                  <div class="padding-bottom padding-small"></div>
                  <p class="description-text">Support the most widely used Ethereum scaling ecosystem that offers EVM compatibility and an ultimate user experience with fast transactions at near-zero gas fees today.</p>
                  <div class="padding-bottom custom-padding"></div>
                  <Buttonizer docsUrl={'docs/pos/polygon-architecture'} linkUrl={'https://polygon.technology/polygon-pos'} />
                </div>
              </div>

              <div class="tabs-element reverse">
                <div class="tabs-content">
                  <h4 class="text-weight-medium">Polygon zkEVM <span class="solution-status">Testnet</span></h4>
                  <div class="padding-bottom padding-small"></div>
                  <p class="description-text">Unlock Ethereum scalability while maintaining security with the first ZK-rollup that offers EVM equivalence with fast transactions at near-zero gas cost today.</p>
                  <div class="padding-bottom custom-padding"></div>
                  <Buttonizer docsUrl={'docs/zkEVM/introduction'} linkUrl={'https://polygon.technology/polygon-zkevm'} /> 
                </div>
                <div class="tabs_animation-wrapper">
                  <div class="tabs_animation-embed pb_video_embed w-embed w-iframe">
                    <iframe src="https://player.vimeo.com/video/791153931?h=a0b62c3daa&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&background=1" frameborder="0" allow="autoplay" class="tabs-frame" title="Hero" data-ready="true"></iframe>
                  </div>
                </div>
              </div>

              <div class="tabs-element">
                <div class="tabs_animation-wrapper">
                  <div class="tabs_animation-embed pb_video_embed w-embed w-iframe">
                    <iframe src="https://player.vimeo.com/video/791153877?h=a0b62c3daa&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&background=1" frameborder="0" allow="autoplay" class="tabs-frame" title="Hero" data-ready="true"></iframe>
                  </div>
                </div>
                <div class="tabs-content">
                  <h4 class="text-weight-medium">Polygon Miden <span class="solution-status">Coming Soon</span></h4>
                  <div class="padding-bottom padding-small"></div>
                  <p class="description-text">Build advanced dApps with client-side proving with the first decentralized rollup that leverages execution proofs of concurrent, local transactions.</p>
                  <div class="padding-bottom custom-padding"></div>
                  <Buttonizer docsUrl={'docs/miden/intro/main'} linkUrl={'https://polygon.technology/polygon-miden'} />
                </div>
              </div>
            </TabItem>

            <TabItem value="app-specific">
              <div class="tabs-element">
                <div class="tabs_animation-wrapper">
                  <div class="tabs_animation-embed pb_video_embed w-embed w-iframe">
                    <iframe src="https://player.vimeo.com/video/791153912?h=a0b62c3daa&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&background=1" frameborder="0" allow="autoplay" class="tabs-frame" title="Hero" data-ready="true"></iframe>
                  </div>
                </div>
                <div class="tabs-content">
                  <h4 class="text-weight-medium">Polygon Supernets <span class="solution-status">Coming Soon</span></h4>
                  <div class="padding-bottom padding-small"></div>
                  <p class="description-text">Build app-chains powered by an industry-leading technology and ecosystem around Polygon.</p>
                  <div class="padding-bottom custom-padding"></div>
                  <Buttonizer docsUrl={'docs/supernets/overview'} linkUrl={'https://polygon.technology/polygon-supernets'} />
                </div>
              </div>
            </TabItem>

            <TabItem value="da">
              <div class="tabs-element">
                <div class="tabs_animation-wrapper">
                  <div class="tabs_animation-embed pb_video_embed w-embed w-iframe">
                    <iframe src="https://player.vimeo.com/video/791153857?h=a0b62c3daa&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&background=1" frameborder="0" allow="autoplay" class="tabs-frame" title="Hero" data-ready="true"></iframe>
                  </div>
                </div>
                <div class="tabs-content">
                  <h4 class="text-weight-medium">Polygon Avail <span class="solution-status">Coming Soon</span></h4>
                  <div class="padding-bottom padding-small"></div>
                  <p class="description-text">Increase throughput without sacrificing decentralization with a base consensus and data availability layer for chains.</p>
                  <div class="padding-bottom custom-padding"></div>
                  <Buttonizer docsUrl={'docs/avail/introduction/what-is-avail'} linkUrl={'https://polygon.technology/polygon-avail'} />
                </div>
              </div>
            </TabItem>

            <TabItem value="identity">
              <div class="tabs-element">
                <div class="tabs_animation-wrapper">
                  <div class="tabs_animation-embed pb_video_embed w-embed w-iframe">
                    <iframe src="https://player.vimeo.com/video/791153864?h=a0b62c3daa&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&background=1" frameborder="0" allow="autoplay" class="tabs-frame" title="Hero" data-ready="true"></iframe>
                  </div>
                </div>
                <div class="tabs-content">
                  <h4 class="text-weight-medium">Polygon ID  <span class="solution-status">Live</span></h4>
                  <div class="padding-bottom padding-small"></div>
                  <p class="description-text">Build trusted and secure relationships between users and dApps, following the principles of self sovereign identity and privacy by default.</p>
                  <div class="padding-bottom custom-padding"></div>
                  <Buttonizer docsUrl={'docs/polygonid/overview'} linkUrl={'https://polygon.technology/polygon-id'} />
                </div>
              </div>
            </TabItem>

          </Tabs>
          </section>
          </div>

          <div className="row">
          <div className="index-page">
          <section className="section container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h3 className="mt-0">Explore the Endless Possibilities of Polygon</h3>
                <p className="lead">Polygon is an enterprise-ready blockchain platform that has emerged as the go-to solution for a growing number of businesses and development teams. With its scalable architecture, fast and low-cost transactions, and growing ecosystem, Polygon is the ideal platform for entrepreneurs, developers, and businesses alike to build and launch their blockchain solutions.</p>
                <p className="lead">Explore the docs to learn more about how you can use Polygon to achieve your goals. <a class="landing-page-link"><b>Stay tuned for the upcoming content!</b></a></p>
                <a href="#polygon-use-cases" onClick={(e) => { e.preventDefault(); smoothScrollTo('#polygon-use-cases'); }}><b>Check it out ↓</b></a>
              </div>
              <div className="col-lg-4 text-center pt-3 d-none d-lg-block">
                <img style={{ maxWidth: '100%', maxHeight: '400px' }} src="img/header.svg" />
              </div>
            </div>
          </section>
          </div>

          <section id="polygon-use-cases" className="section container-fluid"></section>
          <div className="row">
            {thirdRow &&
              thirdRow.length &&
              thirdRow.map((props, idx) => (
                <ThirdRow key={idx} {...props} />
              ))}{" "}
              </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
