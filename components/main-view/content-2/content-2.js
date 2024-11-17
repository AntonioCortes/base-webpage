import { createComponent } from "../../../js/component-generator.js";

const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
createComponent('component-content-2', baseUrl + 'content-2.html');