
import HomeController from './controllers/homeController';
import PageController from './controllers/pageController';
import container from './dependencies/page';

export default (app)=>{
//-------controllers------------------------------------------------------------
    var PageService=container.getType('Page');
    new HomeController(app,'Home','/@action');
    new PageController(app,'Page',PageService,'shared.page.');
    
}