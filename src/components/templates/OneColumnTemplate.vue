<template>
  <div class="one-column-template">
    <ContentZone
      name="MainContentZone"
      :page="page"
      :pageInSitemap="pageInSitemap"
      :dynamicPageItem="dynamicPageItem"
    />
  </div>
</template>

<script>
import ContentZone from "../../agility/AgilityContentZone";
export default {
  props: {
    page: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object
  },
  components: {
    ContentZone
  }
};
</script>