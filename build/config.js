const path = require('path')

const config = {
    multiPage: {
        open: true,
        path: path.resolve(__dirname, '../src/page'),
        appoint: ['test'],
        templates: [],
        entries: {},
    }
}

if (config.multiPage.open) {
    const glob = require('glob')
    const multiPagePath = config.multiPage.path
    const jsPath = multiPagePath + '/*/*.js'
    const templatePath = multiPagePath + '/*/*.html'

    const entries = {}
    glob.sync(jsPath).forEach(resolvePath => {
        const name = path.basename(path.resolve(resolvePath, '../'))
        if (config.multiPage.appoint.length && config.multiPage.appoint.indexOf(name) === -1) return
        entries[name] = resolvePath
    });

    const templates = []
    glob.sync(templatePath).forEach(resolvePath => {
        const name = path.basename(path.resolve(resolvePath, '../'))
        if (config.multiPage.appoint.length && config.multiPage.appoint.indexOf(name) === -1) return
        templates.push({name: name, path: resolvePath})
    })
    config.multiPage.entries = entries
    config.multiPage.templates = templates
}
module.exports = config