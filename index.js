
var gulp=require('gulp'),
    fs=require('fs'),
    replace = require('gulp-replace'),
    rename=require('gulp-rename');


var tasks={};
var _config;
var dbRootDir='./node_modules/elliptical-scaffold/templates/dashboard';
var appRootDir='./node_modules/elliptical-scaffold/templates/app';
var webRootDir='./node_modules/elliptical-scaffold/templates/web';
var appScaffoldRootDir='./node_modules/elliptical-scaffold/templates/app/scaffold';
var pageScaffoldRootDir='./node_modules/elliptical-scaffold/templates/page/app';
var pageScaffoldRootImagesDir='./node_modules/elliptical-scaffold/templates/page/images/page';

///dashboard-----------------------------------------------------------------------------------------------------------
tasks.dbCrudController=function(config,params){
    var className=params.class;
    var icon=params.icon;
    var classInstance=getClassInstance(className);
    var classLabel=getClassLabel(className);
    var classPlural=getClassPlural(className);
    dbCreateCrudController(config,className,classInstance,classLabel,icon);
    dbCreateCrudControllerViews(config,className,classPlural,icon);
};

tasks.dbEmptyController=function(config,params){
    var className=params.name;
    dbCreateEmptyController(config,className);
    dbCreateEmptyControllerView(config,className);
};

tasks.dbContentController=function(config,params){
    var className=params.name;
    dbCreateContentController(config,className);
    dbCreateContentControllerView(config,className);
};

tasks.dbEmptyView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    dbCreateEmptyView(config,folder,name)
};

tasks.dbListView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    var className=params.class;
    var icon=params.icon;
    var classPlural=getClassPlural(className);
    dbCreateListView(config,folder,name,className,classPlural,icon);
};

tasks.dbGridView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    var className=params.class;
    var icon=params.icon;
    var classPlural=getClassPlural(className);
    dbCreateGridView(config,folder,name,className,classPlural,icon);
};

tasks.dbContentView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    dbCreateContentView(config,folder,name)
};

tasks.dbDetailView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    var className=params.class;
    var icon=params.icon;
    var classPlural=getClassPlural(className);
    dbCreateDetailView(config,folder,name,className,classPlural,icon);
};

tasks.dbBinding=function(config,params){
    var name=params.name.toLowerCase();
    var camelCaseName=dashToCamelCase(name) + 'Binding';
    dbCreateBinding(config,name,camelCaseName);
};

tasks.dbService=function(config,params){
    var classProvider=params.class + 'Provider';
    var service=params.class + 'Service';
    var camelCaseName=toCamelCase(service);
    dbCreateService(config,service,classProvider,camelCaseName);
};

tasks.dbProvider=function(config,params){
    var provider=params.class + 'Provider';
    var camelCaseName=toCamelCase(provider);
    dbCreateProvider(config,provider,camelCaseName);
};


/// app ----------------------------------------------------------------------------------------------------------------
tasks.appCrudController=function(config,params){
    var className=params.class;
    var icon=params.icon;
    var classInstance=getClassInstance(className);
    var classLabel=getClassLabel(className);
    var classPlural=getClassPlural(className);
    appCreateCrudController(config,className,classInstance,classLabel,icon);
    appCreateCrudControllerViews(config,className,classPlural,icon);
};

tasks.appEmptyController=function(config,params){
    var className=params.name;
    appCreateEmptyController(config,className);
    appCreateEmptyControllerView(config,className);
};

tasks.appEmptyView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    appCreateEmptyView(config,folder,name)
};

tasks.appListView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    var className=params.class;
    var icon=params.icon;
    var classPlural=getClassPlural(className);
    appCreateListView(config,folder,name,className,classPlural,icon);
};

tasks.appDetailView=function(config,params){
    var folder=params.folder.toLowerCase();
    var name=params.name.toLowerCase();
    var className=params.class;
    var icon=params.icon;
    var classPlural=getClassPlural(className);
    appCreateDetailView(config,folder,name,className,classPlural,icon);
};

tasks.appBinding=function(config,params){
    var name=params.name.toLowerCase();
    var camelCaseName=dashToCamelCase(name) + 'Binding';
    appCreateBinding(config,name,camelCaseName);
};

tasks.appService=function(config,params){
    var classProvider=params.class + 'Provider';
    var service=params.class + 'Service';
    var camelCaseName=toCamelCase(service);
    appCreateService(config,service,classProvider,camelCaseName);
};

