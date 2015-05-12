tables = $('table');
entries = [];
nodes = $('#content').children();

function process_date(node) {
  var date = node.text().split(' '); 

  return {
    'month': date[0], 
    'day': date[1].replace(/\,/g,''), 
    'year': date[2]
  }
}

function process_table(node, date) {
  var rows = node.children('tbody').children(),
      new_entries = [];

  for (var j=0; j < rows.length; j++) {
    row = $(rows[j])[0];

    if (row.classList[0] !== 'title') {
      var entry = {};
      
      entry.exercise = $(row.children[0]).text();
      entry.sets = $(row.children[2]).text();
      entry.reps = $(row.children[3]).text();
      entry.weight = $(row.children[4]).text().trim();
      entry.month = date.month;
      entry.day = date.day;
      entry.year = date.year;

      new_entries.push(entry);
    }
  }

  return new_entries
}

for (var i=0; i < nodes.length; i++) {
  var node = $(nodes[i]),
    date;
  
  if (node.prop('tagName') === "H2") {
    date = process_date(node); 
  } else if (node.prop('tagName') === "TABLE") {
    var new_entries = process_table(node, date);
    entries = entries.concat(new_entries);
  }
}

console.log(entries);
