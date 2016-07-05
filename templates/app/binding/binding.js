import elliptical from '../references/elliptical';
import container from '../dependencies/container';


elliptical.binding('$binding$', function (node) {
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    

    this.dispose = ()=> {
        dom.unbind();
    };

});


   