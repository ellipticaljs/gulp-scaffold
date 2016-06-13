
var gulp=require('gulp'),
    replace = require('gulp-replace'),
    rename=require('gulp-rename');


var tasks={};
var _config;
var dbRootDir='./node_modules/elliptical-scaffold/templates/dashboard';

tasks.dbCrudController=function(config,params){
    //$Class$
    //$ClassInstance$
    //$ClassLabel$
    //$ClassPlural$
    //$icon$
    //rename controller
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





// public --------------------------------------------------------------------------------------------------------------

module.exports=function Tasks(config){
    this.config=config;
    _config=config;
    
    this.dbCreateCrudController=function(config,params){
        tasks.dbCrudController(config,params);
    }
    this.dbCreateEmptyController=function(config,params){
        tasks.dbEmptyController(config,params);
    }
    this.dbCreateContentController=function(config,params){
        tasks.dbContentController(config,params);
    }
    this.dbCreateEmptyView=function(config,params){
        tasks.dbEmptyView(config,params);
    }
    this.dbCreateContentView=function(config,params){
        tasks.dbContentView(config,params);
    }
    this.dbCreateListView=function(config,params){
        tasks.dbListView(config,params);
    }
    this.dbCreateGridView=function(config,params){
        tasks.dbGridView(config,params);
    }
    this.dbCreateBinding=function(config,params){
        tasks.dbBinding(config,params);
    }
    this.dbCreateService=function(config,params){
        tasks.dbService(config,params);
    }
    this.dbCreateProvider=function(config,params){
        tasks.dbProvider(config,params);
    }
};























