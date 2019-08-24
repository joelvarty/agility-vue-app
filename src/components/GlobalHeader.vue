
<template>
  <header class="header">
    <h1>HEADER</h1>
    <div class="container">
      <label>{{siteName}}</label>

      <ul :if="sitemap != null">
        <li v-for="node in sitemap" :key="node.pageID">
          <router-link :to="node.path">{{node.menuText}}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import PreviewBar from "../agility/PreviewBar";

export default {
  data: function() {
    return {
      siteName: null,
      sitemap: null
    };
  },
  mounted: async function() {
    const self = this;
    const api = this.$agility.client;

    try {
      //get the global header
      let contentItemList = await api.getContentList({
        referenceName: "globalheader",
        languageCode: self.$agility.config.languageCode
      });

      if (contentItemList && contentItemList.items) {
        let contentItem = contentItemList.items[0];

        self.siteName = contentItem.fields.siteName;
      }
    } catch (error) {
      if (console) console.error("Could not load global header item.", error);
    }

    try {
      //get the nested sitemap
      let sitemap = await api.getSitemapNested({
        channelName: self.$agility.config.channelName,
        languageCode: self.$agility.config.languageCode
      });

      self.sitemap = sitemap;
    } catch (error) {
      if (console) console.error("Could not load nested sitemap.", error);
    }
  }
};
</script>

<style scoped>
.header {
  background-color: black;
  color: #fff;
  padding: 16px;
}

.header ul {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 32px;
}

.header li {
  display: inline-block;
  margin-left: 16px;
}

.header a,
header.a:visited,
header.a:active {
  color: #fff;
}

.header a:hover {
  text-decoration: none;
}
</style>