tasks.appProvider=function(config,params){
    var provider=params.class + 'Provider';
    var camelCaseName=toCamelCase(provider);
    appCreateProvider(config,provider,camelCaseName);
};

tasks.appScaffold=function(config){
    var appDir=config.appScriptPath;
    var appFile=appDir + '/app.js';
    fs.stat(appFile, function(err, stat) {
        if(err == null) console.log('an app has already been scaffolded...');
        else appScaffold(appDir);
    });

};

// page -------------------------------------------------------------------------------------------------------

tasks.pageScaffold=function(config,params){
    var appDir=config.appScriptPath;
    var appFile=appDir + '/app.js';
    var imgDir=params.imageDir + '/page';
    fs.stat(appFile, function(err, stat) {
        if(err === null) console.log('an app has already been scaffolded...');
        else {
            pageScaffold(appDir);
            pageMoveImages(imgDir);
        }
    });
};

tasks.pagePartialScaffold=function(config,params){
    var imageDirectory='./images';
    if(params.imageDir !==undefined) imageDirectory=params.imageDir;
    var appDir=config.appScriptPath;
    var controllerDir=appDir + '/controllers';
    var dependenciesDir=appDir + '/dependencies';
    var sharedViewsDir=appDir + '/views/shared/page';
    var appFile=appDir + '/app.js';
    var imgDir=imageDirectory + '/page';
    fs.stat(appFile, function(err, stat) {
        if(err !== null) console.log('adding page to an app requires an app to be already installed...');
        else {
            pageMoveController(controllerDir);
            pageMoveDependency(dependenciesDir);
            pageMoveSharedTemplates(sharedViewsDir);
            pageMoveImages(imgDir);
        }
    });
};

tasks.pageCreateTemplate=function(config,params){
    var appDir=config.appScriptPath;
    var sharedViewsDir=appDir + '/views/shared/page';
    var name=params.name.toLowerCase();
    pageCreateEmptyTemplate(sharedViewsDir,name);
};


// web component -------------------------------------------------------------------------------------------------------

tasks.webCreateComponent=function(config,params){
    var dir=params.dir;
    var tag=params.tag;
    var upperTag=tag.toUpperCase();
    webCreateComponent(config,dir,tag,upperTag);
};

///private -------------------------------------------------------------------------------------------------------------
function getClassInstance(className){
    return className.toLowerCase();
}

function getClassLabel(className){
    var lower=getClassInstance(className);
    return lower + "s";
}

function getClassPlural(className){
    return className + "s";
}

function toCamelCase(s){
    return s
        .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
}

