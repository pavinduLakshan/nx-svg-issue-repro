const nrwlConfig = require("@nx/react/plugins/bundle-rollup");
const url = require("@rollup/plugin-url");
const svgr = require("@svgr/rollup");

module.exports = (config) => {
    const nxConfig = nrwlConfig(config);

    return {
        ...nxConfig,
        plugins: [ ...nxConfig.plugins, 
            url(), 
            svgr({native: true}) ],
    };
};
