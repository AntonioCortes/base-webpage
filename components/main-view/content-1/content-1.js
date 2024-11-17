import { createComponent } from "../../../js/component-generator.js";

const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
createComponent('component-content-1', baseUrl + 'content-1.html');
