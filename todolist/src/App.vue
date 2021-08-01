<template>
  <div id="app">
      <div id="fullcontent">
        <router-view/>
      </div>
  </div>
</template>

<script>
    export default {
    }

</script>


<style lang="scss">
    @import '@/../public/scss/reset.scss';
    @import '@/../public/scss/assets.scss';

    #app {
        @include display-flex();
        @include flex-direction(column);
        @include flex-wrap(wrap);
        @include justify-content(flex-start);
        @include align-items();

        background-color: #FAFAFA;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;

        #fullcontent,
        #fullcontent #content {
            @include display-flex();
            @include flex-direction(column);
            @include justify-content(flex-start);

            height: 100%;
            width: 100%;
            overflow: visible;
        }

        #fullcontent {
            padding-top: $menu-top-height;
            max-width: $fullcontent-width;

            #content {
            }
        }
        

    }
    
</style>
