
Handlebars.registerHelper('isChecked', function (importance, input) {
  return parseInt(importance) === parseInt(input) ? 'checked' : '';
});

Handlebars.registerHelper('isDone', function (done) {
  return done === true ? 'checked' : '';
});

Handlebars.registerHelper('dateFormat', function(context, block) {
  if (moment) {
    let f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f); //had to remove Date(context)
  }else{
    return context;   //  moment plugin not available. return data as is.
  }
});

