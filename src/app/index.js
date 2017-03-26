/**
 * Created by idwardluo on 2017/3/25.
 */

import $ from 'jquery';

const $main = $('#main');
const render = (markup) => $main.append(markup());
const pageInit = (markup) => {
  $(document).ready(() => render(markup));
};

export default {
  pageInit: pageInit
};
