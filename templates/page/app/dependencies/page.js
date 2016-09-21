
import elliptical from '../references/elliptical';
import container from './container';

var PageCategoryService=elliptical.PageCategoryService;
var PageService=elliptical.PageService;
var PageTemplate=elliptical.PageTemplate;
var FileService=elliptical.FileService;

container.mapType('Page', PageService, new elliptical.PageLocalProvider(1));
container.mapType('PageCategory', PageCategoryService, new elliptical.PageCategoryLocalProvider(1));
container.mapType('File', FileService, new elliptical.FileLocalProvider());
container.registerType('PageTemplate', new elliptical.PageTemplate());

export default container;