$(document).ready(function () {
    console.log('create-profile ready!');
    let $dropDownYear = $('#year-dropdown')
    let $dropDownSchool = $('#school-dropdown')
    let $schoolId = '';
    let $gradYear = '';


    generateSchoolList();
    generateGradYear();

    $dropDownSchool.change(function () {
        $schoolId = $(this).val();
        console.log($schoolId);
         // add code here to update input (hidden)
    });
    $dropDownYear.change(function () {
        $gradYear = $(this).val();
        console.log($schoolId);
    
         // add code here to update input (hidden)
    });


    function generateGradYear() {
        let start = 1900;
        let end = new Date().getFullYear();
        let options = "";
        for (var year = start; year <= end; year++) {
            options += "<option>" + year + "</option>";
        }
         $dropDownYear.append(options);

    };

    function generateSchoolList() {
        $.get('/api/school/all').done(
            function (response) {
                console.log(response);
                let schoolList = response;
                function iterate(item, index) {
                    $dropDownSchool.append(`<option value ="${item.id}"> ${item.name}</option>`);
                }
                schoolList.forEach(iterate);
            })

            .fail(function () {
                alert('there was an error retrieving data from the server')
            });
    };

    // add event listener to submit button to make this a .put request?  
});