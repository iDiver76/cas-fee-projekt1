/**
 * Created by davidjanssen on 06.05.17.
 */

(function () {

    renderPage();

    function renderPage() {
        var templateScript = $('#test').html(),
            handlebarTpl = Handlebars.compile(templateScript),
            context={
                "title": "London",
                "body": "Baker Street"
            },
            compiled = handlebarTpl(context);
        $('#wrapper').html(compiled);
    }

})();