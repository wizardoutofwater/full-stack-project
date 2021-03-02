// Function to grab search term and pass as parameter
$(document).ready(function () {
    $("#searchButton").click(function (event) {
      event.preventDefault();
      let $searchString = $("#search-input").val();
      $("#searchForm").attr('action', "/search/" + $searchString);
      $("#searchForm").submit();
    });
  });