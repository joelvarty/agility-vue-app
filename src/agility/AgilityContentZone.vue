
<template>
  <div>
    <template v-for="module in modules">
      <component
        :is="module.component"
        :contentID="module.contentID"
        :item="module.item"
        :page="page"
        :pageInSitemap="pageInSitemap"
        :dynamicPageItem="dynamicPageItem"
        :key="module.contentID"
      />
    </template>
  </div>
</template>
<script>
//import Vue from 'vue'

export default {
  mounted() {
    this.renderModules();
  },
  props: {
    name: String,
    page: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object
  },
  data: function() {
    return {
      modules: []
    };
  },
  methods: {
    renderModules: function() {
      let modules = [];

      const contentZoneName = this.name;
      const modulesForThisContentZone = this.page.zones[contentZoneName];

      if (modulesForThisContentZone === undefined) {
        console.error(
          `Cannot render modules for zone "${contentZoneName}". This does not appear to be a valid content zone for this page template.`
        );
        return;
      }

      modulesForThisContentZone.forEach(moduleItem => {
        const ModuleComponentToRender = this.$agility.config.moduleComponents[
          moduleItem.module
        ];
        if (ModuleComponentToRender) {
          modules.push({
            component: ModuleComponentToRender,
            contentID: moduleItem.item.contentID,
            item: moduleItem.item
          });
        } else {
          console.error(
            `No component found for the module "${moduleItem.module}". Cannot render module.`
          );
        }
      });

      this.modules = modules;
    }
  }
};
</script>