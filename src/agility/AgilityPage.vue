
<template>
  <div v-if="loading === false">
    <component
      :is="componentToRender"
      :page="page"
      :pageInSitemap="pageInSitemap"
      :dynamicPageItem="dynamicPageItem"
    />
  </div>
</template>

<script>
export default {
  props: {
    agility: Object
  },
  data: function() {
    return {
      pageTemplateComponent: null,
      sitemap: null,
      page: null,
      pageInSitemap: null,
      dynamicPageItem: null,
      loading: true,
      isError: false,
      isPageNotFound: false,
      errorMessage: null,
      path: null
    };
  },
  computed: {
    componentToRender: function() {
      return this.pageTemplateComponent;
    }
  },

  mounted: async function() {
    this.path = this.$route.path;
    await this.routePage();
  },

  methods: {
    setState(obj) {
      Object.assign(this, obj);
    },

    getSitemap: async function(api) {
      if (this.sitemap != null) {
        //return the cached version of the sitemap if we can
        return Promise.resolve(this.sitemap);
      } else {
        //get the sitemap...
        this.sitemap = await api.getSitemapFlat({
          channelName: this.$agility.config.channelName,
          languageCode: this.$agility.config.languageCode
        });

        // promise.then(sitemap => {
        //  this.sitemap = sitemap;
        //})
        return Promise.resolve(this.sitemap);
      }
    },

    routePage: async function() {
      let self = this;
      const api = self.$agility.client;
      try {
        //only get the sitemap once ;)
        let sitemap = await this.getSitemap(api);

        const path = this.path;
        let pageInSitemap = sitemap[path];

        if (path === "/") {
          let firstPagePathInSitemap = Object.keys(sitemap)[0];
          pageInSitemap = sitemap[firstPagePathInSitemap];
        }

        if (pageInSitemap) {
          //GET PAGE
          const page = await api.getPage({
            pageID: pageInSitemap.pageID,
            languageCode: self.$agility.config.languageCode
          });

          if (page != null) {
            let dynItem = null;
            if (pageInSitemap.contentID > 0) {
              //this is a dynamic page... grab the content item
              dynItem = await api.getContentItem({
                contentID: pageInSitemap.contentID,
                languageCode: this.$agility.config.languageCode
              });
            }

            this.setPage(page, pageInSitemap, dynItem);
          }
        } else {
          //Could not find page
          this.pageNotFound();
        }
      } catch (error) {
        //Throw error
        this.handleError("error getting sitemap or page :(", error);
      }
    },

    setPage: async function(page, pageInSitemap, dynItem) {
      this.setState({
        page: page,
        pageInSitemap: pageInSitemap,
        dynamicPageItem: dynItem,
        loading: false,
        isError: false,
        isPageNotFound: false,
        errorMessage: null
      });

      if (this.page != null) {
        //HACK: need a proper reference name for page templates
        const pageTemplateName = this.page.templateName.replace(
          /[^0-9a-zA-Z]/g,
          ""
        );

        this.pageTemplateComponent = this.$agility.config.pageTemplateComponents[
          pageTemplateName
        ];
      }
    },

    handleError: function(msg, error) {
      console.error(msg, error);
      this.setState({
        page: null,
        pageInSitemap: null,
        loading: false,
        isError: true,
        isPageNotFound: false,
        errorMessage: msg
      });
      if (
        this.props.onPageRoutingError &&
        typeof this.props.onPageRoutingError === "function"
      ) {
        this.props.onPageRoutingError(msg, error);
      }
    },

    pageNotFound: function() {
      this.setState({
        page: null,
        pageInSitemap: null,
        loading: false,
        isError: false,
        isPageNotFound: true,
        errorMessage: "page NOT found in sitemap :("
      });

      //TODO: handle page not found...
      // if (
      //   this.props.onPageNotFound &&
      //   typeof this.props.onPageNotFound === "function"
      // ) {
      //   this.props.onPageNotFound(this.errorMessage);
      // }
    }
  }
};
</script>