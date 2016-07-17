
import elliptical from '../references/elliptical';

var container=elliptical.container;

var Service = elliptical.Service;
var Location = elliptical.Location;
var $Cookie = elliptical.$Cookie;
var Sort = elliptical.Sort;
var $Sort = elliptical.$Sort;
var DomEvent = elliptical.DomEvent;
var $Rest = elliptical.$Rest;

var apiProtocol=location.protocol.replace(':', '');
var apiHost=location.hostname;
var apiPort=location.port;
var apiPath='/api';

//set Rest endpoint props
$Rest.protocol = apiProtocol;
$Rest.host = apiHost;
$Rest.path = apiPath;
$Rest.port = apiPort;

var $rest = new $Rest();

//registrations
container.mapType('Service', Service, $rest);
container.mapType('Sort', Sort, $Sort);
container.mapType('Notify', elliptical.Notify, elliptical.$Notify);
container.registerType('$Rest', $Rest);
container.registerType('Location', Location);
container.registerType('$Local', elliptical.$Local);
container.registerType('$Cookie', $Cookie);
container.registerType('DomEvent', DomEvent);
container.registerType('$ViewData', elliptical.$ViewData);


export default container;
