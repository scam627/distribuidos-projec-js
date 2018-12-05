Array.prototype.slice
  .call($("*").getElementsByTagName("img"))
  .forEach(function(el) {
    console.log(el.src);
  });
