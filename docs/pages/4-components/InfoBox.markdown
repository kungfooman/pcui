---
layout: page
title: InfoBox 
permalink: /components/info-box/
parent: Components
---
<iframe src="/pcui/storybook/iframe.html?id=text-infobox--main&viewMode=docs" style="height: 100% !important;" class="component-iframe" onload="resize()"></iframe>

<script>
function resize() {
    var iframe = document.querySelector('.component-iframe');
    iframe.setAttribute('style', 'height: ' + iframe.contentDocument.body.offsetHeight + 'px !important; opacity: 1;');
    iframe.contentDocument.querySelector('.sbdocs-wrapper').setAttribute('style', 'padding-top: 20px;');
}
</script>