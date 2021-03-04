// Function to grab search term and pass as parameter
$(document).ready(function () {
  console.log("search ready!");
  $("#searchButton").click(function (event) {
    event.preventDefault();
    let $searchString = $("#search-input").val();

    const $searchResults = $("#searchResults");

    $.get(`api/search/${$searchString}`)
      .done(function (response) {
        console.log(response);
        renderSchools(response);
      })
      .fail(function () {
        // alert("error");
        $searchResults.html("");
        $searchResults.append(
          ` <div class="alert alert-oops mx-auto" role="alert" id="oopsAlert">
                        <h4 class="alert-heading">Oops!</h4>
                        <p>Unfortunately <span id="searchError"> "${$searchString}" </span> isn't a school in our database.</p>
                        <hr class="error-divider">
                        <p class="mb-0">Try searching again </p>
                        </div>`
        );
      });
    const renderSchools = (schools) => {
      $searchResults.html("");
      schools.map((school) => {
        $searchResults.append(
       
                              `<div class="card school-card mb-4 shadow-6" id="${school.name}" >  
                                  <div class="card-body">
                                        <div class="lead text-center"><a class="txt-dark " href="./schools/${school.id}">${school.name}</a></div>
                                            <div class="text-center">
                                            ${school.city}, ${school.state}
                                            </div>  
                                        </div>
                                  </div>
                              </div>`
                       
        );
      });
    };
  });
});
