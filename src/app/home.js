/**
 *
 * Created by idwardluo on 2017/3/25.
 */
import Page from './index';
import 'styles/global.scss';
import 'styles/home.scss';
import Footer from './footer';

const Home = () => `
            <section class="home">
                <h1 class="header">Home</h1>
                <p class="text">Some dummy text here</p>
                ${Footer()}
            </section>`;

Page.pageInit(Home);
