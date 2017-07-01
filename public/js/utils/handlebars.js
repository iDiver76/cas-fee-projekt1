
Handlebars.registerHelper('isChecked', function (importance, input) {
  return parseInt(importance) === parseInt(input) ? 'checked' : '';
});

Handlebars.registerHelper('isDone', function (done) {
  return done === true ? 'checked' : '';
});

Handlebars.registerHelper('dateFormat', function(context, block) {
  if (moment) {
    let f = block.hash.format || "YYYY-MMM-DD";
    return moment(context).format(f);
  }else{
    return context;   //  moment plugin not available. return data as is.
  }
});

Handlebars.registerHelper('dateFromNow', function(context) {
  if (moment) {
    return moment(context).fromNow();
  }else{
    return context;
  }
});



Handlebars.registerHelper('times', function(n, block) {
  let count = '';
  for(let i = 1; i < parseInt(n) + 1; ++i) {
    block.data.index = i;
    count += block.fn(this);
  }
  return count;
});