function dashToCamelCase(s){
    return s.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

function getControllerName(className){
    var ctrlRootName=toCamelCase(className);
    return ctrlRootName + 'Controller';
}

function getAppControllerRoot(config){
    return config.appScriptPath + '/controllers';
}

function getAppViewsRoot(config){
    return config.appScriptPath + '/views';
}

function getAppBindingsRoot(config){
    return config.appScriptPath + '/bindings';
}

function getBindingName(name){
    return name + 'Binding';
}

function getAppServicesRoot(config){
    return config.appScriptPath + '/services';
}

function getServiceName(name){
    return name + 'Service';
}

function getAppProvidersRoot(config){
    return config.appScriptPath + '/providers';
}

function getProviderName(name){
    return name + 'Provider';
}

function dbCreateCrudController(config,className,classInstance,classLabel,icon){
    var ctrlRoot=getAppControllerRoot(config);
    var ctrl=getControllerName(className);
    gulp.src(dbRootDir + '/controller/crud/controller/entityController.js')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassInstance$', classInstance))
        .pipe(replace('$ClassLabel$', classLabel))
        .pipe(rename(ctrl + '.js'))
        .pipe(gulp.dest(ctrlRoot));
}

function dbCreateCrudControllerViews(config,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/controller/crud/views/**/*.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(gulp.dest(viewsRoot + '/' + className.toLowerCase()));
}

function dbCreateEmptyController(config,className){
    var ctrlRoot=getAppControllerRoot(config);
    var ctrl=getControllerName(className);
    gulp.src(dbRootDir + '/controller/empty/controller/emptyController.js')
        .pipe(rename(ctrl + '.js'))
        .pipe(gulp.dest(ctrlRoot));
}

function dbCreateEmptyControllerView(config,className){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/controller/empty/views/**/*.html')
        .pipe(gulp.dest(viewsRoot + '/' + className.toLowerCase()));
}

function dbCreateContentController(config,className){
    var ctrlRoot=getAppControllerRoot(config);
    var ctrl=getControllerName(className);
    gulp.src(dbRootDir + '/controller/content/controller/contentController.js')
        .pipe(rename(ctrl + '.js'))
        .pipe(gulp.dest(ctrlRoot));
}

function dbCreateContentControllerView(config,className){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/controller/content/views/**/*.html')
        .pipe(gulp.dest(viewsRoot + '/' + className.toLowerCase()));
}

function dbCreateEmptyView(config,folder,name){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/view/empty.html')
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function dbCreateListView(config,folder,name,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/view/list.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function dbCreateGridView(config,folder,name,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/view/grid.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function dbCreateContentView(config,folder,name){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/view/content.html')
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function dbCreateDetailView(config,folder,name,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(dbRootDir + '/view/detail.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function dbCreateBinding(config,name,camelCaseName){
    var bindingsRoot=getAppBindingsRoot(config);
    gulp.src(dbRootDir + '/binding/binding.js')
        .pipe(replace('$binding$', name))
        .pipe(rename(camelCaseName + '.js'))
        .pipe(gulp.dest(bindingsRoot));

}

function dbCreateService(config,service,classProvider,camelCaseName){
    var servicesRoot=getAppServicesRoot(config);
    gulp.src(dbRootDir + '/service/service.js')
        .pipe(replace('$Service$', service))
        .pipe(replace('$ClassProvider$', classProvider))
        .pipe(rename(camelCaseName + '.js'))
        .pipe(gulp.dest(servicesRoot));
}

function dbCreateProvider(config,provider,camelCaseName){
    var providersRoot=getAppProvidersRoot(config);
    gulp.src(dbRootDir + '/provider/provider.js')
        .pipe(replace('$Provider$', provider))
        .pipe(rename(camelCaseName + '.js'))
        .pipe(gulp.dest(providersRoot));
}


function appCreateCrudController(config,className,classInstance,classLabel,icon){
    var ctrlRoot=getAppControllerRoot(config);
    var ctrl=getControllerName(className);
    gulp.src(appRootDir + '/controller/crud/controller/entityController.js')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassInstance$', classInstance))
        .pipe(replace('$ClassLabel$', classLabel))
        .pipe(rename(ctrl + '.js'))
        .pipe(gulp.dest(ctrlRoot));
}

function appCreateCrudControllerViews(config,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(appRootDir + '/controller/crud/views/**/*.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(gulp.dest(viewsRoot + '/' + className.toLowerCase()));
}

function appCreateEmptyController(config,className){
    var ctrlRoot=getAppControllerRoot(config);
    var ctrl=getControllerName(className);
    gulp.src(appRootDir + '/controller/empty/controller/emptyController.js')
        .pipe(rename(ctrl + '.js'))
        .pipe(gulp.dest(ctrlRoot));
}

function appCreateEmptyControllerView(config,className){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(appRootDir + '/controller/empty/views/**/*.html')
        .pipe(gulp.dest(viewsRoot + '/' + className.toLowerCase()));
}

function appCreateEmptyView(config,folder,name){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(appRootDir + '/view/empty.html')
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function appCreateListView(config,folder,name,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(appRootDir + '/view/list.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function appCreateDetailView(config,folder,name,className,classPlural,icon){
    var viewsRoot=getAppViewsRoot(config);
    gulp.src(appRootDir + '/view/detail.html')
        .pipe(replace('$Class$', className))
        .pipe(replace('$ClassPlural$', classPlural))
        .pipe(replace('$icon$', icon))
        .pipe(rename(name.toLowerCase() + '.html'))
        .pipe(gulp.dest(viewsRoot + '/' + folder.toLowerCase()));
}

function appCreateBinding(config,name,camelCaseName){
    var bindingsRoot=getAppBindingsRoot(config);
    gulp.src(appRootDir + '/binding/binding.js')
        .pipe(replace('$binding$', name))
        .pipe(rename(camelCaseName + '.js'))
        .pipe(gulp.dest(bindingsRoot));

}

function appCreateService(config,service,classProvider,camelCaseName){
    var servicesRoot=getAppServicesRoot(config);
    gulp.src(appRootDir + '/service/service.js')
        .pipe(replace('$Service$', service))
        .pipe(replace('$ClassProvider$', classProvider))
        .pipe(rename(camelCaseName + '.js'))
        .pipe(gulp.dest(servicesRoot));
}

function appCreateProvider(config,provider,camelCaseName){
    var providersRoot=getAppProvidersRoot(config);
    gulp.src(appRootDir + '/provider/provider.js')
        .pipe(replace('$Provider$', provider))
        .pipe(rename(camelCaseName + '.js'))
        .pipe(gulp.dest(providersRoot));
}

function appScaffold(appDir){
    gulp.src(appScaffoldRootDir + '/**/*.*')
        .pipe(gulp.dest(appDir));
}


function webCreateComponent(config,dir,tag,upperTag){
    gulp.src(webRootDir + '/polymer-component/**/*.*')
        .pipe(replace('$tag$', tag))
        .pipe(replace('$tag-upper$', upperTag))
        .pipe(rename({
            dirname: tag
        }))
        .pipe(rename(function(path){
            if(path.basename==='polymer-component'){
                path.basename=tag;
            }
        }))
        .pipe(gulp.dest(dir));
}

function pageScaffold(appDir){
    gulp.src(pageScaffoldRootDir + '/**/*.*')
      .pipe(gulp.dest(appDir));
}

function pageMoveImages(imgDir){
    gulp.src(pageScaffoldRootImagesDir + '/**/*.*')
      .pipe(gulp.dest(imgDir));
}

function pageMoveController(controllerDir){
    gulp.src(pageScaffoldRootDir + '/controllers/pageController.js')
      .pipe(gulp.dest(controllerDir));
}

function pageMoveDependency(dependencyDir){
    gulp.src(pageScaffoldRootDir + '/dependencies/page.js')
      .pipe(gulp.dest(dependencyDir));
}

function pageMoveSharedTemplates(viewsDir){
    gulp.src(pageScaffoldRootDir + '/views/shared/page/**/*.*')
      .pipe(gulp.dest(viewsDir));
}

function pageCreateEmptyTemplate(viewsDir,name){
    gulp.src(pageScaffoldRootDir + '/view/template.html')
      .pipe(rename(name.toLowerCase() + '.html'))
      .pipe(gulp.dest(viewsDir));
}

// public --------------------------------------------------------------------------------------------------------------

module.exports=function Tasks(config){
    this.config=config;
    _config=config;

    this.dbCreateCrudController=function(config,params){
        tasks.dbCrudController(config,params);
    };
    this.dbCreateEmptyController=function(config,params){
        tasks.dbEmptyController(config,params);
    };
    this.dbCreateContentController=function(config,params){
        tasks.dbContentController(config,params);
    };
    this.dbCreateEmptyView=function(config,params){
        tasks.dbEmptyView(config,params);
    };
    this.dbCreateContentView=function(config,params){
        tasks.dbContentView(config,params);
    };
    this.dbCreateListView=function(config,params){
        tasks.dbListView(config,params);
    };
    this.dbCreateGridView=function(config,params){
        tasks.dbGridView(config,params);
    };
    this.dbCreateDetailView=function(config,params){
        tasks.dbDetailView(config,params);
    };
    this.dbCreateBinding=function(config,params){
        tasks.dbBinding(config,params);
    };
    this.dbCreateService=function(config,params){
        tasks.dbService(config,params);
    };
    this.dbCreateProvider=function(config,params){
        tasks.dbProvider(config,params);
    };
    this.appCreateCrudController=function(config,params){
        tasks.appCrudController(config,params);
    };
    this.appCreateEmptyController=function(config,params){
        tasks.appEmptyController(config,params);
    };
    this.appCreateEmptyView=function(config,params){
        tasks.appEmptyView(config,params);
    };
    this.appCreateListView=function(config,params){
        tasks.appListView(config,params);
    };
    this.appCreateDetailView=function(config,params){
        tasks.appDetailView(config,params);
    };
    this.appCreateBinding=function(config,params){
        tasks.appBinding(config,params);
    };
    this.appCreateService=function(config,params){
        tasks.appService(config,params);
    };
    this.appCreateProvider=function(config,params){
        tasks.appProvider(config,params);
    };
    this.appScaffold=function(config){
        tasks.appScaffold(config);
    };
    this.webCreateComponent=function(config,params){
        tasks.webCreateComponent(config,params);
    };
    this.pageScaffold=function(config){
        tasks.pageScaffold(config);
    };
    this.pagePartialScaffold=function(config){
        tasks.pagePartialScaffold(config);
    };
    this.pageCreateTemplate=function(config,params){
        tasks.pageCreateTemplate(config,params);
    };
};


