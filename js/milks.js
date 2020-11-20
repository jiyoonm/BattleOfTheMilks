$(function () {
  function milkRise() {
    $('.milk').addClass('fill');
    setTimeout(function () {
      $('.milk').addClass('end');
    }, 2000);
  }
  function pourmilk() {
    $('.pour').addClass('pouring');
    milkRise();
    setTimeout(function () {
      $('.pour').addClass('end');
    }, 2000);
  }
  setTimeout(function () {
    pourmilk();
  }, 1000);
});
