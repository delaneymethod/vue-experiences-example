module.exports = {
	css: {
		requireModuleExtension: false,
		loaderOptions: {
			sass: {
				additionalData: '@import "@/assets/scss/main.scss";'
			}
		},
		extract: false
	}
};
