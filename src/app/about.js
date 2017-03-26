/**
 * Created by idwardluo on 2017/3/25.
 */
import Page from './index';
import 'styles/global.scss';
import 'styles/about.scss';
import Footer from './footer';

const About = () => `
        <section class="about">
            <h1 class="header">About</h1> 
            <p class="text">Some dummy text here</p> 
            ${Footer()}
        </section>`;

Page.pageInit(About);
